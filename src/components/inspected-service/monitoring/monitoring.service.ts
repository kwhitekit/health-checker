import { Injectable } from '@nestjs/common';
import { InspectedServiceService } from '../inspected-service.service';
import { IPubMonitoring } from './pub-monitoring.interface';
import { ISubMonitoring } from './sub-monitoring.interface';

@Injectable()
export class MonitoringService implements ISubMonitoring, IPubMonitoring {
    constructor(private inspectedServiceService: InspectedServiceService) {}

    private serviceMap = new Map<string, ReturnType<typeof setInterval>>();

    private serviceSubscribersSet = new Map<string, Set<string>>();

    public subscribe(serviceIds: [string], subscriberId: string): void {
        serviceIds.forEach((serviceId) => {
            const subscribersSet = this.serviceSubscribersSet.get(serviceId);

            if (subscribersSet) subscribersSet.add(subscriberId);
            else this.serviceSubscribersSet.set(serviceId, new Set<string>(serviceIds));
        });
    }

    public unsubscribeAll(subscriberId: string) {
        this.serviceSubscribersSet.forEach((subscribersSet) => subscribersSet.delete(subscriberId));
    }

    public unsubscribe(serviceIds: [string], subscriberId): void {
        serviceIds.forEach((serviceId) => {
            this.serviceSubscribersSet.get(serviceId)?.delete(subscriberId);
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
