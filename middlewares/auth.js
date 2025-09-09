const User=require( "../models/User");


exports.protectRoute = async (req,res,next) => {
   try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select
    ("-password");
    if (!user) return res.status(401).json({message:"User not found"});
    req.user = user;
    next();
   } catch (error) {
     res.status(401).json({
       message: error.message,
     })
   }
};