import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel } from "./user.model";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { ExternalApiService } from "./externalApi";

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserModel }])],
  providers: [UserResolver, UserService, ExternalApiService],
})
export class UserModule {}
