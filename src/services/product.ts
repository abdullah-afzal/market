import type { CreateProductInput as MedusaCreateProductInput, ProductSelector as MedusaProductSelector, FindProductConfig } from '@medusajs/medusa/dist/types/product'
import { ProductService as MedusaProductService } from '@medusajs/medusa'
import { Lifetime } from 'awilix'

import type { User } from '../models/user'
import type { Product } from '../models/product'

// We override the type definition so it will not throw TS errors in the `create` method
type CreateProductInput = {
    store_id?: string
} & MedusaCreateProductInput

type ProductSelector = {
    store_id?: string
} & MedusaProductSelector

class ProductService extends MedusaProductService {
    static LIFE_TIME = Lifetime.TRANSIENT
    protected readonly loggedInUser_: User | null

    constructor(container) {
        // @ts-ignore
        super(...arguments)

        try {
            this.loggedInUser_ = container.loggedInUser
        } catch (e) {
            // avoid errors when backend first runs
        }
    }

    async create(productObject: CreateProductInput): Promise<Product> {
        if (!productObject.store_id && this.loggedInUser_?.store_id) {
            productObject.store_id = this.loggedInUser_.store_id
            productObject.handle = `${productObject.title.replace(" ","-")}-${productObject.store_id}`
        }

        return await super.create(productObject)
    }

    async listAndCount(selector: ProductSelector, config?: FindProductConfig): Promise<[Product[], number]> {
        if (!selector.store_id && this.loggedInUser_?.store_id) {
            selector.store_id = this.loggedInUser_.store_id
        }

        // @ts-ignore
        config.select?.push('store_id')

        config.relations?.push('store')

        const products = await super.listAndCount(selector, config)
        return products
    }
}

export default ProductService
