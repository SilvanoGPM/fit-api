import { Module } from '@nestjs/common';

import { StaticModule } from '@infra/static/static.module';
import { HttpModule } from '@infra/http/http.module';

@Module({
  imports: [StaticModule, HttpModule],
})
export class AppModule {}
