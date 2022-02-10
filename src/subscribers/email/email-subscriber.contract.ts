import { validateWithClassValidator } from '../../general/validate-with-class-validator.util';
import { TSubscriberContract } from '../all-subscribers-map';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { EmailSubscriberDto } from './emai-subscriber.dto';
import { EmailSubscriber } from './email.subscriber';

export const EMAIL_SUBSCRIBER_CONTRACT: TSubscriberContract<SubscriberTypeEnum.EMAIL> = {
    type: SubscriberTypeEnum.EMAIL,

    dtoValidator(data: EmailSubscriberDto) {
        validateWithClassValidator(data, EmailSubscriberDto);
    },
    async resolveSubscriber(dto: EmailSubscriberDto) {
        return EmailSubscriber.get(dto);
    },
};
