import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty, IsString, Matches,
} from 'class-validator';
import { MongoClient } from 'mongodb';
import { RegisterSubscriberDto } from '../../components/subscription/dto/register-subscriber.dto';
import ExtraCustomCheck from '../../general/extra-custom-check.decorator';
import { SubscriberTypeEnum } from '../subscriber-type.enum';

async function checkUrlWorking(value: unknown) {
    try {
        const connection = await new MongoClient(String(value)).connect();

        await connection.close();

        return true;
    } catch (error) {
        console.error(error);

        return false;
    }
}

export class MongoSubscriberDto extends RegisterSubscriberDto {
    @ApiProperty({
        type: SubscriberTypeEnum.MONGO,
    })
    @Matches(new RegExp(SubscriberTypeEnum.MONGO))
    type: SubscriberTypeEnum.MONGO;

    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    @ExtraCustomCheck(checkUrlWorking)
    mongoUrl: string;
}
