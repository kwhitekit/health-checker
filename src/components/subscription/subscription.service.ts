import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonitoringService } from '../inspected-service/monitoring/monitoring.service';
import { ISubMonitoring } from '../inspected-service/monitoring/sub-monitoring.interface';
import { SubscriptionDbEntity } from './common/subscription.db-entity';
import { TSubscriberDto } from './subscriber-declaration/all-subscribers-map';
import { SubscriberTypeEnum } from './subscriber-declaration/subscriber-type.enum';

@Injectable()
export class SubscriptionService {
    private subMonitor: ISubMonitoring;

    constructor(
        monitoringService: MonitoringService,
        @InjectRepository(SubscriptionDbEntity)
        private subscriptionRepository: Repository<SubscriptionDbEntity>,
    ) {
        this.subMonitor = monitoringService;
    }

    public async subscribe(serviceIds: [string], subscriberIdOrData: string | TSubscriberDto<SubscriberTypeEnum>) {
        let subscriberId: string;

        if (typeof subscriberIdOrData !== 'string') {
            const subscription = await this.subscriptionRepository.save({
                type: subscriberIdOrData.type,
                services: serviceIds,
            });
            subscriberId = subscription.id;
        } else {
            subscriberId = subscriberIdOrData;
            await this.subscriptionRepository.update({ id: subscriberIdOrData }, {
                services: serviceIds,
            });
        }

        this.subMonitor.subscribe(serviceIds, subscriberId);
    }

    public async unsubscribe(subscriberId: string, serviceIds?: [string]) {
        if (serviceIds) {
            this.subMonitor.unsubscribe(serviceIds, subscriberId);

            return;
        }

        this.subMonitor.unsubscribeAll(subscriberId);
    }
}
