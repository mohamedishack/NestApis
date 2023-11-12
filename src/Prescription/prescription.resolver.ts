import { Query, Args, Mutation, Resolver } from "@nestjs/graphql";
import { Prescription } from "./prescription.model";
import { PrescriptionService } from "./prescription.service";
import { PrescriptionObject } from "./prescription.dto";
import { CreatePrescriptionInput } from "./prescription.input.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../User/authGuard";
@UseGuards(JwtAuthGuard)
@Resolver("Prescription")
export class PrescriptionResolver {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Query(() => [PrescriptionObject])
  getAllPrescriptions(): Promise<Prescription[]> {
    return this.prescriptionService.findAll();
  }

  @Query(() => PrescriptionObject)
  getPrescriptionByNHI(@Args("nhi") nhi: string): Promise<Prescription | null> {
    return this.prescriptionService.findOneByNHI(nhi);
  }

  @Mutation(() => PrescriptionObject)
  addPrescription(
    @Args("prescription") prescription: CreatePrescriptionInput,
  ): Promise<PrescriptionObject> {
    return this.prescriptionService.addPrescription(prescription);
  }

  @Mutation(() => PrescriptionObject)
  editPrescription(
    @Args("nhi") nhi: string,
    @Args("prescription") prescription: CreatePrescriptionInput,
  ): Promise<PrescriptionObject | null> {
    return this.prescriptionService.editPrescription(nhi, prescription);
  }
}
