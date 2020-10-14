import { Request, Response } from "express";
import { getRepository } from "typeorm";
import FosterHome from '../models/FosterHome';
import fosterhomeView from "../views/fosterhomes_views";

export default {

  async index(request: Request, response: Response) {

    const fosterHomesRepository = getRepository(FosterHome);

    const fosterHomes = await fosterHomesRepository.find({ relations: ['images'] });

    return response.json(fosterhomeView.renderMany(fosterHomes));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const fosterHomesRepository = getRepository(FosterHome);

    const fosterHome = await fosterHomesRepository.findOneOrFail(id, { relations: ['images'] });

    return response.json(fosterhomeView.render(fosterHome));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;

    const fosterHomesRepository = getRepository(FosterHome);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const fosterHome = fosterHomesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    })

    await fosterHomesRepository.save(fosterHome);

    return response.status(201).json(fosterHome);
  }
};