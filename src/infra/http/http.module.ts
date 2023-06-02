import { Module } from '@nestjs/common';

import { ExerciceController } from './controllers/exercice.controller';
import { FoodController } from './controllers/food.controller';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { GenericModule } from './modules/generic.module';
import { UserModule } from './modules/user.module';
import { RefreshTokenModule } from './modules/refresh-token.module';
import { FoodModule } from './modules/food.module';
import { ExerciceModule } from './modules/exercice.module';

@Module({
  imports: [
    GenericModule,
    UserModule,
    RefreshTokenModule,
    FoodModule,
    ExerciceModule,
  ],
  controllers: [
    ExerciceController,
    FoodController,
    UserController,
    AuthController,
  ],
})
export class HttpModule {}
