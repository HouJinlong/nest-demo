import { registerDecorator, ValidationOptions, ValidationArguments, equals} from 'class-validator';
import { get } from 'lodash';
export function IsEqualsThan(property: string[] | string, validationOptions?: ValidationOptions) {
    return (object: unknown, propertyName: string) => {
        registerDecorator({
            name: 'IsEqualsThan',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments): boolean{
                    // 拿到要比较的属性名或者路径 参考`lodash#get`方法
                    const [comparativePropertyName] = args.constraints;
                    // 拿到要比较的属性值
                    const comparativeValue = get(args.object, comparativePropertyName);
                    // 返回false 验证失败
                    return equals(value,comparativeValue);
                },
            },
        });
    };
}