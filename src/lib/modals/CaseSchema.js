import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";
import Inc from "mongoose-sequence";
import Doctor from "./DoctorSchema";
import Designer from "./DesignerSchema";
import CaseDefinition from "./CaseDefinitionSchema";

const AutoIncrement = Inc(mongoose); 

const CaseSchema = new Schema({
  caseNo: { type: Number, unique: true },
  doctor_id: { type: Schema.ObjectId, ref: 'Doctor', required: true },
  patientName: { type: String, required: true },
  entryDate: { type:[ Date], required: true },
  dueDate: { type: Date, required: true },
  designer_id: { type: Schema.ObjectId, ref: 'Designer', required: true },
  case_definition_id: { type: Schema.ObjectId, ref: 'CaseDefinition', required: true },
  status: { type: String, enum: ['Accepted', 'Rejected', 'Missing Info'], required: true },
  designed: { type: Boolean, required: true, default: false },
  //اول ما يضغط ديزايند يعمل الرت انه نجاح ويتسجل التاريخ 
  designed_dedline_date:{ type: Date },//24 from entery date هجيب الفترة  ما بين الانتري والان اكبر من 24 ساعه خطر اكبر من 8 تحذير اقل من 8 اخضر  لو هيا لو عدت الديد لاين اعمل الرت 
  Try_in: { type: Boolean, required: true, default: true  },
  confirmed: { type: Boolean, required: true, default: false  },
  redesign: { type: Boolean, required: true, default: false  },
//اول ما يضغط كونفيرم احسب التاريخ 

  confirmed_date:{ type: Date },
  production: { type: Boolean, required: true, default: false },
/*************  ✨ Codeium Command ⭐  *************/
    /**
     * Sets Production_dedline_date to confirmed_date + 36 hours if confirmed_date is present
     * @returns {Date|null} The calculated date or null if confirmed_date is null
     */
/******  9c757eaa-bb91-4825-b822-84cee5e12f4b  *******/
  Production_dedline_date:{ type: Date,default: function () {
      // Set Production_dedline_date to confirmed_date + 36 hours
      return this.confirmed_date ? new Date(this.confirmed_date.getTime() + 36 * 60 * 60 * 1000) : null;
    } },//يبقى 36 ساعه بعد التاكيد 
//احمر اكبر من 36 
//  alertتاريخ الان ناقص ال كونفيرم ازرق اقل من 18 اصفر اكبر من  18
  delivered: { type: Boolean, required: true, default: false },
  shade: { type: String, default: "" }
});

CaseSchema.plugin(AutoIncrement, { inc_field: 'caseNo' });

// Virtual field for Doctor
CaseSchema.virtual('doctor', {
  ref: 'Doctor', // The model to use
  localField: 'doctor_id', // The field in the CaseSchema
  foreignField: '_id', // The field in the DoctorSchema
  justOne: true // Set to true for one-to-one relationship
});

// Virtual field for Designer
CaseSchema.virtual('designer', {
  ref: 'Designer',
  localField: 'designer_id',
  foreignField: '_id',
  justOne: true
});

// Virtual field for CaseDefinition
CaseSchema.virtual('caseDefinition', {
  ref: 'CaseDefinition',
  localField: 'case_definition_id',
  foreignField: '_id',
  justOne: true
});

// Ensure virtual fields are included when converting documents to JSON
CaseSchema.set('toObject', { virtuals: true });
CaseSchema.set('toJSON', { virtuals: true });

const Case = models.Case || model("Case", CaseSchema);
export default Case;
