// controllers/adminController.js
import Product from '../models/Product.js';
import Inquiry from '../models/Inquiry.js';
import Chat from '../models/Chat.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/User.js';


//For Admin Dashboard URL=> /api/admin/dasboard
export const getDashboardData = async (req, res) => {
try{
        const products = await Product.find();
        const inquiries = await Inquiry.find();
        const chats = await Chat.find();

    return res.json({ products, inquiries, chats });

}catch(error){
    res.json({success:false, message:error.message});
}

};

//Admin login page URL : /api/admin/login this endpoint uses the admin to login and checks the password and username as well
export const login = async (req, res) => {

  try{
       
        const { email, password } = req.body;

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ message: 'Unauthorized admin credentials' });
        }

        let admin = await User.findOne({ email });

        if (!admin) {
            const hashedPassword = await bcrypt.hash(password, 10);
            admin = await User.create({
            name: 'Admin',
            email,
            password: hashedPassword,
            role: 'admin'
            });
        }

        const adminToken = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('adminToken', adminToken, { httpOnly: true, maxAge: 86400000 });
        res.json({ success: true, message: 'Admin logged in successfully' });

  }catch(error){
    res.json({success:false, message:error.message})
  }
 
};

//Admin Logout URL=> /api/admin/logout this endpoint helps the admin to logout from the dashboard
export const logout = async(req,res)=>{
    try{
        res.clearCookie('adminToken');
        res.json({ success: true, message: 'Logged out successfully' });
    }catch(error){
      res.json({success:false, message:error.message});

    }
}
