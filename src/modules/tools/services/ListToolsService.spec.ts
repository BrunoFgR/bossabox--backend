import 'reflect-metadata';

// import AppErrors from '@shared/errors/AppErrors';

import ListToolsServices from './ListToolsService';

import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import FakeToolsRepository from '../repositories/fakes/FakeToolsRepository';

let fakeTagsRepository: FakeTagsRepository;
let fakeToolsRepository: FakeToolsRepository;
let createTool: ListToolsServices;

describe('ListToolService', () => {
    beforeEach(() => {
        fakeTagsRepository = new FakeTagsRepository();
        fakeToolsRepository = new FakeToolsRepository();

        createTool = new ListToolsServices(
            fakeToolsRepository,
            fakeTagsRepository,
        );
    });

    it('Should be able to create a new tool', async () => {
        const listTags = ['first tag', 'second tag', 'third tag'];

        await fakeTagsRepository.create(listTags);

        const tags = await fakeTagsRepository.findByTags(listTags);

        const tools = await fakeToolsRepository.create({
            description: 'some description',
            link: 'http://www.somelink.com',
            user_id: '123456789',
            title: 'some title',
            tags,
        });

        const tool = await createTool.execute({ user_id: '123456789' });

        expect(tool).toEqual([{ ...tools, tags: listTags }]);
    });
});
