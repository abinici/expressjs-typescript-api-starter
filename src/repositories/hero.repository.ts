import { plainToClass } from 'class-transformer';
import * as fs from 'fs';
import { Hero } from '../models/hero.model';

export class HeroRepository {
    private heroes: Hero[] = [];

    findAll() {
        return new Promise<Hero[]>((resolve, reject) => {
            this.loadData().then((data: Hero[]) => {
                resolve(data);
            });
        });
    }

    findOne(id: number) {
        return new Promise<Hero>((resolve, reject) => {
            this.loadData().then((data: Hero[]) => {
                let hero = data.find((el) => el.id === id);
                resolve(hero);
            });
        });
    }

    private loadData() {
        return new Promise((resolve, reject) => {
            if (this.heroes.length === 0) {
                fs.readFile(__dirname + '/data.json', (err, data) => {
                    const parsedData = JSON.parse(data.toString()) as Hero[];

                    let heroes = plainToClass(Hero, parsedData, {
                        strategy: 'excludeAll'
                    });
                    this.heroes.push(...heroes);

                    resolve(this.heroes);
                });
            } else {
                resolve(this.heroes);
            }
        });
    }
}
