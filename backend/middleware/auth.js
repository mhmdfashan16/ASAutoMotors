// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
    try {
        // Get token from cookie or Authorization header
        const token = req.cookies.adminToken || req.headers.authorization?.split(' ')[1];
        console.log('Auth token:', token); // Debug log

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'No token provided' 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Debug log

        // Get user from database
        const user = await User.findById(decoded.id);
        console.log('Found user:', user); // Debug log

        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ 
            success: false,
            message: 'Invalid token' 
        });
    }
};

export const authorizeAdmin = async (req, res, next) => {
    try {
        console.log('Checking admin role:', req.user);
        
        // Get fresh user data from database
        const user = await User.findById(req.user._id);
        console.log('Fresh user data:', user); // Debug log

        if (!user) {
            console.log('User not found in database');
            return res.status(401).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        if (user.role !== 'admin') {
            console.log('User role check failed. Role:', user.role);
            return res.status(403).json({ 
                success: false,
                message: 'Access denied. Admins only.' 
            });
        }

        // Update req.user with fresh data
        req.user = user;
        next();
    } catch (error) {
        console.error('Admin authorization error:', error);
        res.status(403).json({ 
            success: false,
            message: 'Access denied. Admins only.' 
        });
    }
};

export const authAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
   

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No admin token provided',
      });
    }

    // Verify the admin token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admins only.',
      });
    }

    // Attach fresh user to request
    req.user = user;
    next();

  } catch (error) {
    console.error('Admin authorization error:', error.message);
    res.status(403).json({
      success: false,
      message: 'Access denied. Invalid or expired admin token.',
    });
  }
};

