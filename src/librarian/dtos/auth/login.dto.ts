import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class LoginInputDto {
  @IsEmail()
  @Field()
  email: string;

  @Length(6, 20)
  @Field()
  password: string;
}
