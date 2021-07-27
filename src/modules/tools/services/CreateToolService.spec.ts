import 'reflect-metadata';

import AppErrors from '@shared/errors/AppErrors';

import CreateToolService from './CreateToolService';

import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import FakeToolsRepository from '../repositories/fakes/FakeToolsRepository';

let fakeTagsRepository: FakeTagsRepository;
let fakeToolsRepository: FakeToolsRepository;
let createTool: CreateToolService;

describe('CreateToolService', () => {
    beforeEach(() => {
        fakeTagsRepository = new FakeTagsRepository();
        fakeToolsRepository = new FakeToolsRepository();

        createTool = new CreateToolService(
            fakeToolsRepository,
            fakeTagsRepository,
        );
    });

    it('Should be able to create a new tool', async () => {
        const tool = await createTool.execute({
            description: 'some description',
            link: 'http://www.somelink.com',
            user_id: '123456789',
            title: 'some title',
            tags: ['first tag', 'second tag', 'third tag'],
        });

        expect(tool).toHaveProperty('id');
    });

    it('Should not be able to create a tool that already exists', async () => {
        await createTool.execute({
            description: 'some description',
            link: 'http://www.somelink.com',
            user_id: '123456789',
            title: 'some title',
            tags: ['first tag', 'second tag', 'third tag'],
        });

        await expect(
            createTool.execute({
                description: 'some description',
                link: 'http://www.somelink.com',
                user_id: '1234567890',
                title: 'some title1',
                tags: ['first tag', 'second tag', 'third tag', 'forth tag'],
            }),
        ).rejects.toBeInstanceOf(AppErrors);
    });
});
