import { Module } from '@nestjs/common';
import { InspectedServiceModule } from '../inspected-service/inspected-service.module';
import { SubscriptionService } from './subscription.service';

@Module({
    imports: [InspectedServiceModule],
    providers: [SubscriptionService],
})
export class SubscriptionModule {}
