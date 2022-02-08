import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectedServiceDbEntity } from '../inspected-service/common/inspected-service.db-entity';
import { InspectedServiceModule } from '../inspected-service/inspected-service.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.PG_HOST ?? 'localhost',
            port: +process.env.PG_PORT ?? 5432,
            username: process.env.PG_USER ?? 'postgres',
            password: process.env.PG_PASS ?? 'postgres',
            database: process.env.PG_DATABASE ?? 'health-checker',
            synchronize: true,
            entities: [
                InspectedServiceDbEntity,
            ],
        }),
        InspectedServiceModule,
        SubscriptionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
