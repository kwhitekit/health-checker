import {
    Body, Controller, Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddMoreSubscriptionsDto } from './dto/add-more-subscriptions.dto';
import { SubscriptionService } from './subscription.service';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController {
    constructor(private subscriptionService: SubscriptionService) { }

    @Post('add-more')
    addMoreSubscriptions(@Body() addMoreSubscriptionsDto: AddMoreSubscriptionsDto): Promise<void> {
        const { serviceIds: servicesIds, subscriberId } = addMoreSubscriptionsDto;

        return this.subscriptionService.addMoreServices(servicesIds, subscriberId);
    }
}
