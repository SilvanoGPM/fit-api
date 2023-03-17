import { Module } from '@nestjs/common';

import { StaticModule } from '@infra/static/static.module';
import { HttpModule } from '@infra/http/http.module';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [StaticModule, DatabaseModule, HttpModule],
})
export class AppModule {}
