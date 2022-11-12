//* entity는 node에서 model과 비슷한 역할을 함
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum } from 'class-validator';

enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' }); //? GraphQL에서 enum을 사용하기 위해 registerEnumType을 사용

@InputType({ isAbstract: true }) //? InputType은 GraphQL에서 사용되는 것이므로, NestJS에서는 isAbstract를 true로 설정해야 함
@ObjectType()
@Entity()
export class User extends CoreEntity {
  //? User entity는 CoreEntity를 상속받음
  @Column()
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    //? BeforeInsert는 해당 entity가 DB에 저장되기 전에 실행되는 함수
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    //? 입력받은 password와 DB에 저장된 password를 비교하는 함수
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
