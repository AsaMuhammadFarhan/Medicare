// import { Field, InputType } from "type-graphql"

// @InputType()
// class ReservasiInput {
//   @Field()
//   tanggalRencanaDatang: Date

//   @Field()
//   nomorTelepon: string

//   @Field()
//   statusPasien: string

//   @Field()
//   createdBy: string

//   @Field()
//   updatedBy: string

//   // @Field(() => User)
//   // @ManyToOne(() => User, (user) => user.reservasi, {
//   //   onDelete: 'SET NULL',
//   //   nullable: true,
//   // })
//   // user: User

//   // @Field(() => Kunjungan, { nullable: true })
//   // @OneToOne(() => Kunjungan, (kunjungan) => kunjungan.reservasi)
//   // kunjungan: Kunjungan

//   // @Field(() => PoliBagian, { nullable: true })
//   // @ManyToOne(() => PoliBagian, (poliBagian) => poliBagian.reservasi)
//   // poliBagian: PoliBagian

//   // @Field(() => Dokter, { nullable: true })
//   // @ManyToOne(() => Dokter, (dokter) => dokter.reservasi)
//   // dokter: Dokter
// }