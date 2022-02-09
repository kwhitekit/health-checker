import { createTransport, Transporter, TransportOptions } from 'nodemailer';
import { BaseSubscriber, TOnmessage } from '../../components/subscription/subscriber-declaration/base-subscriber';
import { HealthReportResDto } from '../../general/health-report.res.dto';
import { SubscriberTypeEnum } from '../subscriber-type.enum';

export class EmailSubscriber extends BaseSubscriber<SubscriberTypeEnum.EMAIL> {
    public static transporter: Transporter;

    protected constructor(
        type: SubscriberTypeEnum.EMAIL,
        onMessage: TOnmessage,
    ) {
        super(type, onMessage);
    }

    public static async get(type: SubscriberTypeEnum.EMAIL, onMessage: TOnmessage): Promise<EmailSubscriber> {
        console.info(process.env.EMAIL_USER);

        EmailSubscriber.transporter = await createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        } as TransportOptions);

        return new EmailSubscriber(type, onMessage);
    }
}

export async function emailSubscriberOnMessage(this: EmailSubscriber, message: HealthReportResDto) {
    // eslint-disable-next-line no-use-before-define
    EmailSubscriber.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'volsknik@gmail.com',
        subject: message.name,
        text: message.status,
        html: `<h1>${message.status}</h1><hr>${message.checkedUrl}`,
    });
}
