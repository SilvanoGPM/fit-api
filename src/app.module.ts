import { Module } from '@nestjs/common';

import { StaticModule } from '@infra/static/static.module';
import { HttpModule } from '@infra/http/http.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@infra/database/auth/auth.module';

@Module({
  imports: [StaticModule, AuthModule, DatabaseModule, HttpModule],
})
export class AppModule {}
