import { BadRequestException } from '@nestjs/common';
import { TSubscriberContract } from '../all-subscribers-map';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { ConsoleSubscriber } from './console.subscriber';

export const CONSOLE_SUBSCRIBER_CONTRACT: TSubscriberContract<SubscriberTypeEnum.CONSOLE> = {
    type: SubscriberTypeEnum.CONSOLE,

    dtoValidator(dto) {
        if (dto?.type === SubscriberTypeEnum.CONSOLE) return;

        throw new BadRequestException(`ConsoleSubscriber should have prop "type" with "console" value`);
    },

    resolveSubscriber(dto) {
        return ConsoleSubscriber.get(dto);
    },
};
