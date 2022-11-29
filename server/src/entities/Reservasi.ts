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
import { Dokter } from './Dokter'
import { Kunjungan } from './Kunjungan'
import { PoliBagian } from './PoliBagian'
import { User } from './User'

@ObjectType()
@Entity()
export class Reservasi extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column()
  tanggalRencanaDatang: Date

  @Field(() => String)
  @Column({ nullable: true })
  nomorTelepon: string

  @Field(() => String)
  @Column({ nullable: true })
  statusPasien: string

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
  @ManyToOne(() => User, (user) => user.reservasi, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  user: User

  @Field(() => Kunjungan, { nullable: true })
  @OneToOne(() => Kunjungan, (kunjungan) => kunjungan.reservasi)
  kunjungan: Kunjungan

  @Field(() => PoliBagian, { nullable: true })
  @ManyToOne(() => PoliBagian, (poliBagian) => poliBagian.reservasi)
  poliBagian: PoliBagian

  @Field()
  @Column()
  poliBagianId: number

  @Field(() => Dokter, { nullable: true })
  @ManyToOne(() => Dokter, (dokter) => dokter.reservasi)
  dokter: Dokter

  @Field()
  @Column()
  dokterId: number
}

// id, id_pasien, tanggal_rencana_datang, id_poli_bagian, id_dokter,no_telp, status_pasien, created_by,created_at, edited_by,edited_at
