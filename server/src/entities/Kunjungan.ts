import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { KunjunganPoli } from './KunjunganPoli'
import { Penyakit } from './Penyakit'
import { Reservasi } from './Reservasi'
import { User } from './User'

@ObjectType()
@Entity()
export class Kunjungan extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  tekananDarah: number

  @Field()
  @Column()
  denyutNadi: number

  @Field()
  @Column()
  usiaTahun: number

  @Field()
  @Column()
  usiaBulan: number

  @Field()
  @Column()
  usiaHari: number

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

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.kunjungan)
  user: User

  @Field()
  @Column()
  userId: number

  @Field(() => Reservasi, { nullable: true })
  @OneToOne(() => Reservasi, (reservasi) => reservasi.kunjungan)
  reservasi: Reservasi

  @Field()
  @Column()
  reservasiId: number

  @Field(() => Penyakit, { nullable: true })
  @ManyToOne(() => Penyakit, (penyakit) => penyakit.kunjungan)
  penyakit: Penyakit

  @Field()
  @Column()
  penyakitId: number

  @Field(() => KunjunganPoli, { nullable: true })
  @OneToOne(() => KunjunganPoli, (kunjunganPoli) => kunjunganPoli.kunjungan)
  kunjunganPoli: KunjunganPoli
}

// Id,id_reservasi, id_pasien, id_penyakit,tekanan_darah, denyut_nadi, usia_tahun,usia_bulan,usia_hari, created_by,created_at, edited_by,edited_at
