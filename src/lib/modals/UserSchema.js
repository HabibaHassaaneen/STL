import { Schema, model, models } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"; // Correct import

const UserSchema = new Schema({
    username: { type: String, required: [true, 'Please tell us your name'], unique: true },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: { type: String, required: true, minlength: 6, maxlength: 128, select: false },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords do not match!',
        },
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
      },
});

// Hash the password before saving to the database
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmPassword = undefined; // Remove confirmPassword from database
    }
    next();
});
UserSchema.methods.comparePassword=async function(enteredPassword,originalPassword){
    return await bcrypt.compare(enteredPassword,originalPassword);
}
const User = models.User || model("User", UserSchema);
export default User;
