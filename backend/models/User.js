// models/User.js
import mongoose from 'mongoose';

//this is the schema for the user to save the password and username in the database
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: Number },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  chatHistory:[
    {
      message:String,
      sender:{type:String, enum:['user','bot']},
      timestamp:{type:Date, default:Date.now}
    }
  ]
  
  // isAdmin: { type: Boolean, default: false } // Optional alternative
});

export default mongoose.model('User', userSchema);
