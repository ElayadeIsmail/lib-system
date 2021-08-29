import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryDto {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
