import 'reflect-metadata';

import AppErrors from '@shared/errors/AppErrors';

import DeleteToolService from './DeleteToolService';
import CreateToolService from './CreateToolService';

import FakeToolsRepository from '../repositories/fakes/FakeToolsRepository';
import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';

let fakeToolsRepository: FakeToolsRepository;
let fakeTagsRepository: FakeTagsRepository;
let createToolService: CreateToolService;
let deleteToolService: DeleteToolService;

describe('DeleteToolService', () => {
    beforeEach(() => {
        fakeToolsRepository = new FakeToolsRepository();
        fakeTagsRepository = new FakeTagsRepository();

        createToolService = new CreateToolService(
            fakeToolsRepository,
            fakeTagsRepository,
        );

        deleteToolService = new DeleteToolService(fakeToolsRepository);
    });

    it('Should be able delete a tool', async () => {
        const tool1 = await createToolService.execute({
            description: 'some description',
            link: 'http://www.somelink.com',
            user_id: '123456789',
            title: 'some title',
            tags: ['first tag', 'second tag', 'third tag'],
        });

        const tool2 = await createToolService.execute({
            description: 'some description2',
            link: 'http://www.somelink2.com',
            user_id: '123456789',
            title: 'some title2',
            tags: ['first tag', 'fifth tag', 'fourth tag'],
        });

        const tool3 = await createToolService.execute({
            description: 'some description3',
            link: 'http://www.somelink3.com',
            user_id: '123456789',
            title: 'some title3',
            tags: ['sixth tag', 'second tag', 'eighth tag'],
        });

        await deleteToolService.execute({ tool_id: tool1.id });

        const tools = await fakeToolsRepository.findByUser({
            user_id: '123456789',
        });

        expect(tools).toEqual([tool2, tool3]);
    });

    it('Should not be able to delete a tool that not exists', async () => {
        await createToolService.execute({
            description: 'some description',
            link: 'http://www.somelink.com',
            user_id: '123456789',
            title: 'some title',
            tags: ['first tag', 'second tag', 'third tag'],
        });

        await expect(
            deleteToolService.execute({ tool_id: 'non-exists' }),
        ).rejects.toBeInstanceOf(AppErrors);
    });
});
