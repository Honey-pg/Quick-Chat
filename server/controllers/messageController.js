const Message = require("../models/message");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
const { io, userSocketMap } = require("../server.js");

// Get all users except the logged-in user
exports.getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");

    // Count number of unseen messages per user
    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const count = await Message.countDocuments({
        senderId: user._id,
        receiverId: req.user._id,
        seen: false,
      });
      if (count > 0) unseenMessages[user._id] = count;
    });
    await Promise.all(promises);

    res.json({ success: true, users: filteredUsers, unseenMessages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all messages for selected users
exports.getMessage = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: selectedUserId, receiverId: myId },
        { senderId: myId, receiverId: selectedUserId },
      ],
    });

    // Mark messages as seen
    await Message.updateMany({ senderId: selectedUserId, receiverId: myId }, { seen: true });

    res.json({ success: true, messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// API to mark a single message as seen
exports.markMeassageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMessage = await Message.findByIdAndUpdate(id, { seen: true }, { new: true });
    res.json({ success: true, message: updatedMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Send message to selected user
exports.sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.id;
    console.log("REQ.BODY ===>", req.body);
    let imageUrl;
    if (image) {
      const result = await cloudinary.uploader.upload(image);
      imageUrl = result.secure_url;
    }
    console.log("userSocketMap:", userSocketMap);
console.log("receiverId:", receiverId);
    const newMessage = await Message.create({ text, image: imageUrl, senderId, receiverId });
    
    // Emit the new message to the receiver if online
    const receiverSocketId = userSocketMap ? userSocketMap[receiverId] : null;
    if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", newMessage);

    res.json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};