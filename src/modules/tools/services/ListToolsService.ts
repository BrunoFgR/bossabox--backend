import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IToolsRepository from '../repositories/IToolsRepository';
import ITagsRepository from '../repositories/ITagsRepository';

interface IRequest {
    user_id: string;
    tag?: string;
}

interface IResponse {
    tags: string[];
    id: string;
    user_id: string;
    user: User;
    title: string;
    link: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

@injectable()
class CreateToolService {
    constructor(
        @inject('ToolsRepository')
        private toolsRepository: IToolsRepository,

        @inject('TagsRepository')
        private tagsRepository: ITagsRepository,
    ) {}

    public async execute({ user_id, tag }: IRequest): Promise<IResponse[]> {
        const tools = await this.toolsRepository.findByUser({ user_id, tag });

        const editableTools = tools.map(t => ({
            ...t,
            tags: this.tagsRepository.editTags(t.tags),
        }));

        return editableTools;
    }
}

export default CreateToolService;
