const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const uri = 'mongodb+srv://mahammadsayad433:saad123@medicine.xdatz4f.mongodb.net/eMedicine?retryWrites=true&w=majority&appName=Medicine';

async function resetPassword() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to database');

    const User = mongoose.model('User', new mongoose.Schema({
      password: String,
      role: String,
      email: String
    }));

    const newPassword = 'admin123'; // You can change this password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await User.updateOne(
      { role: 'admin' },
      { $set: { password: hashedPassword } }
    );

    if (result.modifiedCount > 0) {
      console.log('Admin password has been reset to:', newPassword);
    } else {
      console.log('No admin user found');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

resetPassword();
