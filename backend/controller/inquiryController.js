// controllers/inquiryController.js
import Inquiry from '../models/Inquiry.js';
import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const addInquiry = async (req, res) => {
  try{
      const inquiry = await Inquiry.create(req.body);
      res.json({ success: true, inquiry });

  }catch(error){
    console.error(error.message);
    res.json({success:false, message:error.message});
  }
 
};


// controllers/inquiryController.js
export const createInquiry = async (req, res) => {
 try {
    const token = req.cookies.userToken;
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const userId = decoded.id;
    
    if(!userId){
      res.status(404).json({success:false, message:"User not found"})
    }
    const user =await User.findById(userId);
    if(!user){
      res.status(404).json({success:false, message:"User doesn't exist"})
    }
   
    const {message} = req.body;
    
    
    const newInquiry = new Inquiry({
      userId: user._id,
      name : user.name,
      email : user.email,
      message
      
    });

    await newInquiry.save();
    res.status(201).json({ success: true, message: 'Inquiry submitted successfully' });

  } catch (error) {

    res.status(500).json({ success: false, message: error.message });
  }
};


// controllers/inquiryController.js
export const authenticate = (req, res, next) => {

      const token = req.cookies.userToken || req.cookies.token; // Prioritize user
      if (!token) return res.status(403).json({ message: 'No token provided' });

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        return res.status(401).json({ message: err.message });
      }

};
