import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const updateAdminRole = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find admin user by email
        const adminEmail = 'admin@asautomotors.com';
        const admin = await User.findOne({ email: adminEmail });

        if (!admin) {
            console.log('Admin user not found');
            return;
        }

        // Update role to admin
        admin.role = 'admin';
        await admin.save();

        console.log('Admin role updated successfully');
        console.log('Updated admin:', admin);

    } catch (error) {
        console.error('Error updating admin role:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

updateAdminRole(); 