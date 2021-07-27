import { getRepository, Repository, In } from 'typeorm';

import ITagsRepository from '@modules/tools/repositories/ITagsRepository';

import Tags from '@modules/tools/infra/typeorm/entities/Tag';

class ToolsRepository implements ITagsRepository {
    private ormRepository: Repository<Tags>;

    constructor() {
        this.ormRepository = getRepository(Tags);
    }

    public async create(data: string[]): Promise<void> {
        const tagExists = await this.ormRepository.find({
            where: { name: In(data) },
        });

        const tagExistName = tagExists.map(tag => tag.name);

        const addTagName = data
            .filter(t => !tagExistName.includes(t))
            .filter((value, index, self) => self.indexOf(value) === index);

        const newTags = this.ormRepository.create(
            addTagName.map(name => ({
                name,
            })),
        );

        await this.ormRepository.save(newTags);
    }

    public editTags(tags: Tags[]): string[] {
        const nameTags = tags.map(t => t.name);

        return nameTags;
    }

    public async findByTags(tags: string[]): Promise<Tags[]> {
        const findTags = await this.ormRepository.find({
            where: { name: In(tags) },
        });

        return findTags;
    }
}

export default ToolsRepository;
