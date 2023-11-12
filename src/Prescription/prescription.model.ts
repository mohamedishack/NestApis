import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Prescription extends Document {
  @Prop({
    type: {
      nhi: String,
      name: String,
    },
  })
  patient: {
    nhi: string;
    name: string;
  };
  @Prop()
  date: string;
  @Prop([
    {
      id: String,
      dosage: String,
    },
  ])
  medications: Array<{ id: string; dosage: string }>;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
