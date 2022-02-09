import { TSubscriberContract } from '../../components/subscription/subscriber-declaration/all-subscribers-map';
import { BaseSubscriber } from '../../components/subscription/subscriber-declaration/base-subscriber';
import { SubscriberTypeEnum } from '../../components/subscription/subscriber-declaration/subscriber-type.enum';

class ConsoleSubscriber extends BaseSubscriber<SubscriberTypeEnum.CONSOLE> { }

export const CONSOLE_SUBSCRIBER_CONTRACT: TSubscriberContract<SubscriberTypeEnum.CONSOLE> = {
    type: SubscriberTypeEnum.CONSOLE,
    dtoValidator(data) {
        return data?.type === SubscriberTypeEnum.CONSOLE;
    },
    subscriberConstructor(data) {
        return new ConsoleSubscriber(data.type, console.info);
    },
};
