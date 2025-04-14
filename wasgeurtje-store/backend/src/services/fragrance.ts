import { FindConfig, Selector, TransactionBaseService } from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import { Fragrance } from "../models/fragrance"
import { FragranceRepository } from "../repositories/fragrance"

type FragranceServiceProps = {
  manager: EntityManager
  fragranceRepository: typeof FragranceRepository
}

class FragranceService extends TransactionBaseService {
  protected manager_: EntityManager
  protected fragranceRepository_: typeof FragranceRepository

  constructor({ manager, fragranceRepository }: FragranceServiceProps) {
    super(arguments[0])
    this.manager_ = manager
    this.fragranceRepository_ = fragranceRepository
  }

  /**
   * Creates a fragrance
   */
  async create(data: Partial<Fragrance>): Promise<Fragrance> {
    return await this.atomicPhase_(async (manager) => {
      const fragranceRepo = manager.withRepository(this.fragranceRepository_)
      const fragrance = fragranceRepo.create(data)
      return await fragranceRepo.save(fragrance)
    })
  }

  /**
   * Retrieves a fragrance by id
   */
  async retrieve(
    fragranceId: string,
    config?: FindConfig<Fragrance>
  ): Promise<Fragrance> {
    const fragranceRepo = this.manager_.withRepository(this.fragranceRepository_)
    const fragrance = await fragranceRepo.findOne({
      where: { id: fragranceId },
      ...config,
    })

    if (!fragrance) {
      throw new Error(`Fragrance with id: ${fragranceId} not found`)
    }

    return fragrance
  }

  /**
   * Lists fragrances based on selector
   */
  async list(
    selector: Selector<Fragrance> = {},
    config?: FindConfig<Fragrance>
  ): Promise<Fragrance[]> {
    const fragranceRepo = this.manager_.withRepository(this.fragranceRepository_)
    return await fragranceRepo.find({
      where: selector,
      ...config,
    })
  }

  /**
   * Lists fragrances for a specific product
   */
  async listByProduct(
    productId: string,
    config?: FindConfig<Fragrance>
  ): Promise<Fragrance[]> {
    return this.list(
      {
        product_id: productId,
      },
      config
    )
  }

  /**
   * Updates a fragrance
   */
  async update(
    fragranceId: string,
    data: Partial<Fragrance>
  ): Promise<Fragrance> {
    return await this.atomicPhase_(async (manager) => {
      const fragranceRepo = manager.withRepository(this.fragranceRepository_)
      const fragrance = await this.retrieve(fragranceId)

      Object.assign(fragrance, data)
      return await fragranceRepo.save(fragrance)
    })
  }

  /**
   * Deletes a fragrance
   */
  async delete(fragranceId: string): Promise<void> {
    return await this.atomicPhase_(async (manager) => {
      const fragranceRepo = manager.withRepository(this.fragranceRepository_)
      const fragrance = await this.retrieve(fragranceId)

      await fragranceRepo.remove(fragrance)
    })
  }
}

export default FragranceService 