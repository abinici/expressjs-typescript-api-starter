import { Expose, Transform, Type } from 'class-transformer';

export class Hero {
    @Expose()
    @Type(() => Number)
    id: number;

    @Expose()
    name: string;

    @Expose()
    aliases: string[];

    @Expose()
    occupation: string;

    @Expose()
    gender: string;

    @Expose()
    @Type((type) => Object.bind(null, type.object['height']))
    height: {
        [index: string]: number;
    };

    @Expose()
    hair: string;

    @Expose()
    eyes: string;

    @Expose()
    powers: string[];

    someIgnoredProperty: string;
}
