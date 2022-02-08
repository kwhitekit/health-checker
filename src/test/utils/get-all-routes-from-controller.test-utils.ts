import { INestApplication } from '@nestjs/common';

export type TAllRoutersInController = {
  path: string,
  method: string,
}[];

export function getAllRoutesFromController(app: INestApplication, startEndpoint: string) {
    const _startEndpoint = startEndpoint.startsWith('/')
        ? startEndpoint
        : `/${startEndpoint}`;

    return app
        .getHttpServer()
        ._events
        .request
        ._router
        .stack
        .reduce((acc, layer) => {
            if (layer.route && (layer?.route?.path as string).startsWith(_startEndpoint)) {
                const { path } = layer.route;
                const [{ method }] = layer.route.stack;

                acc.push({ path, method });
            }

            return acc;
        }, [] as TAllRoutersInController);
}
