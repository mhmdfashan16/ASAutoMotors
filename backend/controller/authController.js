// controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Validate role manually if needed (optional)
    const allowedRoles = ['user', 'admin'];
    const finalRole = allowedRoles.includes(role) ? role : 'user';

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: finalRole,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('userToken', token, { httpOnly: true, maxAge: 86400000 });

    res.json({
      success: true,
      message: 'Registered successfully',
      user,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Generate token for both admin and regular users
    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role,
        email: user.email 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    // Set cookie with proper settings for cross-origin
    res.cookie('userToken', token, {
      httpOnly: false, // Changed to false to allow JavaScript access
      secure: false, // false for local development
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      domain: 'localhost'
    });

    // Set additional headers for cross-origin
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');

    // Check if user is admin
    if (user.role === 'admin') {
      return res.json({ 
        success: true, 
        message: 'Admin logged in successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: 'admin'
        },
        token // Send token in response
      });
    }

    // Regular user login response
    res.json({ 
      success: true, 
      message: 'Logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token // Send token in response
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during login' 
    });
  }
};

export const logout = async(req,res)=>{
    try{
        res.clearCookie('userToken');
        res.clearCookie('adminToken');
        res.json({ success: true, message: 'Logged out successfully' });
    }catch(error){
      res.json({success:false, message:error.message});

    }
}

export const verify = async (req, res) => {
    try {
        const userToken = req.cookies.userToken;
        const adminToken = req.cookies.adminToken;
        
        if (!userToken) {
            return res.status(401).json({
                success: false,
                message: 'No user token provided'
            });
        }

        // Verify user token
        const decodedUser = jwt.verify(userToken, process.env.JWT_SECRET);
        const user = await User.findById(decodedUser.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // If admin token exists, verify it too
        if (adminToken) {
            try {
                const decodedAdmin = jwt.verify(adminToken, process.env.JWT_SECRET);
                if (decodedAdmin.role !== 'admin' || decodedAdmin.id !== user._id.toString()) {
                    return res.status(403).json({
                        success: false,
                        message: 'Invalid admin token'
                    });
                }
            } catch (error) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid admin token'
                });
            }
        }

        res.json({
            success: true,
            message: 'Token is valid',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};