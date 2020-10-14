import { Request, Response } from "express";
import { getRepository } from "typeorm";
import FosterHome from '../models/FosterHome';
import fosterhomeView from "../views/fosterhomes_views";
import * as Yup from 'yup';

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

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const fosterHome = fosterHomesRepository.create(data)

    await fosterHomesRepository.save(fosterHome);

    return response.status(201).json(fosterHome);
  }
};