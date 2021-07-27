import { injectable, inject } from 'tsyringe';

import AppErrors from '@shared/errors/AppErrors';

import IToolsRepository from '../repositories/IToolsRepository';
import ITagsRepository from '../repositories/ITagsRepository';

import Tool from '../infra/typeorm/entities/Tool';

interface IRequest {
  title: string;
  link: string;
  user_id: string;
  description: string;
  tags: string[];
}

@injectable()
class CreateToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    description,
    link,
    tags,
    title,
    user_id,
  }: IRequest): Promise<Tool> {
    const findLink = await this.toolsRepository.findByLink(link);

    if (findLink) {
      throw new AppErrors('tool already exists');
    }

    await this.tagsRepository.create(tags);

    const findTags = await this.tagsRepository.findByTags(tags);

    const tool = this.toolsRepository.create({
      description,
      link,
      title,
      user_id,
      tags: findTags,
    });

    return tool;
  }
}

export default CreateToolService;
