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
                name: 'tools_tags_history',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'tag_id',
                        type: 'uuid',
                    },
                    {
                        name: 'tool_id',
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
            'tools_tags_history',
            new TableForeignKey({
                name: 'ToolsProvider',
                columnNames: ['tool_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'tools',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'tools_tags_history',
            new TableForeignKey({
                name: 'TagsProvider',
                columnNames: ['tag_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'tags',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tools_tag_history', 'ToolsProvider');
        await queryRunner.dropForeignKey('tools_tags_history', 'TagsProvider');
        await queryRunner.dropTable('tools_tags_history');
    }
}
