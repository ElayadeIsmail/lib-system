import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class CreateLibrarianDto {
  @Length(3, 10)
  @Field()
  firstName: string;

  @Length(3, 10)
  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @Length(6, 20)
  @Field()
  password: string;

  @Field({ defaultValue: false })
  isAdmin?: boolean;
}
