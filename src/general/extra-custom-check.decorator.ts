import { registerDecorator } from 'class-validator';

export default function ExtraCustomCheck(check: (value: any) => Promise<boolean>, message: string = 'Please Check your req payload. Error happend until validation') {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: 'ExtraCustomCheck',
            target: object.constructor,
            propertyName,
            validator: {
                async validate(_value: any) {
                    if (!_value) return true;

                    return check(_value);
                },
            },
            options: {
                message: () => message,
            },
        });
    };
}
