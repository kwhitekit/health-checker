import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getAllRoutesFromController, TAllRoutersInController } from '../../../test/utils/get-all-routes-from-controller.test-util';
import { InspectedServiceController } from '../inspected-service.controller';
import { requiredRoutes } from './utils/required-routes.test-util';

const inspectedServiceControllerName = InspectedServiceController.prototype.constructor.name;

describe(inspectedServiceControllerName, () => {
    let app: INestApplication;

    beforeAll(async () => {
        const testModule = await Test.createTestingModule({
            controllers: [InspectedServiceController],
        }).compile();

        app = await testModule.createNestApplication().init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('Check all required routes', () => {
        let actualRoutes: TAllRoutersInController;

        beforeAll(() => {
            actualRoutes = getAllRoutesFromController(app, 'services');
        });

        it.each(requiredRoutes)('Route "$method $path" should be defined', async ({ path, method }) => {
            expect(actualRoutes.find((actual) => actual.method === method && actual.path === path)).toBeDefined();
        });
    });
});
