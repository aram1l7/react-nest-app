import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  controllers: [AppController],
  imports: [GatewayModule],
})
export class AppModule {}
