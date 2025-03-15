import { Schema, model, models } from "mongoose";
const DesignerSchema = new Schema({
    name: { type: String, required: true, unique: true }
  });
  const Designer = models.Designer || model("Designer", DesignerSchema);
  export default Designer;
  