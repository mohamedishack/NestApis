import { InputType, Field, ObjectType } from "@nestjs/graphql";

@InputType()
export class UserRegistrationDto {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UserLoginDto {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class UserRegistrationObjectDto {
  @Field()
  username: string;

  @Field()
  email: string;
}
