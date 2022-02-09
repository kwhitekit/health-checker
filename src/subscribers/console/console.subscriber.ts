import { BaseSubscriber, TOnmessage } from '../../components/subscription/subscriber-declaration/base-subscriber';
import { SubscriberTypeEnum } from '../subscriber-type.enum';

export class ConsoleSubscriber extends BaseSubscriber<SubscriberTypeEnum.CONSOLE> {
    public static async get(type: SubscriberTypeEnum.CONSOLE, onMessage: TOnmessage) {
        return Promise.resolve(new ConsoleSubscriber(type, onMessage));
    }
}
