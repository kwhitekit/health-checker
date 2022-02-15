import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray, IsEmail, IsNotEmpty, IsString, Matches,
} from 'class-validator';
import { RegisterSubscriberDto } from '../../components/subscription/dto/register-subscriber.dto';
import { SubscriberTypeEnum } from '../subscriber-type.enum';

// eslint-disable-next-line no-use-before-define

export class EmailSubscriberDto extends RegisterSubscriberDto {
    @ApiProperty({
        type: SubscriberTypeEnum.EMAIL,
    })
    @Matches(new RegExp(SubscriberTypeEnum.EMAIL))
    type: SubscriberTypeEnum.EMAIL;

    @ApiProperty({
        type: String,
    })
    @IsString()
    from: string;

    @ApiProperty({
        type: [String],
    })
    @IsArray()
    @IsNotEmpty()
    @IsEmail({}, { each: true })
    to: [string];
}
