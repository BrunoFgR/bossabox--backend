import { injectable, inject } from 'tsyringe';

import AppErrors from '@shared/errors/AppErrors';

import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  tool_id: string;
}

@injectable()
class CreateToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute({ tool_id }: IRequest): Promise<void> {
    const findLink = await this.toolsRepository.findById(tool_id);

    if (!findLink) {
      throw new AppErrors('Tool does not exists');
    }

    this.toolsRepository.deleteTool(findLink);
  }
}

export default CreateToolService;
