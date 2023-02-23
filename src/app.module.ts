import { Module } from '@nestjs/common';

import { StaticModule } from '@infra/static/static.module';

@Module({
  imports: [StaticModule],
})
export class AppModule {}
