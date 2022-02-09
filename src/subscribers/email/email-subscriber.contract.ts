import { TSubscriberContract } from '../all-subscribers-map';
import { HealthReportResDto } from '../../general/health-report.res.dto';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { EmailSubscriberDto } from './emai-subscriber.dto';
import { EmailSubscriber } from './email.subscriber';

function emailOnMessage(message: HealthReportResDto) {
    console.log('=== EMAIL ===');
    console.log(message);
    console.log('=============');
}

export const EMAIL_SUBSCRIBER_CONTRACT: TSubscriberContract<SubscriberTypeEnum.EMAIL> = {
    type: SubscriberTypeEnum.EMAIL,
    dtoValidator(data) {
        if (data.type !== SubscriberTypeEnum.EMAIL) return false;

        return true;
    },
    subscriberConstructor(dto: EmailSubscriberDto) {
        return new EmailSubscriber(dto.type, emailOnMessage);
    },
};
