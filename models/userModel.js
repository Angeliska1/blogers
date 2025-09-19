import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, "First name is required"] },
  lastName:  { type: String, required: [true, "Last name is required"] },
  email:     {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please fill a valid email address"]
  },
  password:  { type: String, required: [true, "Password is required"] },
  role:      { type: String,
     enum: ["reader", "author", "admin"], 
     default: "reader" }
}, { timestamps: true });

//Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving
userSchema.pre("save", async function(next) {
  if(!this.isModified("password")){
    return next();
  };
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
