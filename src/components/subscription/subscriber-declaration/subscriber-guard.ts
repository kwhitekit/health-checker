/* eslint-disable max-classes-per-file */
import {
    BadRequestException, CanActivate, ExecutionContext, Injectable,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { FastifyRequest } from 'fastify';
import { ALL_SUBSCRIBERS_MAP } from '../../../subscribers/all-subscribers-map';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';

const subscribersTypes = Object.values(SubscriberTypeEnum);

// TODO REMOVE ONE OF THE CLASS
// TODO REMAKE ON GUARD WITH PARAMS ETC.
@Injectable()
export class SubscriberTypeGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const { body } = context.switchToHttp().getRequest<FastifyRequest>();

        if (!body) throw new BadRequestException(`Expected: JSON body in request\nActual: "${body}"`);

        if (
            !(body as { type?: string }).type
      || !subscribersTypes.includes((body as { type: SubscriberTypeEnum }).type)
        ) throw new BadRequestException(`Expected: prop "type" with value from [${subscribersTypes.join()}]\nActual: "${(body as any).type}"`);

        const validationResult = ALL_SUBSCRIBERS_MAP[(body as { type: SubscriberTypeEnum }).type].dtoValidator(body);

        if (typeof validationResult === 'boolean') {
            if (validationResult) return true;

            throw new BadRequestException('Please check your subscriber`s dto');
        }

        if (validationResult.length) throw new BadRequestException(JSON.stringify(validationResult, null, 4));

        return true;
    }
}

@Injectable()
export class SubscriberTypeServiceIdsGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const { body } = context.switchToHttp().getRequest<FastifyRequest>();

        if (!body) throw new BadRequestException(`Expected: JSON body in request\nActual: "${body}"`);

        if (
            !(body as { type?: string }).type
      || !subscribersTypes.includes((body as { type: SubscriberTypeEnum }).type)
        ) throw new BadRequestException(`Expected: prop "type" with value from [${subscribersTypes.join()}]\nActual: "${(body as any).type}"`);

        const ids = (body as { serviceIds?: string[] }).serviceIds;

        if (!ids) throw new BadRequestException('"serviceIds" prop is required');
        if (!Array.isArray(ids)) throw new BadRequestException('"serviceIds" prop should be an array');
        if (!ids.length) throw new BadRequestException('"servicesIds" should not be emplty');

        if (ids.some((id) => !isUUID(id, 'all'))) throw new BadRequestException('every item in "serviceIds" should be a valid string of "uuid" type');

        const validationResult = ALL_SUBSCRIBERS_MAP[(body as { type: SubscriberTypeEnum }).type].dtoValidator(body);

        if (typeof validationResult === 'boolean') {
            if (validationResult) return true;

            throw new BadRequestException('Please check your subscriber`s dto');
        }

        if (validationResult.length) {
            throw new BadRequestException(JSON.stringify(
                validationResult.map(({ property, constraints }) => ({
                    property, constraints,
                })),
                null,
                4,
            ));
        }

        return true;
    }
}
