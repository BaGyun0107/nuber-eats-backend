//* service란?
//* service는 resolver가 요청한 작업을 수행하는 함수들을 모아놓은 것
//* service는 node에서 controller와 비슷한 역할을 함
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';

@Injectable() //? injectable decorator를 사용하여 NestJS가 이 클래스를 inject할 수 있도록 함
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>, //? InjectRepository()를 사용하여 User entity를 사용할 수 있도록 함
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        // error 보여주기
        return {
          ok: false,
          error: '해당 이메일을 가진 사용자가 이미 존재합니다.',
        };
      }
      await this.users.save(this.users.create({ email, password, role })); //? save()는 create()와 달리 DB에 저장
      return { ok: true };
    } catch (e) {
      // error 보여주기
      return { ok: false, error: '계정을 생성할 수 없습니다.' };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    // email을 가진 user가 있는지 확인
    // password가 일치하는지 확인
    // JWT를 생성하고 user에게 줌
    try {
      const user = await this.users.findOne({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: '해당 이메일을 가진 사용자가 존재하지 않습니다.',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: '비밀번호가 일치하지 않습니다.',
        };
      }
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<User> {
    return this.users.findOne({ where: { id } });
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<User> {
    const user = await this.users.findOne({ where: { id: userId } });
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    return this.users.save(user);
  }
}
