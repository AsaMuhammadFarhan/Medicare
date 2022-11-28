import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Kunjungan } from './Kunjungan'
import { KunjunganPoli } from './KunjunganPoli'

@ObjectType()
@Entity()
export class Penyakit extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  nama: string

  @Field()
  @Column()
  kode: string

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

  @Field(() => [Kunjungan])
  @OneToMany(() => Kunjungan, (kunjungan) => kunjungan.penyakit)
  kunjungan: Kunjungan[]

  @Field(() => [KunjunganPoli])
  @OneToMany(() => KunjunganPoli, (kunjunganPoli) => kunjunganPoli.penyakit)
  kunjunganPoli: KunjunganPoli[]
}