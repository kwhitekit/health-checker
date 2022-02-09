import {
    BadRequestException, CanActivate, ExecutionContext, Injectable,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ALL_SUBSCRIBERS_MAP } from './all-subscribers-map';
import { SubscriberTypeEnum } from './subscriber-type.enum';

const subscribersTypes = Object.values(SubscriberTypeEnum);

@Injectable()
export class SubscriberTypeGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const { body } = context.switchToHttp().getRequest<FastifyRequest>();

        if (!body) throw new BadRequestException(`Expected: JSON body in request\nActual: "${body}"`);

        if (
            !(body as { type?: string }).type
      || !subscribersTypes.includes((body as { type: SubscriberTypeEnum }).type)
        ) throw new BadRequestException(`Expected: prop "type" with value from [${subscribersTypes.join()}]\nActual: "${(body as any).type}"`);

        return ALL_SUBSCRIBERS_MAP[(body as { type: SubscriberTypeEnum }).type].dtoValidator(body);
    }
}
