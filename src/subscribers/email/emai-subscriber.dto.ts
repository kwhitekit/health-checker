import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches,
} from 'class-validator';
import { RegisterSubscriberDto } from '../../components/subscription/dto/register-subscriber.dto';
import { SubscriberTypeEnum } from '../subscriber-type.enum';

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

    @ApiProperty({
        type: String,
    })
    @IsEmail()
    user: string;

    @ApiPropertyOptional({
        type: String,
    })
    @IsOptional()
    @IsString()
    @Length(8, 32)
    pass?: string;
}
