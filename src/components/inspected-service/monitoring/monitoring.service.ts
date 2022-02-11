import { Injectable } from '@nestjs/common';
import { ALL_SUBSCRIBERS_MAP } from '../../../subscribers/all-subscribers-map';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';
import { RegisterSubscriberDto } from '../../subscription/dto/register-subscriber.dto';
import { BaseSubscriber } from '../../subscription/subscriber-declaration/base-subscriber';
import { IOnMessage } from '../../subscription/subscriber-declaration/onmessage.interface';
import { InspectedServiceService } from '../inspected-service.service';
import { IPubMonitoring } from './pub-monitoring.interface';
import { ISubMonitoring } from './sub-monitoring.interface';

@Injectable()
export class MonitoringService implements ISubMonitoring, IPubMonitoring {
    constructor(private inspectedServiceService: InspectedServiceService) { }

    private serviceMap = new Map<string, ReturnType<typeof setInterval>>();

    private serviceSubscribersWithCb = new Map<string, Map<string, Promise<BaseSubscriber<SubscriberTypeEnum>>>>();

    subscribe(
        serviceIds: [string],
        subscriberId: string,
        constructorPayload: RegisterSubscriberDto,
    ): void {
        serviceIds.forEach((serviceId) => {
            const subscribersWithCb = this.serviceSubscribersWithCb.get(serviceId);

            if (subscribersWithCb) {
                subscribersWithCb.set(
                    subscriberId,
                    ALL_SUBSCRIBERS_MAP[constructorPayload.type]
                        .subscriber
                        .get(constructorPayload),
                );
            } else {
                this.serviceSubscribersWithCb.set(
                    serviceId,
                    new Map<string, Promise<BaseSubscriber<SubscriberTypeEnum>>>()
                        .set(
                            subscriberId,
                            ALL_SUBSCRIBERS_MAP[constructorPayload.type]
                                .subscriber
                                .get(constructorPayload),
                        ),
                );
            }
        });

        serviceIds.forEach((id) => this.startMonitoring(id));
    }

    public unsubscribeAll(subscriberId: string) {
        this.serviceSubscribersWithCb.forEach((subscribersSet) => subscribersSet.delete(subscriberId));
    }

    public unsubscribe(serviceIds: [string], subscriberId): void {
        serviceIds.forEach((serviceId) => {
            this.serviceSubscribersWithCb.get(serviceId)?.delete(subscriberId);
        });
    }

    public stopMonitoring(serviceId: string) {
        const monitoring = this.serviceMap.get(serviceId);

        if (!monitoring) return;

        clearInterval(monitoring);
        this.serviceMap.delete(serviceId);
    }

    public async startMonitoring(serviceId: string) {
        if (this.serviceMap.has(serviceId)) return;

        const firstHealth = await this.inspectedServiceService.askHealth(serviceId);

        // TODO add more serious and standard checking
        if (!firstHealth.status) return;

        const subscribersMap = this.serviceSubscribersWithCb.get(serviceId) || new Map<string, Promise<IOnMessage>>();

        subscribersMap.forEach((subscriberPromise) => subscriberPromise
            .then((subscriber) => subscriber.onMessage(firstHealth)));

        const monitoring = setInterval(async () => {
            const health = await this.inspectedServiceService.askHealth(serviceId);
            const actualSubscribers = this.serviceSubscribersWithCb.get(serviceId) || new Map<string, Promise<IOnMessage>>();

            actualSubscribers
                .forEach((subscriberPromise) => subscriberPromise
                    .then((subscriber) => subscriber.onMessage(health)));
        }, 3000);

        this.serviceMap.set(serviceId, monitoring);
    }
}
