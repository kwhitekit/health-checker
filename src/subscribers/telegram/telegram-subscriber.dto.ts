import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, registerDecorator } from 'class-validator';
import { Telegram } from 'telegraf';
import { RegisterSubscriberDto } from '../../components/subscription/dto/register-subscriber.dto';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { TelegramSubscriber } from './telegram.subscriber';

export default function CheckMember() {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: 'Exist',
            target: object.constructor,
            propertyName,
            validator: {
                async validate(value: any) {
                    if (!value) return true;
                    if (!TelegramSubscriber.telegram) {
                        TelegramSubscriber.telegram = new Telegram(process.env.TELEGRAM_API_KEY);
                    }

                    const updates = await TelegramSubscriber.telegram.getUpdates(1000000, 1000, 0, ['chat_member']) as {
                        message: {
                            from: {
                                username: string,
                                id: number,
                            }
                        }
                    }[];
                    const members = updates.map(({ message }) => ({
                        username: message.from.username,
                        id: message.from.id,
                    }));

                    const member = members.find((m) => m.username === value);

                    if (member) TelegramSubscriber.members.push(member);

                    return !!member;
                },
            },
            options: {
                message: () => `Before all - open Telegram and send any message to ${process.env.TELEGRAM_BOT_NIKNAME}`,
            },
        });
    };
}

export class TelegramSubscriberDto extends RegisterSubscriberDto {
    @ApiProperty({
        type: SubscriberTypeEnum.TELEGRAM,
    })
    @Matches(new RegExp(SubscriberTypeEnum.TELEGRAM))
    type: SubscriberTypeEnum.TELEGRAM;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty()
    @CheckMember()
    username: string;
}
