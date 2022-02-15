import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from '../components/subscription/subscription.service';
import { ConsoleSubscriberDto } from './console/console-subscriber.dto';
import { EmailSubscriberDto } from './email/emai-subscriber.dto';
import { MongoSubscriberDto } from './mongo/mongo-subscriber.dto';
import { SmsSubscriberDto } from './sms-subscriber/sms-subscriber.dto';
import { SubscriberTypeEnum } from './subscriber-type.enum';
import { TelegramSubscriberDto } from './telegram/telegram-subscriber.dto';

@ApiTags('subscriber')
@Controller('subscriber')
export class SubscriberController implements Record<SubscriberTypeEnum, Function> {
    constructor(private service: SubscriptionService) {}

    @Post(SubscriberTypeEnum.CONSOLE)
    [SubscriberTypeEnum.CONSOLE](@Body() body: ConsoleSubscriberDto) {
        return this.service.registerSubscription(body);
    }

    @Post(SubscriberTypeEnum.EMAIL)
    [SubscriberTypeEnum.EMAIL](@Body() body: EmailSubscriberDto) {
        return this.service.registerSubscription(body);
    }

    @Post(SubscriberTypeEnum.SMS)
    [SubscriberTypeEnum.SMS](@Body() body: SmsSubscriberDto) {
        return this.service.registerSubscription(body);
    }

    @Post(SubscriberTypeEnum.TELEGRAM)
    [SubscriberTypeEnum.TELEGRAM](@Body() body: TelegramSubscriberDto) {
        return this.service.registerSubscription(body);
    }

    @Post(SubscriberTypeEnum.MONGO)
    [SubscriberTypeEnum.MONGO](@Body() body: MongoSubscriberDto) {
        return this.service.registerSubscription(body);
    }
}
