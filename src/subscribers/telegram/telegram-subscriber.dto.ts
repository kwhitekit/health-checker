import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { Telegram } from 'telegraf';
import { RegisterSubscriberDto } from '../../components/subscription/dto/register-subscriber.dto';
import ExtraCustomCheck from '../../general/extra-custom-check.decorator';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { TelegramSubscriber } from './telegram.subscriber';

async function check(value: any) {
    if (!TelegramSubscriber.telegram) {
        // TODO find more protected way ot gurantii default API for demonstration, update real telegram api key
        // or as minimum after production remove default value, reset token
        TelegramSubscriber.telegram = new Telegram(process.env.TELEGRAM_API_KEY || '5169422062:AAFO0OH_Zj7ln2L-I0KoSTNTgD75t74Dno0');
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
    @ExtraCustomCheck(check, `Send any message in Telegram to ${process.env.TELEGRAM_BOT_NIKNAME || '@tontiHealthCheckerBot'} before`)
    username: string;
}
