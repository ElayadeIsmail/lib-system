import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Book {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ unique: true })
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
  @Column({ type: 'date' })
  PublicationYear: string;

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
