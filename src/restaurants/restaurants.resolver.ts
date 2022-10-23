import { Query, Resolver } from '@nestjs/graphql';

@Resolver() //? Resolver는 GraphQL의 Query를 처리하는 함수를 가지고 있음
export class RestaureantResolver {
  @Query(() => Boolean)
  isPizzaGood(): boolean {
    return true;
  }
}
