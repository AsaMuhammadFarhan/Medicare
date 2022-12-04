import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { KunjunganPoli } from './KunjunganPoli'
import { RefBhp } from './RefBhp'

@ObjectType()
@Entity()
export class Bhp extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  harga: number

  @Field()
  @Column()
  jumlah: number

  @Field(() => String)
  @Column()
  createdBy: string

  @Field(() => String)
  @Column()
  updatedBy: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date

  @Field(() => RefBhp)
  @ManyToOne(() => RefBhp, (refBhp) => refBhp.bhp)
  refBhp: RefBhp

  @Field()
  @Column()
  refBhpId: number

  @Field(() => KunjunganPoli)
  @ManyToOne(() => KunjunganPoli, (kunjunganPoli) => kunjunganPoli.bhp)
  kunjunganPoli: KunjunganPoli

  @Field()
  @Column()
  kunjunganPoliId: number
}
