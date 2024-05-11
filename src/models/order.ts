import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

import { Order as MedusaOrder } from '@medusajs/medusa'

import { Store } from './store'

@Entity()
export class Order extends MedusaOrder {
    @Index('OrderStoreId')
    @Column({ nullable: true })
    store_id?: string

    @ManyToOne(() => Store, (store) => store.orders)
    @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
    store?: Store

    @Index('OrderParentId')
    @Column({ nullable: true })
    order_parent_id?: string

    @ManyToOne(() => Order, (order) => order.children)
    @JoinColumn({ name: 'order_parent_id', referencedColumnName: 'id' })
    parent?: Order

    @OneToMany(() => Order, (order) => order.parent)
    @JoinColumn({ name: 'id', referencedColumnName: 'order_parent_id' })
    children?: Order[]
}