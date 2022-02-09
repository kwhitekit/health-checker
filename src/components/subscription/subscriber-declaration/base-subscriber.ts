import { HealthReportResDto } from '../../../general/health-report.res.dto';
import { SubscriberTypeEnum } from './subscriber-type.enum';

export type TOnmessage = (message: HealthReportResDto) => void;
export class BaseSubscriber<T extends SubscriberTypeEnum> {
    constructor(public type: T, public onMessage: TOnmessage) { }
}
