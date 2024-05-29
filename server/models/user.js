import mongoose from "mongoose";

// for user schema we require user name, email, password,

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, //When you set select: false for a field in a schema definition, it means that the field will not be returned by default when querying documents from the database.
  },
});

export const User = mongoose.model("User", UserSchema);
