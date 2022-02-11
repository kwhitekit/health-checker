import { BadRequestException } from '@nestjs/common';
import { validateSync } from 'class-validator';

export function validateWithClassValidator(actual: any, DtoClass: { new(...args: any[]): any }): void | never {
    // "dtoClass" should be a class, with properties, decorated with 'class-validator'
    const withConstraintsObject = new DtoClass();

    // eslint-disable-next-line no-return-assign
    Object.keys(actual).forEach((key) => withConstraintsObject[key] = actual[key]);

    const validationResult = validateSync(withConstraintsObject);

    if (validationResult.length) throw new BadRequestException(validationResult.map(({ target, constraints }) => ({ target, constraints })));
}
