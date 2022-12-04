import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Bhp } from './Bhp'
import { Dokter } from './Dokter'
import { Kunjungan } from './Kunjungan'
import { Obat } from './Obat'
import { Penyakit } from './Penyakit'
import { Perawat } from './Perawat'
import { PoliBagian } from './PoliBagian'
import { Tindakan } from './Tindakan'

@ObjectType()
@Entity()
export class KunjunganPoli extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  biayaPoli: string

  @Field()
  @Column()
  hasilBagiDokter: string

  @Field()
  @Column()
  hasilBagiPerawat: string

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

  @Field(() => Kunjungan, { nullable: true })
  @ManyToOne(() => Kunjungan, (kunjungan) => kunjungan.kunjunganPoli)
  kunjungan: Kunjungan

  @Field()
  @Column()
  kunjunganId: number

  @Field(() => PoliBagian, { nullable: true })
  @ManyToOne(() => PoliBagian, (poliBagian) => poliBagian.kunjunganPoli)
  poliBagian: PoliBagian

  @Field()
  @Column()
  poliBagianId: number

  @Field(() => Dokter, { nullable: true })
  @ManyToOne(() => Dokter, (dokter) => dokter.kunjunganPoli)
  dokter: Dokter

  @Field()
  @Column()
  dokterId: number

  @Field(() => Perawat, { nullable: true })
  @ManyToOne(() => Perawat, (perawat) => perawat.kunjunganPoli)
  perawat: Perawat

  @Field()
  @Column()
  perawatId: number

  @Field(() => Penyakit, { nullable: true })
  @ManyToOne(() => Penyakit, (penyakit) => penyakit.kunjunganPoli)
  penyakit: Penyakit

  @Field()
  @Column()
  penyakitId: number

  @Field(() => [Tindakan], { nullable: true })
  @OneToMany(() => Tindakan, (tindakan) => tindakan.kunjunganPoli)
  tindakan: Tindakan[]

  @Field(() => [Obat], { nullable: true })
  @OneToMany(() => Obat, (obat) => obat.kunjunganPoli)
  obat: Obat[]

  @Field(() => [Bhp], { nullable: true })
  @OneToMany(() => Bhp, (bhp) => bhp.kunjunganPoli)
  bhp: Bhp[]
}
