import { Schema, model, models } from "mongoose";
const CaseDefinitionSchema = new Schema({
    name: { type: String, required: true, unique: true }
  });
  const CaseDefinition = models.CaseDefinition || model("CaseDefinition", CaseDefinitionSchema);
  export default CaseDefinition;
  