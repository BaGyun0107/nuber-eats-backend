import { ArgsType, Field, InputType, OmitType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class CreateRestaurantDto extends OmitType(
  Restaurant, //? OmitType은 Restaurant entity에서 필요한 필드만 가져옴
  ['id'], //? id는 필요 없으므로 제외
) {}
