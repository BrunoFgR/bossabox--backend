import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateToolsTagHistory1617669736093
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tools_tags_tags',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'tagsId',
                        type: 'uuid',
                    },
                    {
                        name: 'toolsId',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'tools_tags_tags',
            new TableForeignKey({
                name: 'ToolsProvider',
                columnNames: ['toolsId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'tools',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'tools_tags_tags',
            new TableForeignKey({
                name: 'TagsProvider',
                columnNames: ['tagsId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'tags',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tools_tags_tags', 'ToolsProvider');
        await queryRunner.dropForeignKey('tools_tags_tags', 'TagsProvider');
        await queryRunner.dropTable('tools_tags_tags');
    }
}
