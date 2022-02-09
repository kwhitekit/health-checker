import { TSubscriberContract } from '../all-subscribers-map';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { ConsoleSubscriber } from './console.subscriber';

export const CONSOLE_SUBSCRIBER_CONTRACT: TSubscriberContract<SubscriberTypeEnum.CONSOLE> = {
    type: SubscriberTypeEnum.CONSOLE,

    dtoValidator(dto) {
        return dto?.type === SubscriberTypeEnum.CONSOLE;
    },

    resolveSubscriber(dto) {
        return ConsoleSubscriber.get(dto);
    },
};
