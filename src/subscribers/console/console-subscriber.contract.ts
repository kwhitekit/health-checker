import { TSubscriberContract } from '../all-subscribers-map';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { ConsoleSubscriber } from './console.subscriber';

export const CONSOLE_SUBSCRIBER_CONTRACT: TSubscriberContract<SubscriberTypeEnum.CONSOLE> = {
    type: SubscriberTypeEnum.CONSOLE,

    dtoValidator(data) {
        return data?.type === SubscriberTypeEnum.CONSOLE;
    },

    resolveSubscriber(data) {
        return ConsoleSubscriber.get(data.type, console.info);
    },
};
