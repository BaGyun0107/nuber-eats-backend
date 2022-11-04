import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true }) //? InputType은 GraphQL에서 사용되는 것이므로, NestJS에서는 isAbstract를 true로 설정해야 함
@ObjectType() //? GraphQL을 위한 decorator
@Entity() //? TypeORM을 위한 decorator
export class Restaurant {
  @PrimaryGeneratedColumn() //? Primary key를 생성하는 decorator
  @Field(() => Number) //? GraphQL을 위한 decorator
  id: number;

  @Field(() => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field(() => Boolean, { defaultValue: true }) //? defaultValue를 설정할 수 있음
  @Column({ default: true })
  @IsOptional() //? IsOptional은 해당 필드가 필수적이지 않음을 의미
  @IsBoolean()
  isVegan?: boolean;

  @Field(() => String, { defaultValue: '강남' })
  @Column()
  address: string;

  // @Field(() => String)
  // @Column()
  // ownerName: string;

  // @Field(() => String)
  // @Column()
  // categoryName: string;
}
