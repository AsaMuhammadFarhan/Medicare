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
import { RefTindakan } from './RefTindakan'

@ObjectType()
@Entity()
export class Tindakan extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  harga: number

  @Field()
  @Column()
  jumlah: number

  @Field()
  @Column()
  bagiHasilDokter: number

  @Field()
  @Column()
  bagiHasilPerawat: number

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

  @Field(() => RefTindakan)
  @ManyToOne(() => RefTindakan, (refTindakan) => refTindakan.tindakan)
  refTindakan: RefTindakan

  @Field()
  @Column()
  refTindakanId: number

  @Field(() => KunjunganPoli)
  @ManyToOne(() => KunjunganPoli, (kunjunganPoli) => kunjunganPoli.tindakan)
  kunjunganPoli: KunjunganPoli

  @Field()
  @Column()
  kunjunganPoliId: number
}
