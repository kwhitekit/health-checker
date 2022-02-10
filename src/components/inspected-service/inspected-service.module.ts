import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectedServiceDbEntity } from './common/inspected-service.db-entity';
import { InspectedServiceController } from './inspected-service.controller';
import { InspectedServiceService } from './inspected-service.service';
import { MonitoringService } from './monitoring/monitoring.service';

@Module({
    imports: [TypeOrmModule.forFeature([InspectedServiceDbEntity])],
    controllers: [InspectedServiceController],
    providers: [InspectedServiceService, MonitoringService],
    exports: [MonitoringService],
})
export class InspectedServiceModule {}
