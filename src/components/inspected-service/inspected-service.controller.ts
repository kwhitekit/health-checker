import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put,
} from '@nestjs/common';
import { HealthReportResDto } from '../../general/health-report.res.dto';
import { CreateInspectedServiceDto } from './dto/create.inspect-service.dto';
import { InspectedServiceService } from './inspected-service.service';

@Controller('services')
export class InspectedServiceController {
    constructor(private inspectedServiceService: InspectedServiceService) { }

  @Get('/:serviceId/status')
    getService(@Param('serviceId', ParseUUIDPipe) serviceId: string): Promise<HealthReportResDto> {
        return this.inspectedServiceService.askHealth(serviceId);
    }

  @Get()
  getAllServices(): Promise<unknown[]> {
      return Promise.resolve([]);
  }

  @Post()
  addService(@Body() data: CreateInspectedServiceDto): Promise<unknown> {
      return this.inspectedServiceService.createService(data);
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
