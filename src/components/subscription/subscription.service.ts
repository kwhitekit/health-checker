import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonitoringService } from '../inspected-service/monitoring/monitoring.service';
import { ISubMonitoring } from '../inspected-service/monitoring/sub-monitoring.interface';
import { SubscriptionDbEntity } from './common/subscription.db-entity';
import { SubscriberTypeEnum } from '../../subscribers/subscriber-type.enum';
import { BaseSubscriberDto } from './subscriber-declaration/base-subscriber.dto';
import { BaseSubscriberWithServiceIdsDto } from './subscriber-declaration/base-subscriber-with-service-ids.dto';

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

    public async subscribe(serviceIds: [string], subscriberIdOrData: string | BaseSubscriberDto<SubscriberTypeEnum>) {
        let subscription: SubscriptionDbEntity;
        if (typeof subscriberIdOrData !== 'string') {
            subscription = await this.subscriptionRepository.save({
                type: subscriberIdOrData.type,
                constructorPayload: JSON.stringify(subscriberIdOrData),
                services: serviceIds,
            });
        } else {
            subscription = await this.subscriptionRepository.save({
                id: subscriberIdOrData,
                services: serviceIds,
            });
        }

        this.subMonitor.subscribe(
            serviceIds,
            subscription.id,
          JSON.parse(subscription.constructorPayload) as BaseSubscriberDto<SubscriberTypeEnum>,
        );
    }

    public async subscribe2(data: BaseSubscriberWithServiceIdsDto<SubscriberTypeEnum>) {
        const { serviceIds, ...constructorPayload } = data;

        return this.subscribe(serviceIds, constructorPayload);
    }

    public async unsubscribe(subscriberId: string, serviceIds?: [string]) {
        if (serviceIds) {
            this.subMonitor.unsubscribe(serviceIds, subscriberId);

            return;
        }

        this.subMonitor.unsubscribeAll(subscriberId);
    }
}
