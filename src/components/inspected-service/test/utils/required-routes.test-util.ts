import { TAllRoutersInController } from '../../../../test/utils/get-all-routes-from-controller.test-util';

export const requiredRoutes: TAllRoutersInController = [
    {
        method: 'get' as const,
        path: '/services' as const,
    },
    {
        method: 'get' as const,
        path: '/services/:serviceId/status' as const,
    },
    {
        method: 'post' as const,
        path: '/services' as const,
    },
    {
        method: 'put' as const,
        path: '/services/:serviceId' as const,
    },
    {
        method: 'delete' as const,
        path: '/services/:serviceId' as const,
    },
];
