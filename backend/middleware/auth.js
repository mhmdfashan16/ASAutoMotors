// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
    try {
        // Get token from cookie or Authorization header
        const token = req.cookies.userToken || req.headers.authorization?.split(' ')[1];
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
        console.log('Checking admin role:', req.user); // Debug log
        
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


// middleware/auth.js
// export const authenticate = (req, res, next) => {
//    const adminToken = req.cookies;
//   if (!token) return res.status(403).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {

//     return res.status(401).json({ message: 'Invalid token' });

//   }
// };