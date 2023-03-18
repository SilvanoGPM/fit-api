import { Module } from '@nestjs/common';

import { CreateExerciceUseCase } from '@app/use-cases/exercices/create-exercice-use-case';
import { GetAllExercicesUseCase } from '@app/use-cases/exercices/get-all-exercices-use-case';
import { GetExerciceByIdUseCase } from '@app/use-cases/exercices/get-exercice-by-id-use-case';
import { ReplaceExerciceUseCase } from '@app/use-cases/exercices/replace-exercice-use-case';
import { SearchExercicesUseCase } from '@app/use-cases/exercices/search-exercices-use-case';
import { CreateFoodUseCase } from '@app/use-cases/foods/create-food-use-case';
import { GetAllFoodsUseCase } from '@app/use-cases/foods/get-all-foods-use-case';
import { GetFoodByNameUseCase } from '@app/use-cases/foods/get-food-by-name-use-case';
import { GetFoodByIdUseCase } from '@app/use-cases/foods/get-food-by-id-use-case';
import { ReplaceFoodUseCase } from '@app/use-cases/foods/replace-food-use-case';
import { SearchFoodsUseCase } from '@app/use-cases/foods/search-foods-use-case';
import { GetAllCategoriesUseCase } from '@app/use-cases/foods/get-all-categories-use-case';
import { DatabaseModule } from '@infra/database/database.module';
import { GetAllUsersUseCase } from '@app/use-cases/users/get-all-users-use-case';
import { GetUserByEmailUseCase } from '@app/use-cases/users/get-user-by-email-use-case';
import { CreateUserUseCase } from '@app/use-cases/users/create-user-use-case';
import { UserExistsByEmailUseCase } from '@app/use-cases/users/user-exists-by-email-use-case';
import { RefreshAccessTokenUseCase } from '@app/use-cases/refresh-tokens/refresh-access-token-use-case';
import { LoginUseCase } from '@app/use-cases/refresh-tokens/login-use-case';
import { CreateRefreshTokenUseCase } from '@app/use-cases/refresh-tokens/create-refresh-token-use-case';
import { GenerateAccessTokenUseCase } from '@app/use-cases/refresh-tokens/generate-access-token-use-case';
import { GetRefreshTokenByTokenUseCase } from '@app/use-cases/refresh-tokens/get-refresh-token-by-token-use-case';
import { GetRefreshTokensByUserUseCase } from '@app/use-cases/refresh-tokens/get-refresh-tokens-by-user-use-case';
import { RevokeRefreshTokenUseCase } from '@app/use-cases/refresh-tokens/revoke-refresh-token-use-case';
import { GetUserByIdUseCase } from '@app/use-cases/users/get-user-by-id-use-case';
import { GetRefreshTokenByIdUseCase } from '@app/use-cases/refresh-tokens/get-refresh-token-by-id-use-case';

import { ExerciceController } from './controllers/exercice.controller';
import { GenericService } from './services/generic.service';
import { FoodController } from './controllers/food.controller';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './auth/strategies/refresh.strategy';
import { ReplaceUserUseCase } from '@app/use-cases/users/replace-user-use-case';
import { PromoteUserUseCase } from '@app/use-cases/users/promote-user-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    ExerciceController,
    FoodController,
    UserController,
    AuthController,
  ],
  providers: [
    GenericService,
    JwtStrategy,
    JwtRefreshTokenStrategy,

    CreateExerciceUseCase,
    GetAllExercicesUseCase,
    GetExerciceByIdUseCase,
    ReplaceExerciceUseCase,
    SearchExercicesUseCase,

    GetAllFoodsUseCase,
    GetAllCategoriesUseCase,
    GetFoodByNameUseCase,
    GetFoodByIdUseCase,
    CreateFoodUseCase,
    ReplaceFoodUseCase,
    SearchFoodsUseCase,

    GetAllUsersUseCase,
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
    CreateUserUseCase,
    UserExistsByEmailUseCase,

    LoginUseCase,
    RefreshAccessTokenUseCase,
    CreateRefreshTokenUseCase,
    GenerateAccessTokenUseCase,
    GetRefreshTokenByTokenUseCase,
    GetRefreshTokenByIdUseCase,
    GetRefreshTokensByUserUseCase,
    RevokeRefreshTokenUseCase,
    ReplaceUserUseCase,
    PromoteUserUseCase,
  ],
})
export class HttpModule {}
