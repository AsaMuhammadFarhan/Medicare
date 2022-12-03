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
  refBhp: RefBhp;
  refBhpId: Scalars['Float'];
  updatedAt: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type BhpInput = {
  createdBy: Scalars['String'];
  harga: Scalars['Float'];
  jumlah: Scalars['Float'];
  refBhpId: Scalars['Float'];
  updatedBy: Scalars['String'];
};

export type ConfigurationSettingInput = {
  name: Scalars['String'];
  updateBy: Scalars['String'];
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
  deleteBhp: Bhp;
  deleteConfigurationSetting: ConfigurationSettings;
  deleteDokter: Dokter;
  deleteKunjungan: Kunjungan;
  deleteKunjunganPoli: KunjunganPoli;
  deleteObat: Obat;
  deletePenyakit: Penyakit;
  deletePerawat: Perawat;
  deletePoliBagian: PoliBagian;
  deleteRefBhp: RefBhp;
  deleteRefObat: RefObat;
  deleteRefTindakan: RefTindakan;
  deleteReservasi: Reservasi;
  deleteTindakan: Tindakan;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
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


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
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
  getKunjungans?: Maybe<Array<Kunjungan>>;
  getObat?: Maybe<Obat>;
  getPenyakits?: Maybe<Array<Penyakit>>;
  getPerawat?: Maybe<Perawat>;
  getPerawats?: Maybe<Array<Perawat>>;
  getPoliBagians?: Maybe<Array<PoliBagian>>;
  getRefBhps?: Maybe<Array<RefBhp>>;
  getRefObats?: Maybe<Array<RefObat>>;
  getRefTindakans?: Maybe<Array<RefTindakan>>;
  getReservasi?: Maybe<Reservasi>;
  getTindakan?: Maybe<Tindakan>;
  getUserPasien?: Maybe<Pasien>;
  getUserbyId?: Maybe<User>;
  me?: Maybe<User>;
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
};

export type ReservasiInput = {
  createdBy: Scalars['String'];
  dokterId: Scalars['Float'];
  nomorTelepon?: InputMaybe<Scalars['String']>;
  poliBagianId: Scalars['Float'];
  statusPasien?: InputMaybe<Scalars['String']>;
  tanggalRencanaDatang?: InputMaybe<Scalars['DateTime']>;
  updatedBy: Scalars['String'];
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

export type CreateUserPasienMutationVariables = Exact<{
  input: PasienInput;
}>;


export type CreateUserPasienMutation = { __typename?: 'Mutation', createUserPasien: { __typename?: 'Pasien', id: number } };

export type LoginMutationVariables = Exact<{
  usernameorEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, username: string, role: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string } | null } };

export type UpdateUserPasienMutationVariables = Exact<{
  input: PasienInput;
  id: Scalars['Float'];
}>;


export type UpdateUserPasienMutation = { __typename?: 'Mutation', updateUserPasien: { __typename?: 'Pasien', id: number } };

export type GetAllDoktersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDoktersQuery = { __typename?: 'Query', getAllDokters?: Array<{ __typename?: 'Dokter', id: number, nama: string, nomorTelepon: string, poliBagian: { __typename?: 'PoliBagian', id: number, nama: string, hargaPendaftaran: number } }> | null };

export type GetAllPoliBagiansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPoliBagiansQuery = { __typename?: 'Query', getAllPoliBagians?: Array<{ __typename?: 'PoliBagian', id: number, nama: string, hargaPendaftaran: number, dokter: Array<{ __typename?: 'Dokter', id: number, nama: string }> }> | null };

export type GetAllRefBhpsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRefBhpsQuery = { __typename?: 'Query', getAllRefBhps?: Array<{ __typename?: 'RefBhp', id: number, nama: string, harga: number }> | null };

export type GetAllRefObatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRefObatsQuery = { __typename?: 'Query', getAllRefObats?: Array<{ __typename?: 'RefObat', id: number, nama: string, harga: number }> | null };

export type GetAllRefTindakansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRefTindakansQuery = { __typename?: 'Query', getAllRefTindakans?: Array<{ __typename?: 'RefTindakan', id: number, nama: string, harga: number }> | null };

export type GetAllReservasisQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllReservasisQuery = { __typename?: 'Query', getAllReservasis?: Array<{ __typename?: 'Reservasi', id: number, tanggalRencanaDatang: string, nomorTelepon: string, statusPasien: string, createdBy: string, updatedBy: string, createdAt: string, updatedAt: string, poliBagianId: number, dokterId: number, user: { __typename?: 'User', email: string, username: string, pasien?: { __typename?: 'Pasien', nama?: string | null } | null }, kunjungan?: { __typename?: 'Kunjungan', id: number, tekananDarah: number, denyutNadi: number, usiaTahun: number, usiaBulan: number, usiaHari: number, createdBy: string, updatedBy: string, createdAt: string, updatedAt: string, userId: number } | null, poliBagian?: { __typename?: 'PoliBagian', id: number, nama: string, hargaPendaftaran: number } | null, dokter?: { __typename?: 'Dokter', id: number, nama: string, nomorTelepon: string } | null }> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', username: string, id: number, role: string, email: string } | null };

export type MeWithPasienDataQueryVariables = Exact<{ [key: string]: never; }>;


export type MeWithPasienDataQuery = { __typename?: 'Query', meWithPasienData?: { __typename?: 'User', id: number, username: string, email: string, role: string, pasien?: { __typename?: 'Pasien', id: number, noRm?: string | null, nama?: string | null, nik?: string | null, alamat?: string | null, tempatLahir?: string | null, tanggalLahir?: any | null, rt?: string | null, rw?: string | null, idKelurahan?: string | null, idKecamatan?: string | null, idKabupatenKota?: string | null, idProvinsi?: string | null } | null } | null };


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
export const GetAllPoliBagiansDocument = gql`
    query getAllPoliBagians {
  getAllPoliBagians {
    id
    nama
    hargaPendaftaran
    dokter {
      id
      nama
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