import { TSubscriberContract } from '../all-subscribers-map';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { EmailSubscriberDto } from './emai-subscriber.dto';
import { EmailSubscriber, emailSubscriberOnMessage } from './email.subscriber';

export const EMAIL_SUBSCRIBER_CONTRACT: TSubscriberContract<SubscriberTypeEnum.EMAIL> = {
    type: SubscriberTypeEnum.EMAIL,
    dtoValidator(data) {
        if (data.type !== SubscriberTypeEnum.EMAIL) return false;

        return true;
    },
    async resolveSubscriber(dto: EmailSubscriberDto) {
        return EmailSubscriber.get(dto.type, emailSubscriberOnMessage);
    },
};
