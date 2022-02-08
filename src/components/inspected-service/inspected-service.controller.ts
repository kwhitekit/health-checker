import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put,
} from '@nestjs/common';

@Controller('services')
export class InspectedServiceController {
    @Get('/:serviceId/status')
    getService(@Param('serviceId', ParseUUIDPipe) serviceId: string): Promise<unknown> {
        return Promise.resolve(serviceId);
    }

    @Get()
    getAllServices(): Promise<unknown[]> {
        return Promise.resolve([]);
    }

    @Post()
    addService(@Body() data: unknown): Promise<unknown> {
        return Promise.resolve(data);
    }

    @Put(':serviceId')
    updateService(
        @Param('serviceId', ParseUUIDPipe) serviceId: string,
        @Body() data: unknown,
    ): Promise<unknown> {
        return Promise.resolve({ serviceId, data });
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':serviceId')
    deleteService(@Param('serviceId', ParseUUIDPipe) serviceId: string): Promise<void> {
        Promise.resolve(serviceId);

        return Promise.resolve();
    }
}
