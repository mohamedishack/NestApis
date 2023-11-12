// src/prescription/prescription.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrescriptionSchema } from './prescription.model';
import { PrescriptionResolver } from './prescription.resolver';
import { PrescriptionService } from './prescription.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Prescription', schema: PrescriptionSchema }]),
  ],
  providers: [PrescriptionResolver, PrescriptionService],
})
export class PrescriptionModule {}
