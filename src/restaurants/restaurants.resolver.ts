import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver(() => Restaurant) //? Resolver는 GraphQL의 Query를 처리하는 함수를 가지고 있음
export class RestaureantResolver {
  constructor(private readonly restaurantsServiece: RestaurantService) {}
  @Query(() => [Restaurant]) //? Query는 GraphQL의 Query를 처리하는 함수를 가지고 있음
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantsServiece.getAll();
  }
  @Mutation(() => Boolean) //? Mutation은 GraphQL의 Mutation을 처리하는 함수를 가지고 있음
  async createRestaurant(
    @Args('input') createRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantsServiece.createRestaurant(createRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async updateRestaurant(
    @Args('input') updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantsServiece.updateRestaurant(updateRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
