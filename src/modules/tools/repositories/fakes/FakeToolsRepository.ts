import { v4 } from 'uuid';

import Tools from '@modules/tools/infra/typeorm/entities/Tool';
import ICreateToolsDTO from '@modules/tools/dtos/ICreateToolsDTO';
import IListToolsDTO from '@modules/tools/dtos/IListToolsDTO';
import IToolsRepository from '../IToolsRepository';

export default class FakeToolsRepository implements IToolsRepository {
    private tools: Tools[] = [];

    public async create({
        description,
        link,
        tags,
        title,
        user_id,
    }: ICreateToolsDTO): Promise<Tools> {
        const tool = new Tools();

        Object.assign(tool, {
            id: v4(),
            description,
            link,
            tags,
            title,
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        });

        this.tools.push(tool);

        return tool;
    }

    public async findById(id: string): Promise<Tools | undefined> {
        const tool = this.tools.find(t => t.id === id);

        return tool;
    }

    public async findByLink(link: string): Promise<Tools | undefined> {
        const tool = this.tools.find(t => t.link === link);

        return tool;
    }

    public async findByUser({ user_id }: IListToolsDTO): Promise<Tools[]> {
        const tools = this.tools.filter(t => t.user_id === user_id);

        return tools;
    }

    public async deleteTool({ id }: Tools): Promise<void> {
        const toolIndex = this.tools.findIndex(t => t.id === id);

        this.tools.splice(toolIndex, 1);
    }
}
