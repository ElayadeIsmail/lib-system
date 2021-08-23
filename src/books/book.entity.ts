import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Book {
  @Field(() => Int)
  @PrimaryColumn()
  ISBN: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  language: string;

  @Field(() => Int)
  @Column()
  bindingId: number;

  @Field()
  @Column()
  PublicationYear: Date;

  @Field(() => Int)
  @Column()
  CategoryType: number;

  @Field(() => Int)
  @Column()
  NoOfCopiesActual: number;

  @Field(() => Int)
  @Column()
  NoOfCopiesCurrent: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;
}
