import { HealthReportResDto } from '../../general/health-report.res.dto';
import { SubscriberTypeEnum } from './subscriber-type.enum';

export abstract class BaseSubscriber<T extends SubscriberTypeEnum> {
  public abstract type: T;

  public abstract onMessage: (message: HealthReportResDto) => void;
}
