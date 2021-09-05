import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLibrarianDto {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ defaultValue: false })
  isAdmin?: boolean;
}
