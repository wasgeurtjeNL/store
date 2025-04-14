import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntity, Product, generateEntityId } from "@medusajs/medusa"

@Entity()
export class Fragrance extends BaseEntity {
  @Column()
  name: string

  @Column({ type: "text", nullable: true })
  description: string

  @Column({ nullable: true })
  icon_url: string

  @Column()
  @Index()
  product_id: string

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: "product_id" })
  product: Product

  @Column({ type: "varchar", nullable: true })
  type: string

  @Column({ type: "varchar", nullable: true })
  intensity: string

  @Column({ type: "jsonb", nullable: true })
  notes: {
    top?: string[]
    middle?: string[]
    base?: string[]
  }

  @Column({ type: "boolean", default: false })
  is_seasonal: boolean

  @Column({ type: "boolean", default: false })
  is_bestseller: boolean

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, unknown>

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "frag")
  }
} 