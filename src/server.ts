import express from "express";
import { getRepository } from "typeorm";
import FosterHome from './models/FosterHome'

import "./database/connection";

const app = express();

app.use(express.json());

app.post('/fosterhomes', async (request, response) => {
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

  return response.json({ message: 'Hello World' });
});

app.listen(3333);
