import mongoose from "mongoose";
import bycript from "bcrypt"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});


userSchema.pre("save",async function (next) {
  if(!this.isModified('password'))return next()
  this.password = await bycript.hash(this.password,10)
next()
})



export default mongoose.model("User", userSchema);