const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// MongoDB connection URL from your .env
const uri = 'mongodb+srv://mahammadsayad433:saad123@medicine.xdatz4f.mongodb.net/eMedicine?retryWrites=true&w=majority&appName=Medicine';

// Admin details you want to add
const adminData = {
    name: {
        firstName: 'Admin',
        lastName: 'User'
    },
    email: 'admin@example.com', // Change this to your desired admin email
    password: 'admin123',       // Change this to your desired password
    role: 'admin',             // Based on your ENUM_USER_ROLE
    phoneNumber: '1234567890',
};

// Create User Schema
const userSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String,
    },
    email: String,
    password: String,
    role: String,
    phoneNumber: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function createAdmin() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        adminData.password = await bcrypt.hash(adminData.password, salt);

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            return;
        }

        // Create new admin
        const admin = await User.create(adminData);
        console.log('Admin created successfully:', admin);

    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();
