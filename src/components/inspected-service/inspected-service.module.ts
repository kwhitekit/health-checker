import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectedServiceDbEntity } from './common/inspected-service.db-entity';
import { InspectedServiceController } from './inspected-service.controller';
import { InspectedServiceService } from './inspected-service.service';

@Module({
    imports: [TypeOrmModule.forFeature([InspectedServiceDbEntity])],
    controllers: [InspectedServiceController],
    providers: [InspectedServiceService],
})
export class InspectedServiceModule {}
