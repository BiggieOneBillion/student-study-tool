import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  studyMaterials: {
    type: Array,
    required: false,
    default: [],
  },
  researchDocs: {
    owner: [{ type: Schema.Types.ObjectId, ref: "Docs" }],
    shared: [{ type: Schema.Types.ObjectId, ref: "Docs" }],
  },
});

const User = models.User || model("User", userSchema);

export default User;
