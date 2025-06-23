// controllers/promoController.js this endpoint helps to update the promotion for the product 
import Promotion from '../models/Promotion.js';

// Get all promotions
export const getPromos = async (req, res) => {
    try {
        const promos = await Promotion.find().sort({ createdAt: -1 });
        res.json({ success: true, promos });
    } catch (error) {
        console.error('Error getting promotions:', error);
        res.status(500).json({ success: false, message: 'Error getting promotions' });
    }
};

// Add new promotion
export const addPromo = async (req, res) => {
    try {
        const { title, description, discount, validUntil } = req.body;
        
        const promotion = new Promotion({
            title,
            description,
            discountAmount: discount,
            expiredDate: validUntil
        });

        await promotion.save();
        res.status(201).json({ success: true, promotion });
    } catch (error) {
        console.error('Error adding promotion:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Error adding promotion' 
        });
    }
};

// Delete promotion
export const deletePromo = async (req, res) => {
    try {
        const { id } = req.params;
        const promotion = await Promotion.findByIdAndDelete(id);
        
        if (!promotion) {
            return res.status(404).json({ 
                success: false, 
                message: 'Promotion not found' 
            });
        }

        res.json({ 
            success: true, 
            message: 'Promotion deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting promotion:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting promotion' 
        });
    }
};

