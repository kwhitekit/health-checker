import { BaseSubscriber } from '../../components/subscription/subscriber-declaration/base-subscriber';
import { IOnMessage } from '../../components/subscription/subscriber-declaration/onmessage.interface';
import { HealthReportResDto } from '../../general/health-report.res.dto';
import { TSubscriberDto } from '../all-subscribers-map';
import { SubscriberTypeEnum } from '../subscriber-type.enum';

export class ConsoleSubscriber extends BaseSubscriber<SubscriberTypeEnum.CONSOLE> implements IOnMessage {
    onMessage(message: HealthReportResDto) {
        console.info(message);
    }

    public static async get(dto: TSubscriberDto<SubscriberTypeEnum.CONSOLE>) {
        return Promise.resolve(new ConsoleSubscriber(dto.type));
    }
}
