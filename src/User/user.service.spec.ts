// user.service.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";
import { ExternalApiService } from "./externalApi";
import { UserRegistrationDto } from "./userRegistration.dto";

describe("UserService", () => {
  let userService: UserService;
  let externalApiService: ExternalApiService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ExternalApiService,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();
    externalApiService = module.get<ExternalApiService>(ExternalApiService);
    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });
});
