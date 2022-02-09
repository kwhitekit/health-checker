import { TSubscriberDto } from '../all-subscribers-map';
import { SubscriberTypeEnum } from '../subscriber-type.enum';

export class EmailSubscriberDto implements TSubscriberDto<SubscriberTypeEnum.EMAIL> {
    type: SubscriberTypeEnum.EMAIL;
}
