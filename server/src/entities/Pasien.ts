import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'


@ObjectType()
@Entity()
export class Pasien extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  noRm: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  nama: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  nik: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  alamat: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  tempatLahir: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  tanggalLahir: Date

  @Field({ nullable: true })
  @Column({ nullable: true })
  rt: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  rw: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  idKelurahan: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  idKecamatan: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  idKabupatenKota: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  idProvinsi: string

  @Field()
  @Column()
  userId: number

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @Field(() => User)
  @OneToOne(() => User, user => user.pasien)
  @JoinColumn()
  user: User
}