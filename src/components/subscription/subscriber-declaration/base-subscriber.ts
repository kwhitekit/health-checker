import { HealthReportResDto } from '../../../general/health-report.res.dto';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';

export type TOnmessage = (message: HealthReportResDto) => void;
export class BaseSubscriber<T extends SubscriberTypeEnum> {
    public static async get<U extends SubscriberTypeEnum>(type: U, onMessage: TOnmessage) {
        return Promise.resolve(new BaseSubscriber(type, onMessage));
    }

    protected constructor(public type: T, public onMessage: TOnmessage) { }
}
