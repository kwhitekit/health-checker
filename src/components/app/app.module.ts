import { Module } from '@nestjs/common';
import { InspectedServiceModule } from '../inspected-service/inspected-service.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [InspectedServiceModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
