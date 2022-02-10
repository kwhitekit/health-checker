import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectedServiceModule } from '../inspected-service/inspected-service.module';
import { SubscriptionDbEntity } from './common/subscription.db-entity';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SubscriptionDbEntity]),
        InspectedServiceModule],
    controllers: [SubscriptionController],
    providers: [SubscriptionService],
})
export class SubscriptionModule {}
