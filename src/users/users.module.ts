import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigService], //? User entity를 import
  providers: [UsersResolver, UsersService], //? User entity를 사용하는 resolver와 service를 import
  //* providers는 NestJS가 이 모듈을 import할 때 함께 import할 것들을 지정
})
export class UsersModule {}
