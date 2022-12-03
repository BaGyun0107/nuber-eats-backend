import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CoreEntity {
  @PrimaryGeneratedColumn() //? Primary key를 생성하는 decorator
  @Field(() => Number)
  id: number;

  @CreateDateColumn() //? Entity가 생성될 때 자동으로 생성되는 column
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn() //? Entity가 업데이트될 때 자동으로 생성되는 column
  @Field(() => Date)
  updatedAt: Date;
}
