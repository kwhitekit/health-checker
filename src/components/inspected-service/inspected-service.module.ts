import { Module } from '@nestjs/common';
import { InspectedServiceController } from './inspected-service.controller';
import { InspectedServiceService } from './inspected-service.service';

@Module({
    controllers: [InspectedServiceController],
    providers: [InspectedServiceService],
})
export class InspectedServiceModule {}
