import { getRepository, Repository } from 'typeorm';

import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import ICreateToolsDTO from '@modules/tools/dtos/ICreateToolsDTO';
import IListToolsDTO from '@modules/tools/dtos/IListToolsDTO';

import Tool from '@modules/tools/infra/typeorm/entities/Tool';

class ToolsRepository implements IToolsRepository {
  private ormRepository: Repository<Tool>;

  constructor() {
    this.ormRepository = getRepository(Tool);
  }

  public async create({
    title,
    user_id,
    description,
    link,
    tags,
  }: ICreateToolsDTO): Promise<Tool> {
    const tool = this.ormRepository.create({
      description,
      link,
      title,
      user_id,
      tags,
    });

    await this.ormRepository.save(tool);

    return tool;
  }

  public async findByLink(link: string): Promise<Tool | undefined> {
    const tool = await this.ormRepository.findOne({
      where: {
        link,
      },
    });

    return tool;
  }

  public async findByUser({ user_id, tag }: IListToolsDTO): Promise<Tool[]> {
    let tools = await this.ormRepository.find({
      where: {
        user_id,
      },
      relations: ['tags'],
    });

    if (tag) {
      tools = await this.ormRepository
        .createQueryBuilder('tool')
        .leftJoinAndSelect('tool.tags', 'tagSelect')
        .leftJoin('tool.tags', 'tags')
        .where('tags.name LIKE :searchQuery', { searchQuery: tag })
        .getMany();
    }

    return tools;
  }

  public async findById(id: string): Promise<Tool | undefined> {
    const tool = this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['tags'],
    });

    return tool;
  }

  public async deleteTool(tool: Tool): Promise<void> {
    await this.ormRepository.remove(tool);
  }
}

export default ToolsRepository;
