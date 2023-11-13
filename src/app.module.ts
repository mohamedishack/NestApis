import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { PrescriptionModule } from "./Prescription/prescription.module";
import { UserModule } from "./User/user.module";
import { MongooseModule } from "@nestjs/mongoose";
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/your-database-name"),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UserModule,
    PrescriptionModule
  ],
})
export class AppModule {}
