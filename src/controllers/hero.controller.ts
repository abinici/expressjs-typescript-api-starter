import { Get, JsonController, Param } from 'routing-controllers';
import { Hero } from '../models/hero.model';
import { HeroRepository } from '../repositories/hero.repository';

@JsonController('/heroes')
export class HeroController {

    constructor(private heroRepository: HeroRepository) {
    }

    @Get('/')
    getAll(): Promise<Hero[]> {
        return this.heroRepository.findAll();
    }

    @Get('/:id')
    getOne( @Param('id') id: number): Promise<Hero> {
        return this.heroRepository.findOne(id);
    }

}
