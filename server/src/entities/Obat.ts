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
import { RefObat } from './RefObat'

@ObjectType()
@Entity()
export class Obat extends BaseEntity {
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

  @Field(() => KunjunganPoli)
  @ManyToOne(() => KunjunganPoli, (kunjunganPoli) => kunjunganPoli.obat)
  kunjunganPoli: KunjunganPoli

  @Field()
  @Column()
  kunjunganPoliId: number

  @Field(() => RefObat)
  @ManyToOne(() => RefObat, (refObat) => refObat.obat)
  refObat: RefObat

  @Field()
  @Column()
  refObatId: number
}