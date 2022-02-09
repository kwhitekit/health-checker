import { validateSync } from 'class-validator';
import { TSubscriberContract } from '../all-subscribers-map';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { EmailSubscriberDto } from './emai-subscriber.dto';
import { EmailSubscriber } from './email.subscriber';

export const EMAIL_SUBSCRIBER_CONTRACT: TSubscriberContract<SubscriberTypeEnum.EMAIL> = {
    type: SubscriberTypeEnum.EMAIL,

    dtoValidator(data: EmailSubscriberDto) {
        // eslint-disable-next-line no-new
        const dto = new EmailSubscriberDto();
        // eslint-disable-next-line no-return-assign
        Object.keys(data).forEach((key) => dto[key] = data[key]);

        return validateSync(dto);
    },
    async resolveSubscriber(dto: EmailSubscriberDto) {
        return EmailSubscriber.get(dto);
    },
};
