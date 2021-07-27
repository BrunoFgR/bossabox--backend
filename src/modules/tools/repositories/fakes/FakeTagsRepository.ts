import { v4 } from 'uuid';

import Tag from '@modules/tools/infra/typeorm/entities/Tag';
import ITagsRepository from '../ITagsRepository';

export default class FakeToolsRepository implements ITagsRepository {
    private tags: Tag[] = [];

    public async create(data: string[]): Promise<void> {
        data.map((d): void => {
            const tag = new Tag();

            const findTag = this.tags.find(t => t.name === d);

            if (findTag) {
                return;
            }

            Object.assign(tag, {
                id: v4(),
                name: d,
                created_at: new Date(),
                updated_at: new Date(),
            });

            this.tags.push(tag);
        });
    }

    public async findByTags(tags: string[]): Promise<Tag[]> {
        const findTags = tags
            .map(t => {
                const tagExists = this.tags.find(tag => tag.name === t);

                if (!tagExists) {
                    return undefined;
                }

                return tagExists as Tag;
            })
            .filter((item): item is Tag => !!item);

        return findTags;
    }

    public editTags(tags: Tag[]): string[] {
        const tagsName = tags.map(t => t.name);

        return tagsName;
    }
}
