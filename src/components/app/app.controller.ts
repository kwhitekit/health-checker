import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('ping-pong')
@Controller('/ping')
export class AppController {
    constructor(private readonly appService: AppService) {}

  @Get()
    ping(): string {
        return this.appService.ping();
    }
}
