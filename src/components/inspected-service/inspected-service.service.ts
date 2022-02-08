import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InspectedServiceDbEntity } from './common/inspected-service.db-entity';
import { CreateInspectedServiceDto } from './dto/create.inspect-service.dto';

@Injectable()
export class InspectedServiceService {
    constructor(
      @InjectRepository(InspectedServiceDbEntity)
      private inspectedServiceRepository: Repository<InspectedServiceDbEntity>,
    ) {}

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
