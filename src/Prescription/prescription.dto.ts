import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class MedicationObject {
  @Field()
  id: string;

  @Field()
  dosage: string;
}
@ObjectType()
export class PatientObject {
  @Field()
  name: string;

  @Field()
  nhi: string;
}
@ObjectType()
export class PrescriptionObject {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field(() => PatientObject) // Define the explicit type here
  patient: PatientObject;


  @Field()
  date: string;

  @Field(() => [MedicationObject])
  medications: MedicationObject[];
}




