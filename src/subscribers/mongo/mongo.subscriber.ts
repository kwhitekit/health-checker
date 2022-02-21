import { MongoClient } from 'mongodb';
import { BaseSubscriber } from '../../components/subscription/subscriber-declaration/base-subscriber';
import { IOnMessage } from '../../components/subscription/subscriber-declaration/onmessage.interface';
import { HealthReportResDto } from '../../general/health-report.res.dto';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { MongoSubscriberDto } from './mongo-subscriber.dto';

export class MongoSubscriber extends BaseSubscriber<SubscriberTypeEnum.MONGO> implements IOnMessage {
    private mongoUrl!: string;

    private constructor(mongoUrl: string) {
        super(SubscriberTypeEnum.MONGO);

        this.mongoUrl = mongoUrl;
    }

    public static get(dto: MongoSubscriberDto) {
        return Promise.resolve(new MongoSubscriber(dto.mongoUrl));
    }

    onMessage(message: HealthReportResDto) {
        new MongoClient(this.mongoUrl)
            .connect()
            .then((connection) => {
                connection
                    .db()
                    .collection('health_checks')
                    .insertOne(message)
                    .then(() => {
                        connection.close();
                    });
            });
    }
}
