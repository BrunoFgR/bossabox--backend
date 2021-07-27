import Tags from '@modules/tools/infra/typeorm/entities/Tag';

export default interface ICreateToolsDTO {
    user_id: string;
    description: string;
    title: string;
    link: string;
    tags: Tags[];
}
