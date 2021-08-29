import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBookDto {
  @Field(() => Int)
  ISBN: number;

  @Field()
  title: string;

  @Field()
  language: string;

  @Field(() => Int)
  bindingId: number;

  @Field()
  PublicationYear: string;

  @Field(() => Int)
  CategoryType: number;

  @Field(() => Int)
  NoOfCopiesActual: number;

  @Field(() => Int)
  NoOfCopiesCurrent: number;
}
