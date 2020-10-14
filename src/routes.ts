import { Router } from 'express';
import multer from "multer";

import uploadConfig from "./config/upload";
import FosterHomesController from "./controllers/FosterHomesController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/fosterhomes', FosterHomesController.index);
routes.get('/fosterhomes/:id', FosterHomesController.show);
routes.post('/fosterhomes', upload.array('images'), FosterHomesController.create);

export default routes;