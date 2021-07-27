import { Router } from 'express';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import ToolsController from '../controllers/ToolsController';

const toolsController = new ToolsController();

const toolsRouter = Router();

toolsRouter.use(ensureAutheticated);
toolsRouter.post('/', toolsController.create);
toolsRouter.get('/', toolsController.index);
toolsRouter.delete('/:id', toolsController.delete);

export default toolsRouter;
