import {
    Body, Controller, Post, UseGuards,
} from '@nestjs/common';
import { AddMoreSubscriptionsDto } from './dto/add-more-subscriptions.dto';
import { RegisterSubscriberDto } from './dto/register-subscriber.dto';
import { SubscriberTypeServiceIdsGuard } from './subscriber-declaration/subscriber-guard';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
    constructor(private subscriptionService: SubscriptionService) { }

    @UseGuards(new SubscriberTypeServiceIdsGuard())
    @Post()
    public registerSubscriber<T extends RegisterSubscriberDto>(@Body() subscriberDto: T): Promise<void> {
        const { servicesIds, ...constructorPayload } = subscriberDto;

        return this.subscriptionService.subscribe(servicesIds, constructorPayload);
    }

    @Post('add-more')
    addMoreSubscriptions(@Body() addMoreSubscriptionsDto: AddMoreSubscriptionsDto): Promise<void> {
        const { servicesIds, subscriberId } = addMoreSubscriptionsDto;

        return this.subscriptionService.subscribe(servicesIds, subscriberId);
    }
}
