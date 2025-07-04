// controllers/adminController.js
import Product from '../models/Product.js';
import Inquiry from '../models/Inquiry.js';
import Chat from '../models/Chat.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import Promotion from '../models/Promotion.js';


//For Admin Dashboard URL=> /api/admin/dasboard
export const getDashboardData = async (req, res) => {
    try {
        const products = await Product.find();
        const inquiries = await Inquiry.find();
        const chats = await Chat.find();

        return res.json({ 
            success: true,
            totalProducts: products.length,
            totalInquiries: inquiries.length,
            activePromotions: chats.length,
            products,
            inquiries,
            chats
        });
    } catch (error) {
        console.error('Dashboard data error:', error);
        return res.status(500).json({
            success: false, 
            message: 'Failed to load dashboard data'
        });
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin user
    const admin = await User.findOne({ email });

    if (!admin) {
      return res.status(403).json({ message: 'Invalid credentials' });
    }

    // Check if user is admin
    if (admin.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(403).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const adminToken = jwt.sign(
      { 
        id: admin._id, 
        role: 'admin',
        email: admin.email 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    // Set cookie with proper options
    res.cookie('adminToken', adminToken, {
      httpOnly: true,
      secure: false, // false for local development
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      domain: 'localhost'
    });

    // Set additional headers for cross-origin
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');

    res.json({ 
      success: true, 
      message: 'Admin logged in successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false, 
      message: 'Internal server error during login'
    });
  }
};

//Admin Logout URL=> /api/admin/logout this endpoint helps the admin to logout from the dashboard
export const logout = async(req,res)=>{
    try{
        res.clearCookie('adminToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
        res.json({ success: true, message: 'Logged out successfully' });
    }catch(error){
      res.json({success:false, message:error.message});

    }
}

//Verify admin URL : /api/admin/verify this endpoint uses the admin to verify the admin
export const verifyAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log('Verifying admin:', user); // Debug log

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      console.log('User role:', user.role); // Debug log
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admins only.' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Admin verified successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Admin verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during verification' 
    });
  }
};

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activePromotions = await Promotion.countDocuments({ active: true });
    const totalInquiries = await Inquiry.countDocuments();

    res.json({
      success: true,
      stats: {
        totalProducts,
        activePromotions,
        totalInquiries
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get dashboard stats'
    });
  }
};

// Get all inquiries
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      inquiries
    });
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get inquiries'
    });
  }
};

// Delete an inquiry
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    res.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete inquiry'
    });
  }
};
