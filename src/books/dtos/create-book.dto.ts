import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBookDto {
  @Field(() => Int)
  ISBN: number;

  @Field()
  title: string;

  @Field()
  language: string;

  @Field()
  publicationYear: string;

  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  noOfCopiesActual: number;

  @Field(() => Int)
  noOfCopiesCurrent: number;
}
