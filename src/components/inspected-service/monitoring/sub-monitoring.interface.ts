export interface ISubMonitoring {
    subscribe: (serviceId: [string], subscriberId: string) => void,
    unsubscribe: (serviceId: [string], subscriberId: string) => void,
    unsubscribeAll: (subscriberId: string) => void,
}
