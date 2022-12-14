import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Bhp = {
  __typename?: 'Bhp';
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  harga: Scalars['Float'];
  id: Scalars['Float'];
  jumlah: Scalars['Float'];
  kunjunganPoli: KunjunganPoli;
  kunjunganPoliId: Scalars['Float'];
  refBhp: RefBhp;
  refBhpId: Scalars['Float'];
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type BhpInput = {
  createdBy: Scalars['String'];
  harga: Scalars['Float'];
  jumlah: Scalars['Float'];
  kunjunganPoliId: Scalars['Float'];
  refBhpId: Scalars['Float'];
  updatedBy: Scalars['String'];
};

export type ConfigurationSettingInput = {
  name: Scalars['String'];
  updatedBy: Scalars['String'];
  value: Scalars['String'];
};

export type ConfigurationSettings = {
  __typename?: 'ConfigurationSettings';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
  value: Scalars['String'];
};

export type Dokter = {
  __typename?: 'Dokter';
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  id: Scalars['Float'];
  kunjunganPoli: Array<KunjunganPoli>;
  nama: Scalars['String'];
  nomorTelepon: Scalars['String'];
  poliBagian: PoliBagian;
  poliBagianId: Scalars['Float'];
  reservasi: Array<Reservasi>;
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type DokterInput = {
  createdBy: Scalars['String'];
  nama: Scalars['String'];
  nomorTelepon: Scalars['String'];
  poliBagianId: Scalars['Float'];
  updatedBy: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Kunjungan = {
  __typename?: 'Kunjungan';
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  denyutNadi: Scalars['Float'];
  id: Scalars['Float'];
  kunjunganPoli?: Maybe<Array<KunjunganPoli>>;
  penyakit?: Maybe<Penyakit>;
  penyakitId: Scalars['Float'];
  reservasi?: Maybe<Reservasi>;
  reservasiId: Scalars['Float'];
  tekananDarah: Scalars['Float'];
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
  usiaBulan: Scalars['Float'];
  usiaHari: Scalars['Float'];
  usiaTahun: Scalars['Float'];
};

export type KunjunganInput = {
  createdBy: Scalars['String'];
  denyutNadi: Scalars['Float'];
  penyakitId: Scalars['Float'];
  reservasiId: Scalars['Float'];
  tekananDarah: Scalars['Float'];
  updatedBy: Scalars['String'];
  userId: Scalars['Float'];
  usiaBulan: Scalars['Float'];
  usiaHari: Scalars['Float'];
  usiaTahun: Scalars['Float'];
};

export type KunjunganPoli = {
  __typename?: 'KunjunganPoli';
  bhp?: Maybe<Array<Bhp>>;
  biayaPoli: Scalars['String'];
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  dokter?: Maybe<Dokter>;
  dokterId: Scalars['Float'];
  hasilBagiDokter: Scalars['String'];
  hasilBagiPerawat: Scalars['String'];
  id: Scalars['Float'];
  kunjungan?: Maybe<Kunjungan>;
  kunjunganId: Scalars['Float'];
  obat?: Maybe<Array<Obat>>;
  penyakit?: Maybe<Penyakit>;
  penyakitId: Scalars['Float'];
  perawat?: Maybe<Perawat>;
  perawatId: Scalars['Float'];
  poliBagian?: Maybe<PoliBagian>;
  poliBagianId: Scalars['Float'];
  tindakan?: Maybe<Array<Tindakan>>;
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type KunjunganPoliInput = {
  biayaPoli: Scalars['String'];
  createdBy: Scalars['String'];
  dokterId: Scalars['Float'];
  hasilBagiDokter: Scalars['String'];
  hasilBagiPerawat: Scalars['String'];
  kunjunganId: Scalars['Float'];
  penyakitId: Scalars['Float'];
  perawatId: Scalars['Float'];
  poliBagianId: Scalars['Float'];
  updatedBy: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createBhp: Bhp;
  createConfigurationSetting: ConfigurationSettings;
  createDokter: Dokter;
  createKunjungan: Kunjungan;
  createKunjunganPoli: KunjunganPoli;
  createObat: Obat;
  createPenyakit: Penyakit;
  createPerawat: Perawat;
  createPoliBagian: PoliBagian;
  createRefBhp: RefBhp;
  createRefObat: RefObat;
  createRefTindakan: RefTindakan;
  createReservasi: Reservasi;
  createTindakan: Tindakan;
  createUserPasien: Pasien;
  deleteBhp: Scalars['Boolean'];
  deleteConfigurationSetting: Scalars['Boolean'];
  deleteDokter: Scalars['Boolean'];
  deleteKunjungan: Scalars['Boolean'];
  deleteKunjunganPoli: Scalars['Boolean'];
  deleteObat: Scalars['Boolean'];
  deletePenyakit: Scalars['Boolean'];
  deletePerawat: Scalars['Boolean'];
  deletePoliBagian: Scalars['Boolean'];
  deleteRefBhp: Scalars['Boolean'];
  deleteRefObat: Scalars['Boolean'];
  deleteRefTindakan: Scalars['Boolean'];
  deleteReservasi: Scalars['Boolean'];
  deleteTindakan: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  initiationSpecialRegister: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  readyReservasi: Reservasi;
  register: UserResponse;
  specialRegister: UserResponse;
  toCanceledReservasi: Reservasi;
  toSuccessReservasi: Reservasi;
  toWaitingPaymentReservasi: Reservasi;
  updateBhp: Bhp;
  updateConfigurationSetting: ConfigurationSettings;
  updateDokter: Dokter;
  updateKunjungan: Kunjungan;
  updateKunjunganPoli: KunjunganPoli;
  updateObat: Obat;
  updatePenyakit: Penyakit;
  updatePerawat: Perawat;
  updatePoliBagian: PoliBagian;
  updateRefBhp: RefBhp;
  updateRefObat: RefObat;
  updateRefTindakan: RefTindakan;
  updateReservasi: Reservasi;
  updateTindakan: Tindakan;
  updateUserPasien: Pasien;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateBhpArgs = {
  input: BhpInput;
};


export type MutationCreateConfigurationSettingArgs = {
  input: ConfigurationSettingInput;
};


export type MutationCreateDokterArgs = {
  input: DokterInput;
};


export type MutationCreateKunjunganArgs = {
  input: KunjunganInput;
};


export type MutationCreateKunjunganPoliArgs = {
  input: KunjunganPoliInput;
};


export type MutationCreateObatArgs = {
  input: ObatInput;
};


export type MutationCreatePenyakitArgs = {
  input: PenyakitInput;
};


export type MutationCreatePerawatArgs = {
  input: PerawatInput;
};


export type MutationCreatePoliBagianArgs = {
  input: PoliBagianInput;
};


export type MutationCreateRefBhpArgs = {
  input: RefBhpInput;
};


export type MutationCreateRefObatArgs = {
  input: RefObatInput;
};


export type MutationCreateRefTindakanArgs = {
  input: RefTindakanInput;
};


export type MutationCreateReservasiArgs = {
  input: ReservasiInput;
};


export type MutationCreateTindakanArgs = {
  input: TindakanInput;
};


export type MutationCreateUserPasienArgs = {
  input: PasienInput;
};


export type MutationDeleteBhpArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteConfigurationSettingArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteDokterArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteKunjunganArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteKunjunganPoliArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteObatArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePenyakitArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePerawatArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePoliBagianArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteRefBhpArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteRefObatArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteRefTindakanArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteReservasiArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTindakanArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationReadyReservasiArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationSpecialRegisterArgs = {
  options: UsernamePasswordInput;
  role: Scalars['String'];
};


export type MutationToCanceledReservasiArgs = {
  id: Scalars['Int'];
};


export type MutationToSuccessReservasiArgs = {
  id: Scalars['Int'];
};


export type MutationToWaitingPaymentReservasiArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateBhpArgs = {
  id: Scalars['Int'];
  input: BhpInput;
};


export type MutationUpdateConfigurationSettingArgs = {
  id: Scalars['Int'];
  input: ConfigurationSettingInput;
};


export type MutationUpdateDokterArgs = {
  id: Scalars['Int'];
  input: DokterInput;
};


export type MutationUpdateKunjunganArgs = {
  id: Scalars['Int'];
  input: KunjunganInput;
};


export type MutationUpdateKunjunganPoliArgs = {
  id: Scalars['Int'];
  input: KunjunganPoliInput;
};


export type MutationUpdateObatArgs = {
  id: Scalars['Int'];
  input: ObatInput;
};


export type MutationUpdatePenyakitArgs = {
  id: Scalars['Int'];
  input: PenyakitInput;
};


export type MutationUpdatePerawatArgs = {
  id: Scalars['Int'];
  input: PerawatInput;
};


export type MutationUpdatePoliBagianArgs = {
  id: Scalars['Int'];
  input: PoliBagianInput;
};


export type MutationUpdateRefBhpArgs = {
  id: Scalars['Int'];
  input: RefBhpInput;
};


export type MutationUpdateRefObatArgs = {
  id: Scalars['Int'];
  input: RefObatInput;
};


export type MutationUpdateRefTindakanArgs = {
  id: Scalars['Int'];
  input: RefTindakanInput;
};


export type MutationUpdateReservasiArgs = {
  id: Scalars['Int'];
  input: ReservasiInput;
};


export type MutationUpdateTindakanArgs = {
  id: Scalars['Int'];
  input: TindakanInput;
};


export type MutationUpdateUserPasienArgs = {
  id: Scalars['Float'];
  input: PasienInput;
};

export type Obat = {
  __typename?: 'Obat';
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  harga: Scalars['Float'];
  id: Scalars['Float'];
  jumlah: Scalars['Float'];
  kunjunganPoli: KunjunganPoli;
  kunjunganPoliId: Scalars['Float'];
  refObat: RefObat;
  refObatId: Scalars['Float'];
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type ObatInput = {
  createdBy: Scalars['String'];
  harga: Scalars['Float'];
  jumlah: Scalars['Float'];
  kunjunganPoliId: Scalars['Float'];
  refObatId: Scalars['Float'];
  updatedBy: Scalars['String'];
};

export type Pasien = {
  __typename?: 'Pasien';
  alamat?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  idKabupatenKota?: Maybe<Scalars['String']>;
  idKecamatan?: Maybe<Scalars['String']>;
  idKelurahan?: Maybe<Scalars['String']>;
  idProvinsi?: Maybe<Scalars['String']>;
  nama?: Maybe<Scalars['String']>;
  nik?: Maybe<Scalars['String']>;
  noRm?: Maybe<Scalars['String']>;
  nomorTelepon?: Maybe<Scalars['String']>;
  rt?: Maybe<Scalars['String']>;
  rw?: Maybe<Scalars['String']>;
  tanggalLahir?: Maybe<Scalars['DateTime']>;
  tempatLahir?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Float'];
};

export type PasienInput = {
  alamat?: InputMaybe<Scalars['String']>;
  idKabupatenKota?: InputMaybe<Scalars['String']>;
  idKecamatan?: InputMaybe<Scalars['String']>;
  idKelurahan?: InputMaybe<Scalars['String']>;
  idProvinsi?: InputMaybe<Scalars['String']>;
  nama?: InputMaybe<Scalars['String']>;
  nik?: InputMaybe<Scalars['String']>;
  noRm?: InputMaybe<Scalars['String']>;
  nomorTelepon?: InputMaybe<Scalars['String']>;
  rt?: InputMaybe<Scalars['String']>;
  rw?: InputMaybe<Scalars['String']>;
  tanggalLahir?: InputMaybe<Scalars['DateTime']>;
  tempatLahir?: InputMaybe<Scalars['String']>;
  userId: Scalars['Float'];
};

export type Penyakit = {
  __typename?: 'Penyakit';
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  id: Scalars['Float'];
  kode: Scalars['String'];
  kunjungan: Array<Kunjungan>;
  kunjunganPoli: Array<KunjunganPoli>;
  nama: Scalars['String'];
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type PenyakitInput = {
  createdBy: Scalars['String'];
  kode: Scalars['String'];
  nama: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type Perawat = {
  __typename?: 'Perawat';
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  id: Scalars['Float'];
  kunjunganPoli: Array<KunjunganPoli>;
  nama: Scalars['String'];
  nomorTelepon: Scalars['String'];
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type PerawatInput = {
  createdBy: Scalars['String'];
  nama: Scalars['String'];
  nomorTelepon: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type PoliBagian = {
  __typename?: 'PoliBagian';
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  dokter: Array<Dokter>;
  hargaPendaftaran: Scalars['Float'];
  id: Scalars['Float'];
  kunjunganPoli?: Maybe<Array<KunjunganPoli>>;
  nama: Scalars['String'];
  reservasi?: Maybe<Array<Reservasi>>;
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
  user?: Maybe<User>;
};

export type PoliBagianInput = {
  createdBy: Scalars['String'];
  hargaPendaftaran: Scalars['Float'];
  nama: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  configurationSettings: Array<ConfigurationSettings>;
  configurationSettingsByName: Array<ConfigurationSettings>;
  getAllBhps?: Maybe<Array<Bhp>>;
  getAllDokters?: Maybe<Array<Dokter>>;
  getAllKunjunganPolis?: Maybe<Array<KunjunganPoli>>;
  getAllKunjungans?: Maybe<Array<Kunjungan>>;
  getAllObats?: Maybe<Array<Obat>>;
  getAllPenyakits?: Maybe<Array<Penyakit>>;
  getAllPerawats?: Maybe<Array<Perawat>>;
  getAllPoliBagians?: Maybe<Array<PoliBagian>>;
  getAllRefBhps?: Maybe<Array<RefBhp>>;
  getAllRefObats?: Maybe<Array<RefObat>>;
  getAllRefTindakans?: Maybe<Array<RefTindakan>>;
  getAllReservasis?: Maybe<Array<Reservasi>>;
  getAllTindakans?: Maybe<Array<Tindakan>>;
  getAllUserPasien: Array<User>;
  getBhp?: Maybe<Bhp>;
  getDokter?: Maybe<Dokter>;
  getDokters?: Maybe<Array<Dokter>>;
  getKunjungan?: Maybe<Kunjungan>;
  getKunjunganPoli?: Maybe<KunjunganPoli>;
  getKunjunganPolisByAdminPoli?: Maybe<Array<KunjunganPoli>>;
  getKunjungans?: Maybe<Array<Kunjungan>>;
  getObat?: Maybe<Obat>;
  getPenyakits?: Maybe<Array<Penyakit>>;
  getPerawat?: Maybe<Perawat>;
  getPerawats?: Maybe<Array<Perawat>>;
  getPoliBagian?: Maybe<PoliBagian>;
  getPoliBagians?: Maybe<Array<PoliBagian>>;
  getRefBhps?: Maybe<Array<RefBhp>>;
  getRefObats?: Maybe<Array<RefObat>>;
  getRefTindakans?: Maybe<Array<RefTindakan>>;
  getReservasi?: Maybe<Reservasi>;
  getTindakan?: Maybe<Tindakan>;
  getUserPasien?: Maybe<Pasien>;
  getUserbyId?: Maybe<User>;
  me?: Maybe<User>;
  meWithAllData?: Maybe<User>;
  meWithPasienData?: Maybe<User>;
};


export type QueryConfigurationSettingsByNameArgs = {
  keywords: Scalars['String'];
};


export type QueryGetBhpArgs = {
  id: Scalars['Int'];
};


export type QueryGetDokterArgs = {
  id: Scalars['Int'];
};


export type QueryGetDoktersArgs = {
  keywords: Scalars['String'];
};


export type QueryGetKunjunganArgs = {
  id: Scalars['Int'];
};


export type QueryGetKunjunganPoliArgs = {
  id: Scalars['Int'];
};


export type QueryGetKunjungansArgs = {
  keywords: Scalars['String'];
};


export type QueryGetObatArgs = {
  id: Scalars['Int'];
};


export type QueryGetPenyakitsArgs = {
  keywords: Scalars['String'];
};


export type QueryGetPerawatArgs = {
  id: Scalars['Int'];
};


export type QueryGetPerawatsArgs = {
  keywords: Scalars['String'];
};


export type QueryGetPoliBagianArgs = {
  id: Scalars['Int'];
};


export type QueryGetPoliBagiansArgs = {
  keywords: Scalars['String'];
};


export type QueryGetRefBhpsArgs = {
  keywords: Scalars['String'];
};


export type QueryGetRefObatsArgs = {
  keywords: Scalars['String'];
};


export type QueryGetRefTindakansArgs = {
  keywords: Scalars['String'];
};


export type QueryGetReservasiArgs = {
  id: Scalars['Int'];
};


export type QueryGetTindakanArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserbyIdArgs = {
  id: Scalars['Int'];
};

export type RefBhp = {
  __typename?: 'RefBhp';
  bhp: Array<Bhp>;
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  harga: Scalars['Int'];
  id: Scalars['Float'];
  nama: Scalars['String'];
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type RefBhpInput = {
  createdBy: Scalars['String'];
  harga: Scalars['Float'];
  nama: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type RefObat = {
  __typename?: 'RefObat';
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  harga: Scalars['Int'];
  id: Scalars['Float'];
  nama: Scalars['String'];
  obat: Array<Obat>;
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type RefObatInput = {
  createdBy: Scalars['String'];
  harga: Scalars['Float'];
  nama: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type RefTindakan = {
  __typename?: 'RefTindakan';
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  harga: Scalars['Int'];
  id: Scalars['Float'];
  nama: Scalars['String'];
  tindakan: Array<Tindakan>;
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type RefTindakanInput = {
  createdBy: Scalars['String'];
  harga: Scalars['Float'];
  nama: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type Reservasi = {
  __typename?: 'Reservasi';
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  dokter?: Maybe<Dokter>;
  dokterId: Scalars['Float'];
  id: Scalars['Float'];
  kunjungan?: Maybe<Kunjungan>;
  nomorTelepon: Scalars['String'];
  poliBagian?: Maybe<PoliBagian>;
  poliBagianId: Scalars['Float'];
  statusPasien: Scalars['String'];
  tanggalRencanaDatang: Scalars['String'];
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
};

export type ReservasiInput = {
  createdBy: Scalars['String'];
  dokterId: Scalars['Float'];
  nomorTelepon?: InputMaybe<Scalars['String']>;
  poliBagianId: Scalars['Float'];
  statusPasien?: InputMaybe<Scalars['String']>;
  tanggalRencanaDatang?: InputMaybe<Scalars['DateTime']>;
  updatedBy: Scalars['String'];
  userId: Scalars['Float'];
};

export type Tindakan = {
  __typename?: 'Tindakan';
  bagiHasilDokter: Scalars['Float'];
  bagiHasilPerawat: Scalars['Float'];
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  harga: Scalars['Float'];
  id: Scalars['Float'];
  jumlah: Scalars['Float'];
  kunjunganPoli: KunjunganPoli;
  kunjunganPoliId: Scalars['Float'];
  refTindakan: RefTindakan;
  refTindakanId: Scalars['Float'];
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type TindakanInput = {
  bagiHasilDokter: Scalars['Float'];
  bagiHasilPerawat: Scalars['Float'];
  createdBy: Scalars['String'];
  harga: Scalars['Float'];
  jumlah: Scalars['Float'];
  kunjunganPoliId: Scalars['Float'];
  refTindakanId: Scalars['Float'];
  updatedBy: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  kunjungan: Array<Kunjungan>;
  pasien?: Maybe<Pasien>;
  poliBagian?: Maybe<PoliBagian>;
  poliBagianId?: Maybe<Scalars['Float']>;
  reservasi: Array<Reservasi>;
  role: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  username: Scalars['String'];
};

export type CreateBhpMutationVariables = Exact<{
  input: BhpInput;
}>;


export type CreateBhpMutation = { __typename?: 'Mutation', createBhp: { __typename?: 'Bhp', id: number } };

export type CreateConfigurationSettingMutationVariables = Exact<{
  input: ConfigurationSettingInput;
}>;


export type CreateConfigurationSettingMutation = { __typename?: 'Mutation', createConfigurationSetting: { __typename?: 'ConfigurationSettings', id: number, name: string, value: string } };

export type CreateDokterMutationVariables = Exact<{
  input: DokterInput;
}>;


export type CreateDokterMutation = { __typename?: 'Mutation', createDokter: { __typename?: 'Dokter', id: number, nama: string, nomorTelepon: string } };

export type CreateKunjunganMutationVariables = Exact<{
  input: KunjunganInput;
}>;


export type CreateKunjunganMutation = { __typename?: 'Mutation', createKunjungan: { __typename?: 'Kunjungan', id: number } };

export type CreateKunjunganPoliMutationVariables = Exact<{
  input: KunjunganPoliInput;
}>;


export type CreateKunjunganPoliMutation = { __typename?: 'Mutation', createKunjunganPoli: { __typename?: 'KunjunganPoli', id: number } };

export type CreateObatMutationVariables = Exact<{
  input: ObatInput;
}>;


export type CreateObatMutation = { __typename?: 'Mutation', createObat: { __typename?: 'Obat', id: number } };

export type CreatePenyakitMutationVariables = Exact<{
  input: PenyakitInput;
}>;


export type CreatePenyakitMutation = { __typename?: 'Mutation', createPenyakit: { __typename?: 'Penyakit', id: number } };

export type CreatePerawatMutationVariables = Exact<{
  input: PerawatInput;
}>;


export type CreatePerawatMutation = { __typename?: 'Mutation', createPerawat: { __typename?: 'Perawat', id: number } };

export type CreatePoliBagianMutationVariables = Exact<{
  input: PoliBagianInput;
}>;


export type CreatePoliBagianMutation = { __typename?: 'Mutation', createPoliBagian: { __typename?: 'PoliBagian', id: number } };

export type CreateRefBhpMutationVariables = Exact<{
  input: RefBhpInput;
}>;


export type CreateRefBhpMutation = { __typename?: 'Mutation', createRefBhp: { __typename?: 'RefBhp', id: number } };

export type CreateRefObatMutationVariables = Exact<{
  input: RefObatInput;
}>;


export type CreateRefObatMutation = { __typename?: 'Mutation', createRefObat: { __typename?: 'RefObat', id: number } };

export type CreateRefTindakanMutationVariables = Exact<{
  input: RefTindakanInput;
}>;


export type CreateRefTindakanMutation = { __typename?: 'Mutation', createRefTindakan: { __typename?: 'RefTindakan', id: number } };

export type CreateReservasiMutationVariables = Exact<{
  input: ReservasiInput;
}>;


export type CreateReservasiMutation = { __typename?: 'Mutation', createReservasi: { __typename?: 'Reservasi', id: number } };

export type CreateTindakanMutationVariables = Exact<{
  input: TindakanInput;
}>;


export type CreateTindakanMutation = { __typename?: 'Mutation', createTindakan: { __typename?: 'Tindakan', id: number } };

export type CreateUserPasienMutationVariables = Exact<{
  input: PasienInput;
}>;


export type CreateUserPasienMutation = { __typename?: 'Mutation', createUserPasien: { __typename?: 'Pasien', id: number } };

export type DeleteBhpMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteBhpMutation = { __typename?: 'Mutation', deleteBhp: boolean };

export type DeleteObatMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteObatMutation = { __typename?: 'Mutation', deleteObat: boolean };

export type DeleteRefObatMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteRefObatMutation = { __typename?: 'Mutation', deleteRefObat: boolean };

export type DeleteRefTindakanMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteRefTindakanMutation = { __typename?: 'Mutation', deleteRefTindakan: boolean };

export type DeleteRefBhpMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteRefBhpMutation = { __typename?: 'Mutation', deleteRefBhp: boolean };

export type DeletePenyakitMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePenyakitMutation = { __typename?: 'Mutation', deletePenyakit: boolean };

export type DeletePoliBagianMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePoliBagianMutation = { __typename?: 'Mutation', deletePoliBagian: boolean };

export type DeleteTindakanMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteTindakanMutation = { __typename?: 'Mutation', deleteTindakan: boolean };

export type InitiationSpecialRegisterMutationVariables = Exact<{ [key: string]: never; }>;


export type InitiationSpecialRegisterMutation = { __typename?: 'Mutation', initiationSpecialRegister: boolean };

export type LoginMutationVariables = Exact<{
  usernameorEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, username: string, role: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ReadyReservasiMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReadyReservasiMutation = { __typename?: 'Mutation', readyReservasi: { __typename?: 'Reservasi', id: number } };

export type RegisterMutationVariables = Exact<{
  input: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null } };

export type SpecialRegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
  role: Scalars['String'];
}>;


export type SpecialRegisterMutation = { __typename?: 'Mutation', specialRegister: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string } | null } };

export type ToCanceledReservasiMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ToCanceledReservasiMutation = { __typename?: 'Mutation', toCanceledReservasi: { __typename?: 'Reservasi', id: number } };

export type ToSuccessReservasiMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ToSuccessReservasiMutation = { __typename?: 'Mutation', toSuccessReservasi: { __typename?: 'Reservasi', id: number } };

export type ToWaitingPaymentReservasiMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ToWaitingPaymentReservasiMutation = { __typename?: 'Mutation', toWaitingPaymentReservasi: { __typename?: 'Reservasi', id: number } };

export type UpdateConfigurationSettingMutationVariables = Exact<{
  input: ConfigurationSettingInput;
  id: Scalars['Int'];
}>;


export type UpdateConfigurationSettingMutation = { __typename?: 'Mutation', updateConfigurationSetting: { __typename?: 'ConfigurationSettings', id: number, name: string, value: string } };

export type UpdateKunjunganMutationVariables = Exact<{
  id: Scalars['Int'];
  input: KunjunganInput;
}>;


export type UpdateKunjunganMutation = { __typename?: 'Mutation', updateKunjungan: { __typename?: 'Kunjungan', id: number } };

export type UpdatePenyakitMutationVariables = Exact<{
  id: Scalars['Int'];
  input: PenyakitInput;
}>;


export type UpdatePenyakitMutation = { __typename?: 'Mutation', updatePenyakit: { __typename?: 'Penyakit', id: number } };

export type UpdatePoliBagianMutationVariables = Exact<{
  id: Scalars['Int'];
  input: PoliBagianInput;
}>;


export type UpdatePoliBagianMutation = { __typename?: 'Mutation', updatePoliBagian: { __typename?: 'PoliBagian', id: number } };

export type UpdateRefBhpMutationVariables = Exact<{
  id: Scalars['Int'];
  input: RefBhpInput;
}>;


export type UpdateRefBhpMutation = { __typename?: 'Mutation', updateRefBhp: { __typename?: 'RefBhp', id: number } };

export type UpdateRefObatMutationVariables = Exact<{
  id: Scalars['Int'];
  input: RefObatInput;
}>;


export type UpdateRefObatMutation = { __typename?: 'Mutation', updateRefObat: { __typename?: 'RefObat', id: number } };

export type UpdateRefTindakanMutationVariables = Exact<{
  id: Scalars['Int'];
  input: RefTindakanInput;
}>;


export type UpdateRefTindakanMutation = { __typename?: 'Mutation', updateRefTindakan: { __typename?: 'RefTindakan', id: number } };

export type UpdateUserPasienMutationVariables = Exact<{
  input: PasienInput;
  id: Scalars['Float'];
}>;


export type UpdateUserPasienMutation = { __typename?: 'Mutation', updateUserPasien: { __typename?: 'Pasien', id: number } };

export type ConfigurationSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type ConfigurationSettingsQuery = { __typename?: 'Query', configurationSettings: Array<{ __typename?: 'ConfigurationSettings', id: number, name: string, value: string }> };

export type ConfigurationSettingsByNameQueryVariables = Exact<{
  keywords: Scalars['String'];
}>;


export type ConfigurationSettingsByNameQuery = { __typename?: 'Query', configurationSettingsByName: Array<{ __typename?: 'ConfigurationSettings', id: number, name: string, value: string }> };

export type GetAllDoktersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDoktersQuery = { __typename?: 'Query', getAllDokters?: Array<{ __typename?: 'Dokter', id: number, nama: string, nomorTelepon: string, poliBagian: { __typename?: 'PoliBagian', id: number, nama: string, hargaPendaftaran: number } }> | null };

export type GetAllKunjunganPolisQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllKunjunganPolisQuery = { __typename?: 'Query', getAllKunjunganPolis?: Array<{ __typename?: 'KunjunganPoli', id: number, biayaPoli: string, hasilBagiDokter: string, hasilBagiPerawat: string, createdBy: string, updatedBy: string, createdAt: string, updatedAt: string, kunjungan?: { __typename?: 'Kunjungan', id: number, user: { __typename?: 'User', pasien?: { __typename?: 'Pasien', nama?: string | null } | null } } | null, poliBagian?: { __typename?: 'PoliBagian', id: number, nama: string } | null, dokter?: { __typename?: 'Dokter', id: number, nama: string } | null, perawat?: { __typename?: 'Perawat', id: number, nama: string } | null, penyakit?: { __typename?: 'Penyakit', id: number, nama: string, kode: string } | null, tindakan?: Array<{ __typename?: 'Tindakan', id: number, jumlah: number, harga: number, refTindakan: { __typename?: 'RefTindakan', id: number, nama: string, harga: number } }> | null, obat?: Array<{ __typename?: 'Obat', id: number, jumlah: number, refObat: { __typename?: 'RefObat', id: number, nama: string, harga: number } }> | null, bhp?: Array<{ __typename?: 'Bhp', id: number, jumlah: number, refBhp: { __typename?: 'RefBhp', id: number, nama: string, harga: number } }> | null }> | null };

export type GetAllPenyakitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPenyakitsQuery = { __typename?: 'Query', getAllPenyakits?: Array<{ __typename?: 'Penyakit', id: number, nama: string, kode: string, createdBy: string }> | null };

export type GetAllPerawatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPerawatsQuery = { __typename?: 'Query', getAllPerawats?: Array<{ __typename?: 'Perawat', id: number, nama: string, nomorTelepon: string, createdBy: string }> | null };

export type GetAllPoliBagiansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPoliBagiansQuery = { __typename?: 'Query', getAllPoliBagians?: Array<{ __typename?: 'PoliBagian', id: number, nama: string, hargaPendaftaran: number, createdBy: string, dokter: Array<{ __typename?: 'Dokter', nama: string, nomorTelepon: string }> }> | null };

export type GetAllRefBhpsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRefBhpsQuery = { __typename?: 'Query', getAllRefBhps?: Array<{ __typename?: 'RefBhp', id: number, nama: string, harga: number, createdBy: string }> | null };

export type GetAllRefObatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRefObatsQuery = { __typename?: 'Query', getAllRefObats?: Array<{ __typename?: 'RefObat', id: number, nama: string, harga: number, createdBy: string }> | null };

export type GetAllRefTindakansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRefTindakansQuery = { __typename?: 'Query', getAllRefTindakans?: Array<{ __typename?: 'RefTindakan', id: number, nama: string, harga: number, createdBy: string }> | null };

export type GetAllReservasisQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllReservasisQuery = { __typename?: 'Query', getAllReservasis?: Array<{ __typename?: 'Reservasi', id: number, tanggalRencanaDatang: string, nomorTelepon: string, statusPasien: string, createdBy: string, updatedBy: string, createdAt: string, updatedAt: string, poliBagianId: number, dokterId: number, user: { __typename?: 'User', email: string, username: string, pasien?: { __typename?: 'Pasien', nama?: string | null } | null }, kunjungan?: { __typename?: 'Kunjungan', id: number, tekananDarah: number, denyutNadi: number, usiaTahun: number, usiaBulan: number, usiaHari: number, createdBy: string, updatedBy: string, createdAt: string, updatedAt: string, userId: number, kunjunganPoli?: Array<{ __typename?: 'KunjunganPoli', biayaPoli: string, hasilBagiDokter: string, hasilBagiPerawat: string, poliBagian?: { __typename?: 'PoliBagian', nama: string } | null, obat?: Array<{ __typename?: 'Obat', harga: number, jumlah: number, refObat: { __typename?: 'RefObat', nama: string, harga: number } }> | null, tindakan?: Array<{ __typename?: 'Tindakan', harga: number, jumlah: number, bagiHasilDokter: number, bagiHasilPerawat: number, refTindakan: { __typename?: 'RefTindakan', nama: string, harga: number } }> | null, bhp?: Array<{ __typename?: 'Bhp', harga: number, jumlah: number, refBhp: { __typename?: 'RefBhp', nama: string, harga: number } }> | null }> | null } | null, poliBagian?: { __typename?: 'PoliBagian', id: number, nama: string, hargaPendaftaran: number } | null, dokter?: { __typename?: 'Dokter', id: number, nama: string, nomorTelepon: string } | null }> | null };

export type GetAllUserPasienQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserPasienQuery = { __typename?: 'Query', getAllUserPasien: Array<{ __typename?: 'User', id: number, username: string, email: string, pasien?: { __typename?: 'Pasien', id: number, nama?: string | null, nomorTelepon?: string | null, nik?: string | null, alamat?: string | null } | null }> };

export type GetKunjunganPolisByAdminPoliQueryVariables = Exact<{ [key: string]: never; }>;


export type GetKunjunganPolisByAdminPoliQuery = { __typename?: 'Query', getKunjunganPolisByAdminPoli?: Array<{ __typename?: 'KunjunganPoli', id: number, biayaPoli: string, hasilBagiDokter: string, hasilBagiPerawat: string, createdBy: string, updatedBy: string, createdAt: string, updatedAt: string, kunjungan?: { __typename?: 'Kunjungan', id: number, reservasiId: number, user: { __typename?: 'User', pasien?: { __typename?: 'Pasien', nama?: string | null } | null }, reservasi?: { __typename?: 'Reservasi', statusPasien: string } | null } | null, poliBagian?: { __typename?: 'PoliBagian', id: number, nama: string } | null, dokter?: { __typename?: 'Dokter', id: number, nama: string } | null, perawat?: { __typename?: 'Perawat', id: number, nama: string } | null, penyakit?: { __typename?: 'Penyakit', id: number, nama: string, kode: string } | null, tindakan?: Array<{ __typename?: 'Tindakan', id: number, jumlah: number, harga: number, refTindakan: { __typename?: 'RefTindakan', id: number, nama: string, harga: number } }> | null, obat?: Array<{ __typename?: 'Obat', id: number, jumlah: number, refObat: { __typename?: 'RefObat', id: number, nama: string, harga: number } }> | null, bhp?: Array<{ __typename?: 'Bhp', id: number, jumlah: number, refBhp: { __typename?: 'RefBhp', id: number, nama: string, harga: number } }> | null }> | null };

export type GetPoliBagianQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetPoliBagianQuery = { __typename?: 'Query', getPoliBagian?: { __typename?: 'PoliBagian', id: number, nama: string, hargaPendaftaran: number, dokter: Array<{ __typename?: 'Dokter', id: number, nama: string, nomorTelepon: string }> } | null };

export type GetReservasiQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetReservasiQuery = { __typename?: 'Query', getReservasi?: { __typename?: 'Reservasi', id: number, tanggalRencanaDatang: string, nomorTelepon: string, statusPasien: string, createdBy: string, updatedBy: string, createdAt: string, updatedAt: string, poliBagianId: number, dokterId: number, user: { __typename?: 'User', id: number, email: string, username: string, pasien?: { __typename?: 'Pasien', nama?: string | null, tanggalLahir?: any | null } | null }, dokter?: { __typename?: 'Dokter', id: number, nama: string, nomorTelepon: string } | null, kunjungan?: { __typename?: 'Kunjungan', id: number, tekananDarah: number, denyutNadi: number, usiaTahun: number, usiaBulan: number, usiaHari: number, createdBy: string, updatedBy: string, createdAt: string, updatedAt: string, userId: number, penyakit?: { __typename?: 'Penyakit', id: number, nama: string, kode: string } | null, kunjunganPoli?: Array<{ __typename?: 'KunjunganPoli', biayaPoli: string, hasilBagiDokter: string, hasilBagiPerawat: string, poliBagian?: { __typename?: 'PoliBagian', id: number, nama: string } | null, dokter?: { __typename?: 'Dokter', id: number, nama: string } | null, perawat?: { __typename?: 'Perawat', id: number, nama: string } | null, penyakit?: { __typename?: 'Penyakit', id: number, nama: string, kode: string } | null, bhp?: Array<{ __typename?: 'Bhp', id: number, jumlah: number, harga: number, refBhp: { __typename?: 'RefBhp', id: number, nama: string, harga: number } }> | null, tindakan?: Array<{ __typename?: 'Tindakan', id: number, jumlah: number, harga: number, bagiHasilDokter: number, bagiHasilPerawat: number, refTindakan: { __typename?: 'RefTindakan', id: number, nama: string, harga: number } }> | null, obat?: Array<{ __typename?: 'Obat', id: number, jumlah: number, harga: number, refObat: { __typename?: 'RefObat', id: number, nama: string, harga: number } }> | null }> | null } | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', username: string, id: number, role: string, email: string } | null };

export type MeWithAllDataQueryVariables = Exact<{ [key: string]: never; }>;


export type MeWithAllDataQuery = { __typename?: 'Query', meWithAllData?: { __typename?: 'User', id: number, username: string, email: string, role: string, poliBagianId?: number | null, poliBagian?: { __typename?: 'PoliBagian', id: number, nama: string } | null, pasien?: { __typename?: 'Pasien', id: number, noRm?: string | null, nama?: string | null, nomorTelepon?: string | null, nik?: string | null, alamat?: string | null, tempatLahir?: string | null, tanggalLahir?: any | null, rt?: string | null, rw?: string | null, idKelurahan?: string | null, idKecamatan?: string | null, idKabupatenKota?: string | null, idProvinsi?: string | null } | null, reservasi: Array<{ __typename?: 'Reservasi', id: number, updatedAt: string, tanggalRencanaDatang: string, nomorTelepon: string, statusPasien: string, poliBagian?: { __typename?: 'PoliBagian', id: number, nama: string } | null, dokter?: { __typename?: 'Dokter', id: number, nama: string, nomorTelepon: string } | null, kunjungan?: { __typename?: 'Kunjungan', id: number, tekananDarah: number, denyutNadi: number, penyakit?: { __typename?: 'Penyakit', id: number, nama: string } | null, kunjunganPoli?: Array<{ __typename?: 'KunjunganPoli', id: number, dokter?: { __typename?: 'Dokter', id: number, nama: string } | null, poliBagian?: { __typename?: 'PoliBagian', id: number, nama: string } | null }> | null } | null }>, kunjungan: Array<{ __typename?: 'Kunjungan', id: number }> } | null };

export type MeWithPasienDataQueryVariables = Exact<{ [key: string]: never; }>;


export type MeWithPasienDataQuery = { __typename?: 'Query', meWithPasienData?: { __typename?: 'User', id: number, username: string, email: string, role: string, pasien?: { __typename?: 'Pasien', id: number, noRm?: string | null, nama?: string | null, nomorTelepon?: string | null, nik?: string | null, alamat?: string | null, tempatLahir?: string | null, tanggalLahir?: any | null, rt?: string | null, rw?: string | null, idKelurahan?: string | null, idKecamatan?: string | null, idKabupatenKota?: string | null, idProvinsi?: string | null } | null } | null };


export const CreateBhpDocument = gql`
    mutation createBhp($input: BhpInput!) {
  createBhp(input: $input) {
    id
  }
}
    `;

export function useCreateBhpMutation() {
  return Urql.useMutation<CreateBhpMutation, CreateBhpMutationVariables>(CreateBhpDocument);
};
export const CreateConfigurationSettingDocument = gql`
    mutation createConfigurationSetting($input: ConfigurationSettingInput!) {
  createConfigurationSetting(input: $input) {
    id
    name
    value
  }
}
    `;

export function useCreateConfigurationSettingMutation() {
  return Urql.useMutation<CreateConfigurationSettingMutation, CreateConfigurationSettingMutationVariables>(CreateConfigurationSettingDocument);
};
export const CreateDokterDocument = gql`
    mutation createDokter($input: DokterInput!) {
  createDokter(input: $input) {
    id
    nama
    nomorTelepon
  }
}
    `;

export function useCreateDokterMutation() {
  return Urql.useMutation<CreateDokterMutation, CreateDokterMutationVariables>(CreateDokterDocument);
};
export const CreateKunjunganDocument = gql`
    mutation createKunjungan($input: KunjunganInput!) {
  createKunjungan(input: $input) {
    id
  }
}
    `;

export function useCreateKunjunganMutation() {
  return Urql.useMutation<CreateKunjunganMutation, CreateKunjunganMutationVariables>(CreateKunjunganDocument);
};
export const CreateKunjunganPoliDocument = gql`
    mutation createKunjunganPoli($input: KunjunganPoliInput!) {
  createKunjunganPoli(input: $input) {
    id
  }
}
    `;

export function useCreateKunjunganPoliMutation() {
  return Urql.useMutation<CreateKunjunganPoliMutation, CreateKunjunganPoliMutationVariables>(CreateKunjunganPoliDocument);
};
export const CreateObatDocument = gql`
    mutation createObat($input: ObatInput!) {
  createObat(input: $input) {
    id
  }
}
    `;

export function useCreateObatMutation() {
  return Urql.useMutation<CreateObatMutation, CreateObatMutationVariables>(CreateObatDocument);
};
export const CreatePenyakitDocument = gql`
    mutation createPenyakit($input: PenyakitInput!) {
  createPenyakit(input: $input) {
    id
  }
}
    `;

export function useCreatePenyakitMutation() {
  return Urql.useMutation<CreatePenyakitMutation, CreatePenyakitMutationVariables>(CreatePenyakitDocument);
};
export const CreatePerawatDocument = gql`
    mutation createPerawat($input: PerawatInput!) {
  createPerawat(input: $input) {
    id
  }
}
    `;

export function useCreatePerawatMutation() {
  return Urql.useMutation<CreatePerawatMutation, CreatePerawatMutationVariables>(CreatePerawatDocument);
};
export const CreatePoliBagianDocument = gql`
    mutation createPoliBagian($input: PoliBagianInput!) {
  createPoliBagian(input: $input) {
    id
  }
}
    `;

export function useCreatePoliBagianMutation() {
  return Urql.useMutation<CreatePoliBagianMutation, CreatePoliBagianMutationVariables>(CreatePoliBagianDocument);
};
export const CreateRefBhpDocument = gql`
    mutation createRefBhp($input: RefBhpInput!) {
  createRefBhp(input: $input) {
    id
  }
}
    `;

export function useCreateRefBhpMutation() {
  return Urql.useMutation<CreateRefBhpMutation, CreateRefBhpMutationVariables>(CreateRefBhpDocument);
};
export const CreateRefObatDocument = gql`
    mutation createRefObat($input: RefObatInput!) {
  createRefObat(input: $input) {
    id
  }
}
    `;

export function useCreateRefObatMutation() {
  return Urql.useMutation<CreateRefObatMutation, CreateRefObatMutationVariables>(CreateRefObatDocument);
};
export const CreateRefTindakanDocument = gql`
    mutation createRefTindakan($input: RefTindakanInput!) {
  createRefTindakan(input: $input) {
    id
  }
}
    `;

export function useCreateRefTindakanMutation() {
  return Urql.useMutation<CreateRefTindakanMutation, CreateRefTindakanMutationVariables>(CreateRefTindakanDocument);
};
export const CreateReservasiDocument = gql`
    mutation createReservasi($input: ReservasiInput!) {
  createReservasi(input: $input) {
    id
  }
}
    `;

export function useCreateReservasiMutation() {
  return Urql.useMutation<CreateReservasiMutation, CreateReservasiMutationVariables>(CreateReservasiDocument);
};
export const CreateTindakanDocument = gql`
    mutation createTindakan($input: TindakanInput!) {
  createTindakan(input: $input) {
    id
  }
}
    `;

export function useCreateTindakanMutation() {
  return Urql.useMutation<CreateTindakanMutation, CreateTindakanMutationVariables>(CreateTindakanDocument);
};
export const CreateUserPasienDocument = gql`
    mutation createUserPasien($input: PasienInput!) {
  createUserPasien(input: $input) {
    id
  }
}
    `;

export function useCreateUserPasienMutation() {
  return Urql.useMutation<CreateUserPasienMutation, CreateUserPasienMutationVariables>(CreateUserPasienDocument);
};
export const DeleteBhpDocument = gql`
    mutation deleteBhp($id: Int!) {
  deleteBhp(id: $id)
}
    `;

export function useDeleteBhpMutation() {
  return Urql.useMutation<DeleteBhpMutation, DeleteBhpMutationVariables>(DeleteBhpDocument);
};
export const DeleteObatDocument = gql`
    mutation deleteObat($id: Int!) {
  deleteObat(id: $id)
}
    `;

export function useDeleteObatMutation() {
  return Urql.useMutation<DeleteObatMutation, DeleteObatMutationVariables>(DeleteObatDocument);
};
export const DeleteRefObatDocument = gql`
    mutation deleteRefObat($id: Int!) {
  deleteRefObat(id: $id)
}
    `;

export function useDeleteRefObatMutation() {
  return Urql.useMutation<DeleteRefObatMutation, DeleteRefObatMutationVariables>(DeleteRefObatDocument);
};
export const DeleteRefTindakanDocument = gql`
    mutation deleteRefTindakan($id: Int!) {
  deleteRefTindakan(id: $id)
}
    `;

export function useDeleteRefTindakanMutation() {
  return Urql.useMutation<DeleteRefTindakanMutation, DeleteRefTindakanMutationVariables>(DeleteRefTindakanDocument);
};
export const DeleteRefBhpDocument = gql`
    mutation deleteRefBhp($id: Int!) {
  deleteRefBhp(id: $id)
}
    `;

export function useDeleteRefBhpMutation() {
  return Urql.useMutation<DeleteRefBhpMutation, DeleteRefBhpMutationVariables>(DeleteRefBhpDocument);
};
export const DeletePenyakitDocument = gql`
    mutation deletePenyakit($id: Int!) {
  deletePenyakit(id: $id)
}
    `;

export function useDeletePenyakitMutation() {
  return Urql.useMutation<DeletePenyakitMutation, DeletePenyakitMutationVariables>(DeletePenyakitDocument);
};
export const DeletePoliBagianDocument = gql`
    mutation deletePoliBagian($id: Int!) {
  deletePoliBagian(id: $id)
}
    `;

export function useDeletePoliBagianMutation() {
  return Urql.useMutation<DeletePoliBagianMutation, DeletePoliBagianMutationVariables>(DeletePoliBagianDocument);
};
export const DeleteTindakanDocument = gql`
    mutation deleteTindakan($id: Int!) {
  deleteTindakan(id: $id)
}
    `;

export function useDeleteTindakanMutation() {
  return Urql.useMutation<DeleteTindakanMutation, DeleteTindakanMutationVariables>(DeleteTindakanDocument);
};
export const InitiationSpecialRegisterDocument = gql`
    mutation initiationSpecialRegister {
  initiationSpecialRegister
}
    `;

export function useInitiationSpecialRegisterMutation() {
  return Urql.useMutation<InitiationSpecialRegisterMutation, InitiationSpecialRegisterMutationVariables>(InitiationSpecialRegisterDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameorEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameorEmail, password: $password) {
    user {
      id
      username
      role
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const ReadyReservasiDocument = gql`
    mutation readyReservasi($id: Int!) {
  readyReservasi(id: $id) {
    id
  }
}
    `;

export function useReadyReservasiMutation() {
  return Urql.useMutation<ReadyReservasiMutation, ReadyReservasiMutationVariables>(ReadyReservasiDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: UsernamePasswordInput!) {
  register(options: $input) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SpecialRegisterDocument = gql`
    mutation specialRegister($options: UsernamePasswordInput!, $role: String!) {
  specialRegister(options: $options, role: $role) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
    }
  }
}
    `;

export function useSpecialRegisterMutation() {
  return Urql.useMutation<SpecialRegisterMutation, SpecialRegisterMutationVariables>(SpecialRegisterDocument);
};
export const ToCanceledReservasiDocument = gql`
    mutation toCanceledReservasi($id: Int!) {
  toCanceledReservasi(id: $id) {
    id
  }
}
    `;

export function useToCanceledReservasiMutation() {
  return Urql.useMutation<ToCanceledReservasiMutation, ToCanceledReservasiMutationVariables>(ToCanceledReservasiDocument);
};
export const ToSuccessReservasiDocument = gql`
    mutation toSuccessReservasi($id: Int!) {
  toSuccessReservasi(id: $id) {
    id
  }
}
    `;

export function useToSuccessReservasiMutation() {
  return Urql.useMutation<ToSuccessReservasiMutation, ToSuccessReservasiMutationVariables>(ToSuccessReservasiDocument);
};
export const ToWaitingPaymentReservasiDocument = gql`
    mutation toWaitingPaymentReservasi($id: Int!) {
  toWaitingPaymentReservasi(id: $id) {
    id
  }
}
    `;

export function useToWaitingPaymentReservasiMutation() {
  return Urql.useMutation<ToWaitingPaymentReservasiMutation, ToWaitingPaymentReservasiMutationVariables>(ToWaitingPaymentReservasiDocument);
};
export const UpdateConfigurationSettingDocument = gql`
    mutation updateConfigurationSetting($input: ConfigurationSettingInput!, $id: Int!) {
  updateConfigurationSetting(input: $input, id: $id) {
    id
    name
    value
  }
}
    `;

export function useUpdateConfigurationSettingMutation() {
  return Urql.useMutation<UpdateConfigurationSettingMutation, UpdateConfigurationSettingMutationVariables>(UpdateConfigurationSettingDocument);
};
export const UpdateKunjunganDocument = gql`
    mutation updateKunjungan($id: Int!, $input: KunjunganInput!) {
  updateKunjungan(id: $id, input: $input) {
    id
  }
}
    `;

export function useUpdateKunjunganMutation() {
  return Urql.useMutation<UpdateKunjunganMutation, UpdateKunjunganMutationVariables>(UpdateKunjunganDocument);
};
export const UpdatePenyakitDocument = gql`
    mutation updatePenyakit($id: Int!, $input: PenyakitInput!) {
  updatePenyakit(id: $id, input: $input) {
    id
  }
}
    `;

export function useUpdatePenyakitMutation() {
  return Urql.useMutation<UpdatePenyakitMutation, UpdatePenyakitMutationVariables>(UpdatePenyakitDocument);
};
export const UpdatePoliBagianDocument = gql`
    mutation updatePoliBagian($id: Int!, $input: PoliBagianInput!) {
  updatePoliBagian(id: $id, input: $input) {
    id
  }
}
    `;

export function useUpdatePoliBagianMutation() {
  return Urql.useMutation<UpdatePoliBagianMutation, UpdatePoliBagianMutationVariables>(UpdatePoliBagianDocument);
};
export const UpdateRefBhpDocument = gql`
    mutation updateRefBhp($id: Int!, $input: RefBhpInput!) {
  updateRefBhp(id: $id, input: $input) {
    id
  }
}
    `;

export function useUpdateRefBhpMutation() {
  return Urql.useMutation<UpdateRefBhpMutation, UpdateRefBhpMutationVariables>(UpdateRefBhpDocument);
};
export const UpdateRefObatDocument = gql`
    mutation updateRefObat($id: Int!, $input: RefObatInput!) {
  updateRefObat(id: $id, input: $input) {
    id
  }
}
    `;

export function useUpdateRefObatMutation() {
  return Urql.useMutation<UpdateRefObatMutation, UpdateRefObatMutationVariables>(UpdateRefObatDocument);
};
export const UpdateRefTindakanDocument = gql`
    mutation updateRefTindakan($id: Int!, $input: RefTindakanInput!) {
  updateRefTindakan(id: $id, input: $input) {
    id
  }
}
    `;

export function useUpdateRefTindakanMutation() {
  return Urql.useMutation<UpdateRefTindakanMutation, UpdateRefTindakanMutationVariables>(UpdateRefTindakanDocument);
};
export const UpdateUserPasienDocument = gql`
    mutation updateUserPasien($input: PasienInput!, $id: Float!) {
  updateUserPasien(input: $input, id: $id) {
    id
  }
}
    `;

export function useUpdateUserPasienMutation() {
  return Urql.useMutation<UpdateUserPasienMutation, UpdateUserPasienMutationVariables>(UpdateUserPasienDocument);
};
export const ConfigurationSettingsDocument = gql`
    query configurationSettings {
  configurationSettings {
    id
    name
    value
  }
}
    `;

export function useConfigurationSettingsQuery(options: Omit<Urql.UseQueryArgs<ConfigurationSettingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ConfigurationSettingsQuery>({ query: ConfigurationSettingsDocument, ...options });
};
export const ConfigurationSettingsByNameDocument = gql`
    query configurationSettingsByName($keywords: String!) {
  configurationSettingsByName(keywords: $keywords) {
    id
    name
    value
  }
}
    `;

export function useConfigurationSettingsByNameQuery(options: Omit<Urql.UseQueryArgs<ConfigurationSettingsByNameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ConfigurationSettingsByNameQuery>({ query: ConfigurationSettingsByNameDocument, ...options });
};
export const GetAllDoktersDocument = gql`
    query getAllDokters {
  getAllDokters {
    id
    nama
    nomorTelepon
    poliBagian {
      id
      nama
      hargaPendaftaran
    }
  }
}
    `;

export function useGetAllDoktersQuery(options: Omit<Urql.UseQueryArgs<GetAllDoktersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllDoktersQuery>({ query: GetAllDoktersDocument, ...options });
};
export const GetAllKunjunganPolisDocument = gql`
    query getAllKunjunganPolis {
  getAllKunjunganPolis {
    id
    biayaPoli
    hasilBagiDokter
    hasilBagiPerawat
    createdBy
    updatedBy
    createdAt
    updatedAt
    kunjungan {
      id
      user {
        pasien {
          nama
        }
      }
    }
    poliBagian {
      id
      nama
    }
    dokter {
      id
      nama
    }
    perawat {
      id
      nama
    }
    penyakit {
      id
      nama
      kode
    }
    tindakan {
      id
      jumlah
      harga
      refTindakan {
        id
        nama
        harga
      }
    }
    obat {
      id
      jumlah
      refObat {
        id
        nama
        harga
      }
    }
    bhp {
      id
      jumlah
      refBhp {
        id
        nama
        harga
      }
    }
  }
}
    `;

export function useGetAllKunjunganPolisQuery(options: Omit<Urql.UseQueryArgs<GetAllKunjunganPolisQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllKunjunganPolisQuery>({ query: GetAllKunjunganPolisDocument, ...options });
};
export const GetAllPenyakitsDocument = gql`
    query getAllPenyakits {
  getAllPenyakits {
    id
    nama
    kode
    createdBy
  }
}
    `;

export function useGetAllPenyakitsQuery(options: Omit<Urql.UseQueryArgs<GetAllPenyakitsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllPenyakitsQuery>({ query: GetAllPenyakitsDocument, ...options });
};
export const GetAllPerawatsDocument = gql`
    query getAllPerawats {
  getAllPerawats {
    id
    nama
    nomorTelepon
    createdBy
  }
}
    `;

export function useGetAllPerawatsQuery(options: Omit<Urql.UseQueryArgs<GetAllPerawatsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllPerawatsQuery>({ query: GetAllPerawatsDocument, ...options });
};
export const GetAllPoliBagiansDocument = gql`
    query getAllPoliBagians {
  getAllPoliBagians {
    id
    nama
    hargaPendaftaran
    createdBy
    dokter {
      nama
      nomorTelepon
    }
  }
}
    `;

export function useGetAllPoliBagiansQuery(options: Omit<Urql.UseQueryArgs<GetAllPoliBagiansQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllPoliBagiansQuery>({ query: GetAllPoliBagiansDocument, ...options });
};
export const GetAllRefBhpsDocument = gql`
    query getAllRefBhps {
  getAllRefBhps {
    id
    nama
    harga
    createdBy
  }
}
    `;

export function useGetAllRefBhpsQuery(options: Omit<Urql.UseQueryArgs<GetAllRefBhpsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllRefBhpsQuery>({ query: GetAllRefBhpsDocument, ...options });
};
export const GetAllRefObatsDocument = gql`
    query getAllRefObats {
  getAllRefObats {
    id
    nama
    harga
    createdBy
  }
}
    `;

export function useGetAllRefObatsQuery(options: Omit<Urql.UseQueryArgs<GetAllRefObatsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllRefObatsQuery>({ query: GetAllRefObatsDocument, ...options });
};
export const GetAllRefTindakansDocument = gql`
    query getAllRefTindakans {
  getAllRefTindakans {
    id
    nama
    harga
    createdBy
  }
}
    `;

export function useGetAllRefTindakansQuery(options: Omit<Urql.UseQueryArgs<GetAllRefTindakansQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllRefTindakansQuery>({ query: GetAllRefTindakansDocument, ...options });
};
export const GetAllReservasisDocument = gql`
    query getAllReservasis {
  getAllReservasis {
    id
    tanggalRencanaDatang
    nomorTelepon
    statusPasien
    createdBy
    updatedBy
    createdAt
    updatedAt
    poliBagianId
    dokterId
    user {
      email
      username
      pasien {
        nama
      }
    }
    kunjungan {
      id
      tekananDarah
      denyutNadi
      usiaTahun
      usiaBulan
      usiaHari
      createdBy
      updatedBy
      createdAt
      updatedAt
      userId
      kunjunganPoli {
        biayaPoli
        hasilBagiDokter
        hasilBagiPerawat
        poliBagian {
          nama
        }
        obat {
          harga
          jumlah
          refObat {
            nama
            harga
          }
        }
        tindakan {
          harga
          jumlah
          bagiHasilDokter
          bagiHasilPerawat
          refTindakan {
            nama
            harga
          }
        }
        bhp {
          harga
          jumlah
          refBhp {
            nama
            harga
          }
        }
      }
    }
    poliBagian {
      id
      nama
      hargaPendaftaran
    }
    dokter {
      id
      nama
      nomorTelepon
    }
  }
}
    `;

export function useGetAllReservasisQuery(options: Omit<Urql.UseQueryArgs<GetAllReservasisQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllReservasisQuery>({ query: GetAllReservasisDocument, ...options });
};
export const GetAllUserPasienDocument = gql`
    query getAllUserPasien {
  getAllUserPasien {
    id
    username
    email
    pasien {
      id
      nama
      nomorTelepon
      nik
      alamat
    }
  }
}
    `;

export function useGetAllUserPasienQuery(options: Omit<Urql.UseQueryArgs<GetAllUserPasienQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllUserPasienQuery>({ query: GetAllUserPasienDocument, ...options });
};
export const GetKunjunganPolisByAdminPoliDocument = gql`
    query getKunjunganPolisByAdminPoli {
  getKunjunganPolisByAdminPoli {
    id
    biayaPoli
    hasilBagiDokter
    hasilBagiPerawat
    createdBy
    updatedBy
    createdAt
    updatedAt
    kunjungan {
      id
      user {
        pasien {
          nama
        }
      }
      reservasiId
      reservasi {
        statusPasien
      }
    }
    poliBagian {
      id
      nama
    }
    dokter {
      id
      nama
    }
    perawat {
      id
      nama
    }
    penyakit {
      id
      nama
      kode
    }
    tindakan {
      id
      jumlah
      harga
      refTindakan {
        id
        nama
        harga
      }
    }
    obat {
      id
      jumlah
      refObat {
        id
        nama
        harga
      }
    }
    bhp {
      id
      jumlah
      refBhp {
        id
        nama
        harga
      }
    }
  }
}
    `;

export function useGetKunjunganPolisByAdminPoliQuery(options: Omit<Urql.UseQueryArgs<GetKunjunganPolisByAdminPoliQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetKunjunganPolisByAdminPoliQuery>({ query: GetKunjunganPolisByAdminPoliDocument, ...options });
};
export const GetPoliBagianDocument = gql`
    query getPoliBagian($id: Int!) {
  getPoliBagian(id: $id) {
    id
    nama
    hargaPendaftaran
    dokter {
      id
      nama
      nomorTelepon
    }
  }
}
    `;

export function useGetPoliBagianQuery(options: Omit<Urql.UseQueryArgs<GetPoliBagianQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPoliBagianQuery>({ query: GetPoliBagianDocument, ...options });
};
export const GetReservasiDocument = gql`
    query getReservasi($id: Int!) {
  getReservasi(id: $id) {
    id
    tanggalRencanaDatang
    nomorTelepon
    statusPasien
    createdBy
    updatedBy
    createdAt
    updatedAt
    poliBagianId
    dokterId
    user {
      id
      email
      username
      pasien {
        nama
        tanggalLahir
      }
    }
    dokter {
      id
      nama
      nomorTelepon
    }
    kunjungan {
      id
      tekananDarah
      denyutNadi
      usiaTahun
      usiaBulan
      usiaHari
      createdBy
      updatedBy
      createdAt
      updatedAt
      userId
      penyakit {
        id
        nama
        kode
      }
      kunjunganPoli {
        biayaPoli
        hasilBagiDokter
        hasilBagiPerawat
        poliBagian {
          id
          nama
        }
        dokter {
          id
          nama
        }
        perawat {
          id
          nama
        }
        penyakit {
          id
          nama
          kode
        }
        bhp {
          id
          jumlah
          harga
          refBhp {
            id
            nama
            harga
          }
        }
        tindakan {
          id
          jumlah
          harga
          bagiHasilDokter
          bagiHasilPerawat
          refTindakan {
            id
            nama
            harga
          }
        }
        obat {
          id
          jumlah
          harga
          refObat {
            id
            nama
            harga
          }
        }
      }
    }
  }
}
    `;

export function useGetReservasiQuery(options: Omit<Urql.UseQueryArgs<GetReservasiQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetReservasiQuery>({ query: GetReservasiDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    username
    id
    role
    email
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MeWithAllDataDocument = gql`
    query meWithAllData {
  meWithAllData {
    id
    username
    email
    role
    poliBagianId
    poliBagian {
      id
      nama
    }
    pasien {
      id
      noRm
      nama
      nomorTelepon
      nik
      alamat
      tempatLahir
      tanggalLahir
      rt
      rw
      idKelurahan
      idKecamatan
      idKabupatenKota
      idProvinsi
    }
    reservasi {
      id
      updatedAt
      tanggalRencanaDatang
      nomorTelepon
      statusPasien
      poliBagian {
        id
        nama
      }
      dokter {
        id
        nama
        nomorTelepon
      }
      kunjungan {
        id
        tekananDarah
        denyutNadi
        penyakit {
          id
          nama
        }
        kunjunganPoli {
          id
          dokter {
            id
            nama
          }
          poliBagian {
            id
            nama
          }
        }
      }
    }
    kunjungan {
      id
    }
  }
}
    `;

export function useMeWithAllDataQuery(options: Omit<Urql.UseQueryArgs<MeWithAllDataQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeWithAllDataQuery>({ query: MeWithAllDataDocument, ...options });
};
export const MeWithPasienDataDocument = gql`
    query meWithPasienData {
  meWithPasienData {
    id
    username
    email
    role
    pasien {
      id
      noRm
      nama
      nomorTelepon
      nik
      alamat
      tempatLahir
      tanggalLahir
      rt
      rw
      idKelurahan
      idKecamatan
      idKabupatenKota
      idProvinsi
    }
  }
}
    `;

export function useMeWithPasienDataQuery(options: Omit<Urql.UseQueryArgs<MeWithPasienDataQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeWithPasienDataQuery>({ query: MeWithPasienDataDocument, ...options });
};