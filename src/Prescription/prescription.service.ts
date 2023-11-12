import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prescription } from './prescription.model';
import { CreatePrescriptionInput } from './prescription.input.dto';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectModel('Prescription')
    private readonly prescriptionModel: Model<Prescription>,
  ) {}

  async findAll(): Promise<Prescription[]> {
    return this.prescriptionModel.find().exec();
  }

  async findOneByNHI(nhi: string): Promise<Prescription | null> {
    return this.prescriptionModel
      .findOne({ 'patient.nhi': { $regex: nhi } })
      .exec();
  }

  async addPrescription(prescription: CreatePrescriptionInput): Promise<Prescription> {
    const newPrescription = new this.prescriptionModel(prescription);
    return newPrescription.save();
  }

  async editPrescription(
    nhi: string,
    updatedPrescription: CreatePrescriptionInput,
  ): Promise<Prescription | null> {
    return this.prescriptionModel
      .findOneAndUpdate({ 'patient.nhi': nhi }, updatedPrescription, {
        new: true,
      })
      .exec();
  }
}
