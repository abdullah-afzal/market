import { Entity, OneToMany } from 'typeorm';
import { Store as MedusaStore } from '@medusajs/medusa';
import { User } from './user';
import { Product } from './product';
import { ShippingOption } from './shipping-option';
import { ShippingProfile } from './shipping-profile';

@Entity()
export class Store extends MedusaStore {
    @OneToMany(() => User, (user) => user.store)
    members?: User[];

    @OneToMany(() => Product, (product) => product.store)
    products?: Product[]

    @OneToMany(() => ShippingOption, (shippingOption) => shippingOption.store)
    shippingOptions?: ShippingOption[]

    @OneToMany(() => ShippingProfile, (shippingProfile) => shippingProfile.store)
    shippingProfiles?: ShippingProfile[]
}
