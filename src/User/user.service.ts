import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";
import {
  UserRegistrationDto,
  UserLoginDto,
  UserRegistrationObjectDto,
} from "./userRegistration.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ExternalApiService } from "./externalApi";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly externalApiService: ExternalApiService,
  ) {}

  async register(
    userDto: UserRegistrationDto,
  ): Promise<UserRegistrationObjectDto> {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    userDto.password = hashedPassword;
    const newUser = new this.userModel(userDto);
    // Save the user in the local database
    const savedUser = await newUser.save();

    // Send the user data to the external API
    // Send the user data to the external API
    try {
        const response = await this.externalApiService.sendUserDataToExternalApi(savedUser);
        console.log('User data sent to the external API:', response);
      } catch (error) {
        console.error('Failed to send user data to the external API:', error);
      }
  
    return savedUser as UserRegistrationObjectDto;
  }

  async login(userDto: UserLoginDto): Promise<string | null> {
    const user = await this.userModel.findOne({ email: userDto.email }).exec();
    if (!user) {
      return null; // User not found
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(userDto.password, user.password);

    if (!passwordMatch) {
      return null; // Password does not match
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "your-secret-key",
      {
        expiresIn: "1h", // Token expiration time
      },
    );

    return token;
  }
}
