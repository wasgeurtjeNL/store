import { Repository } from "typeorm"
import { Fragrance } from "../models/fragrance"
import { dataSource } from "@medusajs/medusa/dist/loaders/database"

export const FragranceRepository = dataSource.getRepository(Fragrance)

export default FragranceRepository 