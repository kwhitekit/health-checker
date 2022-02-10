/* eslint-disable max-classes-per-file */
import {
    BadRequestException, CanActivate, ExecutionContext, Injectable,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { validateWithClassValidator } from '../../../general/validate-with-class-validator.util';
import { ALL_SUBSCRIBERS_MAP, BaseSubscriberDto, BaseSubscriberWithServiceIdsDto } from '../../../subscribers/all-subscribers-map';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';

function subscriberGuardCanActivate(context: ExecutionContext, options: {
    withServiceIds: boolean
}): void | never {
    const { body } = context.switchToHttp().getRequest<FastifyRequest>();

    if (!body) throw new BadRequestException(`Expected: JSON body in request\nActual: "${body}"`);

    const { withServiceIds } = options;

    if (withServiceIds) validateWithClassValidator(body, BaseSubscriberWithServiceIdsDto);
    else validateWithClassValidator(body, BaseSubscriberDto);

    ALL_SUBSCRIBERS_MAP[(body as { type: SubscriberTypeEnum }).type].dtoValidator(body);
}

@Injectable()
export class SubscriberGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        subscriberGuardCanActivate(context, { withServiceIds: false });
        return true;
    }
}

@Injectable()
export class SubscriberWithServiceIdsGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        subscriberGuardCanActivate(context, { withServiceIds: true });

        return true;
    }
}
