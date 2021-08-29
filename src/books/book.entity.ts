import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';

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

  @Field()
  @Column({ type: 'date' })
  publicationYear: string;

  @Field(() => Int)
  @Column()
  categoryId: number;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.books)
  category: Category;

  @Field(() => Int)
  @Column()
  noOfCopiesActual: number;

  @Field(() => Int)
  @Column()
  noOfCopiesCurrent: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateDateTime: Date;
}
