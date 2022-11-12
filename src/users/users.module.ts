import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //? User entity를 import
  providers: [UsersResolver, UsersService], //? User entity를 사용하는 resolver와 service를 import
  //* providers는 NestJS가 이 모듈을 import할 때 함께 import할 것들을 지정
  exports: [UsersService], //? 다른 모듈에서도 UsersService를 사용할 수 있도록 함
})
export class UsersModule {}
