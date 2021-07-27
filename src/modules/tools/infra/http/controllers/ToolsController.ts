import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateToolService from '@modules/tools/services/CreateToolService';
import ListToolsService from '@modules/tools/services/ListToolsService';
import DeleteToolService from '@modules/tools/services/DeleteToolService';

export default class ToolsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const tag: string = request.query.tag as string;

    const listToolsService = container.resolve(ListToolsService);

    const tools = await listToolsService.execute({
      user_id,
      tag,
    });

    return response.json(tools);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, link, description, tags } = request.body;

    const createToolService = container.resolve(CreateToolService);

    await createToolService.execute({
      title,
      description,
      link,
      tags,
      user_id: request.user.id,
    });

    return response.status(201).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteToolService = container.resolve(DeleteToolService);

    await deleteToolService.execute({
      tool_id: id,
    });

    return response.status(204).send();
  }
}
