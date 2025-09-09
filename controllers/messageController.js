

//get all users except the logged in user
exports.getUsersForSidebar = async (req,res) => {
    try {
        const userId=req.user._id
        const filteredUsers=await User.find({_id:{ $ne :userId}}).select
        ("-password");

        //count number of messages that are not seen
        const unseenMessages=[];
        const promises=await filteredUsers.map(async(user)=>{
            const count=await Message.find({
                sender:user._id,
                receiver:req.user._id,
                seen:false
            })
            if(count.length>0){
                unseenMessages[user._id]=count.length;
            }
        })
        await Promise.all(promises);
        res.json({success:true,users:filteredUsers,unseenMessages})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

//get all messages for selected users
 exports.getMessage=async(req,res)=>{
    try {
        const {id:selectedUserId}=req.params;
        const myId=req.user._id;

        const message=await Message.find({
            $or:[
                {sender:selectedUserId,receiver:myId},
                {sender:myId,receiver:selectedUserId},
            ]}
        );
        await Message.updateMany(
            {sender:selectedUserId,receiver:myId},
            {seen:true}
        )
        res.json({success:true,message});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
 }

 //api to mark message as read

 exports.markMeassageAsSeen=async(req,res)=>{
    try{
        const {id}=req.params;
        const updatedMessage=await Message.findByIdAndUpdate(id,{seen:true},{new:true});
        res.json({success:true,message:updatedMessage});
    }catch(error){
        console.log(error);
        res.status(500).json({error:error.message});
    }
}