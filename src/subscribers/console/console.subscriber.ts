import { BaseSubscriber } from '../../components/subscription/subscriber-declaration/base-subscriber';
import { SubscriberTypeEnum } from '../subscriber-type.enum';

export class ConsoleSubscriber extends BaseSubscriber<SubscriberTypeEnum.CONSOLE> { }
