//* dtos란?
//* dtos는 data transfer object의 약자로, 데이터를 전송하기 위한 객체를 의미함
//* dto는 node에서는 controller에서 사용하는 input과 output을 의미함
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  //? PickType은 User entity에서 필요한 필드만 가져옴
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
