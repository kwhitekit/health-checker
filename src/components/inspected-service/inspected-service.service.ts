import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { HealthReportResDto } from '../../general/health-report.res.dto';
import { HealthStatusEnum } from '../../general/health-status.enum';
import { InspectedServiceDbEntity } from './common/inspected-service.db-entity';
import { CreateInspectedServiceDto } from './dto/create.inspect-service.dto';

@Injectable()
export class InspectedServiceService {
    constructor(
    @InjectRepository(InspectedServiceDbEntity)
    private inspectedServiceRepository: Repository<InspectedServiceDbEntity>,
    ) { }

    public async askHealth(id: string): Promise<HealthReportResDto> {
        const service = await this.inspectedServiceRepository.findOne(id);
        const { status } = await axios({
            url: service.checkUrl,
            method: service.method,
        });

        return {
            status: status >= 500
                ? HealthStatusEnum.UNAVAILABLE
                : HealthStatusEnum.AVAILABLE,
            checkedUrl: service.checkUrl,
            name: service.name,
        };
    }

    public async createService(service: CreateInspectedServiceDto): Promise<InspectedServiceDbEntity> {
        const { raw: [result] } = await this.inspectedServiceRepository.createQueryBuilder()
            .insert()
            .into<InspectedServiceDbEntity>(InspectedServiceDbEntity)
            .values(service)
            .returning('*')
            .execute();

        return result as InspectedServiceDbEntity;
    }
}
