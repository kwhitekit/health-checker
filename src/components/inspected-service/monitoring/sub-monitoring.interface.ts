export interface ISubMonitoring {
    subscribe: (serviceId: string) => void,
    unsubscribe: (serviceId: string) => void,
}
