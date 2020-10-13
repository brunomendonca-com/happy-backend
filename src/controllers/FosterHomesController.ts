import { Request, Response } from "express";
import { getRepository } from "typeorm";
import FosterHome from '../models/FosterHome';

export default {

  async index(request: Request, response: Response) {

    const fosterHomesRepository = getRepository(FosterHome);

    const fosterHomes = await fosterHomesRepository.find();

    return response.json(fosterHomes);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const fosterHomesRepository = getRepository(FosterHome);

    const fosterHome = await fosterHomesRepository.findOneOrFail(id);

    return response.json(fosterHome);
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

    const fosterHome = fosterHomesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    })

    await fosterHomesRepository.save(fosterHome);

    return response.status(201).json(fosterHome);
  }
};