// controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
 
  try{

      const { name, email, password ,phone} = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) 
        return res.status(400).json({success:false, message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword,phone });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.cookie('userToken', token, { httpOnly: true, maxAge: 86400000 });
      res.json({ success: true, message: 'Registered successfully', user });

  }catch(error){
      res.json({success:false, message:error.message});
  }
  
};

export const login = async (req, res) => {

  try{

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ message: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.cookie('userToken', token, { httpOnly: true, maxAge: 86400000 });
      res.json({ success: true, message: 'Logged in successfully' });

  }catch(error){
    res.json({success:false, message:error.message})
  }
 
};

export const logout = async(req,res)=>{
    try{
        res.clearCookie('userToken');
        res.json({ success: true, message: 'Logged out successfully' });
    }catch(error){
      res.json({success:false, message:error.message});

    }
}