import { Module } from '@nestjs/common';
import { RestaureantResolver } from './restaurants.resolver';

@Module({
  providers: [RestaureantResolver],
})
export class RestaurantsModule {}
