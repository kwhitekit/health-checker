import { Injectable } from '@nestjs/common';
import { ALL_SUBSCRIBERS_MAP, TSubscriberDto } from '../../subscription/subscriber-declaration/all-subscribers-map';
import { TOnmessage } from '../../subscription/subscriber-declaration/base-subscriber';
import { SubscriberTypeEnum } from '../../subscription/subscriber-declaration/subscriber-type.enum';
import { InspectedServiceService } from '../inspected-service.service';
import { IPubMonitoring } from './pub-monitoring.interface';
import { ISubMonitoring } from './sub-monitoring.interface';

@Injectable()
export class MonitoringService implements ISubMonitoring, IPubMonitoring {
    constructor(private inspectedServiceService: InspectedServiceService) { }

    subscribe(
        serviceIds: [string],
        subscriberId: string,
        constructorPayload: TSubscriberDto<SubscriberTypeEnum>,
    ): void {
        serviceIds.forEach((serviceId) => {
            const subscribersWithCb = this.serviceSubscribersWithCb.get(serviceId);

            if (subscribersWithCb) {
                subscribersWithCb.set(
                    subscriberId,
                    ALL_SUBSCRIBERS_MAP[constructorPayload.type]
                        .subscriberConstructor(constructorPayload)
                        .onMessage,
                );
            } else {
                this.serviceSubscribersWithCb.set(
                    serviceId,
                    new Map<string, TOnmessage>()
                        .set(
                            subscriberId,
                            ALL_SUBSCRIBERS_MAP[constructorPayload.type]
                                .subscriberConstructor(constructorPayload)
                                .onMessage,
                        ),
                );
            }
        });
    }

    private serviceMap = new Map<string, ReturnType<typeof setInterval>>();

    private serviceSubscribersWithCb = new Map<string, Map<string, TOnmessage>>();

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

        const firstMonitor = await this.inspectedServiceService.askHealth(serviceId);

        // TODO add more serious and standard checking
        if (!firstMonitor.status) return;

        const monitoring = setInterval(async () => {
            await this.inspectedServiceService.askHealth(serviceId);
        }, 3000);

        this.serviceMap.set(serviceId, monitoring);
    }
}
