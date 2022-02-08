import { Injectable } from '@nestjs/common';
import { ISubMonitoring } from './monitoring/sub-monitoring.interface';

@Injectable()
export class MonitoringService implements ISubMonitoring {
    public subscribe(serviceId: string): void {
        console.info('subscribe on', serviceId);
    }

    public unsubscribe(serviceId: string): void {
        console.info('unsubscribe on', serviceId);
    }
}
