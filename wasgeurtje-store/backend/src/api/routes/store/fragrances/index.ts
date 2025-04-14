import { Router } from "express"
import { Fragrance } from "../../../../models/fragrance"
import { transformQuery } from "@medusajs/medusa"
import { FindConfig } from "@medusajs/medusa/dist/types/common"

export default (router: Router) => {
  const fragranceRouter = Router()
  router.use("/fragrances", fragranceRouter)

  /**
   * List all fragrances
   */
  fragranceRouter.get("/", async (req, res) => {
    const fragranceService = req.scope.resolve("fragranceService")
    
    const selector = {}
    const config: FindConfig<Fragrance> = {
      relations: ["product"],
      select: ["id", "name", "description", "icon_url", "type", "intensity", "notes", "is_seasonal", "is_bestseller", "product_id", "created_at", "updated_at"],
    }
    
    const fragrances = await fragranceService.list(selector, config)
    
    res.json({ fragrances })
  })

  /**
   * Get a fragrance by id
   */
  fragranceRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    const fragranceService = req.scope.resolve("fragranceService")
    
    const fragrance = await fragranceService.retrieve(id, {
      relations: ["product"],
    })
    
    res.json({ fragrance })
  })

  /**
   * Get fragrances by product
   */
  fragranceRouter.get("/product/:productId", async (req, res) => {
    const { productId } = req.params
    const fragranceService = req.scope.resolve("fragranceService")
    
    const fragrances = await fragranceService.listByProduct(productId, {
      relations: ["product"],
    })
    
    res.json({ fragrances })
  })

  return router
} 