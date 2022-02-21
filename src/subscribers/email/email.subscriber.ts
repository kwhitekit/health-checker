import { createTransport, Transporter, TransportOptions } from 'nodemailer';
import { BaseSubscriber } from '../../components/subscription/subscriber-declaration/base-subscriber';
import { IOnMessage } from '../../components/subscription/subscriber-declaration/onmessage.interface';
import { HealthReportResDto } from '../../general/health-report.res.dto';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { EmailSubscriberDto } from './emai-subscriber.dto';

export class EmailSubscriber extends BaseSubscriber<SubscriberTypeEnum.EMAIL> implements IOnMessage {
    public static transporter: Transporter;

    private emailOptions: Omit<EmailSubscriberDto, 'type'>;

    protected constructor(
        data: EmailSubscriberDto,
    ) {
        const { type, ...emailOptions } = data;
        super(type);

        this.emailOptions = emailOptions;
    }

    async onMessage(this: EmailSubscriber, message: HealthReportResDto) {
        const { from, to } = this.emailOptions;

        EmailSubscriber.transporter.sendMail({
            from,
            to: to.join(),
            subject: message.name,
            html: `<h1>${message.status}</h1><hr>${message.checkedUrl}`,
        });
    }

    public static async get(dto: EmailSubscriberDto): Promise<EmailSubscriber> {
        const user = process.env.EMAIL_USER || 'one.of.these.shoes.isnt.right@gmail.com';
        const pass = process.env.EMAIL_PASSWORD || '1oftheseshoesisn`tRight';

        EmailSubscriber.transporter = EmailSubscriber.transporter || await createTransport({
            service: 'gmail',
            auth: {
                user,
                pass,
            },
        } as TransportOptions);

        return new EmailSubscriber(dto);
    }
}
