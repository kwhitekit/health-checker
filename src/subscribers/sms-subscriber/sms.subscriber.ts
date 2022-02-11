import TVonage from '@vonage/server-sdk';
import { BaseSubscriber } from '../../components/subscription/subscriber-declaration/base-subscriber';
import { IOnMessage } from '../../components/subscription/subscriber-declaration/onmessage.interface';
import { HealthReportResDto } from '../../general/health-report.res.dto';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { SmsSubscriberDto } from './sms-subscriber.dto';

const Vonage = require('@vonage/server-sdk');

export class SmsSubscriber extends BaseSubscriber<SubscriberTypeEnum.SMS> implements IOnMessage {
    private static vonage: TVonage;

    onMessage(message: HealthReportResDto) {
        const { to } = this.dto;
        SmsSubscriber.vonage.message.sendSms(message.name, to, `${message.status}: ${message.checkedUrl}`, {}, (err, data) => {
            if (err) {
                console.error(err);
                throw err;
            }

            console.info(data);
        });
    }

    constructor(private dto: SmsSubscriberDto) {
        super(dto.type);
    }

    public static async get(dto: SmsSubscriberDto): Promise<SmsSubscriber> {
        SmsSubscriber.vonage = new Vonage({
            apiKey: process.env.VONAGE_API_KEY,
            apiSecret: process.env.VONAGE_API_SECRET,
        });

        return new SmsSubscriber(dto);
    }
}
