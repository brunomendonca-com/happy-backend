import { Router } from 'express';
import FosterHomesController from "./controllers/FosterHomesController";

const routes = Router();

routes.get('/fosterhomes', FosterHomesController.index);
routes.get('/fosterhomes/:id', FosterHomesController.show);
routes.post('/fosterhomes', FosterHomesController.create);

export default routes;