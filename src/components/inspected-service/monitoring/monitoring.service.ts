import { Injectable } from '@nestjs/common';
import { InspectedServiceService } from '../inspected-service.service';
import { IPubMonitoring } from './pub-monitoring.interface';
import { ISubMonitoring } from './sub-monitoring.interface';

@Injectable()
export class MonitoringService implements ISubMonitoring, IPubMonitoring {
    constructor(private inspectedServiceService: InspectedServiceService) {}

    private monitorServicesMap = new Map<string, ReturnType<typeof setInterval>>();

    private subscribersMap = new Map<string, Set<string>>();

    public subscribe(serviceId: string, subscriberId: string): void {
        const subscription = this.subscribersMap.get(serviceId);

        if (!subscription) {
            this.subscribersMap.set(serviceId, new Set([subscriberId]));

            return;
        }

        subscription.add(subscriberId);
    }

    public unsubscribeAll(subscriberId: string) {
        this.subscribersMap.delete(subscriberId);
    }

    public unsubscribe(serviceId: string, subscriberId): void {
        this.subscribersMap.get(serviceId)?.delete(subscriberId);
    }

    public stopMonitoring(serviceId: string) {
        const monitoring = this.monitorServicesMap.get(serviceId);

        if (!monitoring) return;

        clearInterval(monitoring);
        this.monitorServicesMap.delete(serviceId);
    }

    public async startMonitoring(serviceId: string) {
        if (this.monitorServicesMap.has(serviceId)) return;

        const firstMonitor = await this.inspectedServiceService.askHealth(serviceId);

        // TODO add more serious and standard checking
        if (!firstMonitor.status) return;

        const monitoring = setInterval(async () => {
            await this.inspectedServiceService.askHealth(serviceId);
        }, 3000);

        this.monitorServicesMap.set(serviceId, monitoring);
    }
}
