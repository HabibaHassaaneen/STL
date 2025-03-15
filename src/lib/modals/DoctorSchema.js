import { Schema, model, models } from "mongoose";

const DoctorSchema = new Schema({
  name: { type: String, required: true, unique: true },
  picture: { type: String, default: null }
});
const Doctor = models.Doctor || model("Doctor", DoctorSchema);
export default Doctor;
