import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class PatientInput {
  @Field()
  name: string;

  @Field()
  nhi: string;
}
@InputType()
class MedicationInput {
  @Field()
  id: string;

  @Field()
  dosage: string;
}
@InputType()
export class CreatePrescriptionInput {
  @Field(() => PatientInput) // Define the explicit type here
  patient: PatientInput;

  @Field()
  date: string;

  @Field(() => [MedicationInput])
  medications: MedicationInput[];
}


