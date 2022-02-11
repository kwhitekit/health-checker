import { Telegram } from 'telegraf';
import { BaseSubscriber } from '../../components/subscription/subscriber-declaration/base-subscriber';
import { IOnMessage } from '../../components/subscription/subscriber-declaration/onmessage.interface';
import { HealthReportResDto } from '../../general/health-report.res.dto';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { TelegramSubscriberDto } from './telegram-subscriber.dto';

export class TelegramSubscriber extends BaseSubscriber<SubscriberTypeEnum.TELEGRAM> implements IOnMessage {
    public static members = [] as { username: string, id: number }[];

    private member: { username: string, id: number };

    onMessage(message: HealthReportResDto) {
        const title = `${message.name}: ${message.status}`;
        const text = `${message.checkedUrl}`;
        const description = ((message.unavailableFrom || '') && `Unavailable from: ${message.unavailableFrom}`) + ((message.unavailableTo || '') && `Unavailable to: ${message.unavailableTo}`);

        TelegramSubscriber.telegram.sendMessage(this.member.id, `
        ${title}
        ${text}
        ${description}
        `);
    }

    public static telegram: Telegram | null;

    public static async get(dto: TelegramSubscriberDto): Promise<TelegramSubscriber> {
        const currentMember = TelegramSubscriber.members.find((m) => m.username === dto.username);

        return new TelegramSubscriber(currentMember);
    }

    constructor(member: { username: string, id: number }) {
        super(SubscriberTypeEnum.TELEGRAM);

        this.member = member;
    }
}
