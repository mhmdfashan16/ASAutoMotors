// controllers/inquiryController.js
import Inquiry from '../models/Inquiry.js';
import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json({ success: true, inquiries });
    } catch (error) {
        console.error('Error getting inquiries:', error);
        res.status(500).json({ success: false, message: 'Error getting inquiries' });
    }
};

export const addInquiry = async (req, res) => {
    try {
        const { name, email, phone, message, subject } = req.body;
        const inquiry = new Inquiry({ name, email, phone, message, subject });
        await inquiry.save();
        res.status(201).json({ success: true, inquiry });
    } catch (error) {
        console.error('Error adding inquiry:', error);
        res.status(500).json({ success: false, message: 'Error adding inquiry' });
    }
};

export const createInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.create(req.body);
        res.json({ success: true, inquiry });
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

// Delete inquiry
export const deleteInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const inquiry = await Inquiry.findByIdAndDelete(id);
        
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
        console.error('Error deleting inquiry:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting inquiry' 
        });
    }
};
