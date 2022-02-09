import { BaseSubscriber, TOnmessage } from '../../components/subscription/subscriber-declaration/base-subscriber';
import { SubscriberTypeEnum } from '../subscriber-type.enum';

export class EmailSubscriber extends BaseSubscriber<SubscriberTypeEnum.EMAIL> {
    public static async get(type: SubscriberTypeEnum.EMAIL, onMessage: TOnmessage): Promise<EmailSubscriber> {
        return Promise.resolve(new EmailSubscriber(type, onMessage));
    }
}
