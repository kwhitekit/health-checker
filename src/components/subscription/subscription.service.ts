import { Injectable } from '@nestjs/common';
import { MonitoringService } from '../inspected-service/monitoring/monitoring.service';
import { ISubMonitoring } from '../inspected-service/monitoring/sub-monitoring.interface';

@Injectable()
export class SubscriptionService {
    private subMonitor: ISubMonitoring;

    constructor(monitoringService: MonitoringService) {
        this.subMonitor = monitoringService;
    }

    public async subscribe(serviceId: string, subscriberId?: string) {
        if (subscriberId) {
            this.subMonitor.subscribe(serviceId, subscriberId);
        }
    }

    public async unsubscribe(subscriberId: string, serviceId?: string) {
        if (serviceId) {
            this.subMonitor.unsubscribe(serviceId, subscriberId);

            return;
        }

        this.subMonitor.unsubscribeAll(subscriberId);
    }
}
