import { container } from 'tsyringe';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import ToolsRepository from '@modules/tools/infra/typeorm/repositories/ToolsRepository';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';

import TagsRepository from '@modules/tools/infra/typeorm/repositories/TagsRepository';
import ITagsRepository from '@modules/tools/repositories/ITagsRepository';

import '@modules/users/providers';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IToolsRepository>(
    'ToolsRepository',
    ToolsRepository,
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);
