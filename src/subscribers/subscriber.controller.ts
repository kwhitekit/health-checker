import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseSubscriberWithServiceIdsDto } from '../components/subscription/subscriber-declaration/base-subscriber-with-service-ids.dto';
import { SubscriptionService } from '../components/subscription/subscription.service';
import { EmailSubscriberDto } from './email/emai-subscriber.dto';
import { SubscriberTypeEnum } from './subscriber-type.enum';

@ApiTags('subscriber')
@Controller('subscriber')
export class SubscriberController implements Record<SubscriberTypeEnum, Function> {
    constructor(private service: SubscriptionService) {}

    @Post(SubscriberTypeEnum.CONSOLE)
    [SubscriberTypeEnum.CONSOLE](@Body() body: BaseSubscriberWithServiceIdsDto<SubscriberTypeEnum.CONSOLE>) {
        return this.service.registerSubscription(body);
    }

    @Post(SubscriberTypeEnum.EMAIL)
    [SubscriberTypeEnum.EMAIL](@Body() body: EmailSubscriberDto) {
        return this.service.registerSubscription(body);
    }
}
