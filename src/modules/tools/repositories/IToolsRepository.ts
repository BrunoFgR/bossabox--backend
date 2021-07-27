import Tools from '@modules/tools/infra/typeorm/entities/Tool';
import ICreateToolsDTO from '../dtos/ICreateToolsDTO';
import IListToolsDTO from '../dtos/IListToolsDTO';

export default interface IToolsRepository {
  create(data: ICreateToolsDTO): Promise<Tools>;
  findByLink(link: string): Promise<Tools | undefined>;
  findByUser(data: IListToolsDTO): Promise<Tools[]>;
  findById(id: string): Promise<Tools | undefined>;
  deleteTool(data: Tools): Promise<void>;
}
