import { Schema, models, model } from "mongoose";

const docSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  ownerId: [{ type: Schema.Types.ObjectId, ref: "User" }],
  sharedWith: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Doc = models.Doc || model("Doc", docSchema);

export default Doc;
