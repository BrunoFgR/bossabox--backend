import Tags from '@modules/tools/infra/typeorm/entities/Tag';

export default interface ITagsRepository {
    create(data: string[]): Promise<void>;
    editTags(tags: Tags[]): string[];
    findByTags(tags: string[]): Promise<Tags[]>;
}
