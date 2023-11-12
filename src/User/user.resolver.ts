import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { User } from "./user.model";
import {
  UserRegistrationDto,
  UserLoginDto,
  UserRegistrationObjectDto,
} from "./userRegistration.dto";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserRegistrationObjectDto)
  async register(@Args("userDto") userDto: UserRegistrationDto) {
    return this.userService.register(userDto);
  }

  @Query(() => String)
  async login(@Args("userDto") userDto: UserLoginDto) {
    const token = await this.userService.login(userDto);
    if (!token) {
      return null; // Invalid login
    }
    return token;
  }
}
