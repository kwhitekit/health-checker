import { TAllRoutersInController } from '../../../../test/utils/get-all-routes-from-controller.test-util';
import { HttpMethodEnum } from '../../../../general/http-method.enum';

const {
    DELETE, GET, POST, PUT,
} = HttpMethodEnum;

export const requiredRoutes: TAllRoutersInController = [
    {
        method: GET,
        path: '/services' as const,
    },
    {
        method: GET,
        path: '/services/:serviceId/status' as const,
    },
    {
        method: POST,
        path: '/services' as const,
    },
    {
        method: PUT,
        path: '/services/:serviceId' as const,
    },
    {
        method: DELETE,
        path: '/services/:serviceId' as const,
    },
];
