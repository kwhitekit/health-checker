import { HealthReportResDto } from '../../../general/health-report.res.dto';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';
import { BaseSubscriberDto } from './base-subscriber.dto';

export type TOnmessage = (message: HealthReportResDto) => void;
export class BaseSubscriber<T extends SubscriberTypeEnum> {
    public static async get(dto: BaseSubscriberDto<SubscriberTypeEnum>) {
        return Promise.resolve(new BaseSubscriber(dto.type));
    }

    protected constructor(public type: T) { }
}
