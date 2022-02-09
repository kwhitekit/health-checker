export interface IPubMonitoring {
  startMonitoring: (serviceId: string) => void;
  stopMonitoring: (serviceId: string) => void;
}
