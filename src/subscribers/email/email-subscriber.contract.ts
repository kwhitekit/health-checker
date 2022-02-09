import { TSubscriberContract } from '../all-subscribers-map';
import { HealthReportResDto } from '../../general/health-report.res.dto';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { EmailSubscriberDto } from './emai-subscriber.dto';
import { EmailSubscriber } from './email.subscriber';

let counter = 0;

function emailOnMessage(message: HealthReportResDto) {
    console.log('=== EMAIL ===');
    console.log(message);
    console.log('-'.repeat(Math.floor(Math.random() * 100)), ++counter);
}

export const EMAIL_SUBSCRIBER_CONTRACT: TSubscriberContract<SubscriberTypeEnum.EMAIL> = {
    type: SubscriberTypeEnum.EMAIL,
    dtoValidator(data) {
        if (data.type !== SubscriberTypeEnum.EMAIL) return false;

        return true;
    },
    async resolveSubscriber(dto: EmailSubscriberDto) {
        return EmailSubscriber.get(dto.type, emailOnMessage);
    },
};
