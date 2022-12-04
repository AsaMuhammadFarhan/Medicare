import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { withUrqlClient } from "next-urql";
import { useEffect, useState } from "react";
import Iconify from "../../../components/Iconify";
import LayoutAdmin from "../../../components/LayoutGeneral";
import {
  useCreateKunjunganMutation,
  useGetAllPenyakitsQuery,
  useGetReservasiQuery,
  useUpdateKunjunganMutation,
  useCreateKunjunganPoliMutation,
  useGetAllPoliBagiansQuery,
  useConfigurationSettingsByNameQuery,
  useGetAllDoktersQuery,
  useGetAllPerawatsQuery,
} from "../../../generated/graphql";
import themeColor from "../../../utils/color";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { numberWithSeparator } from "../../../utils/format";
import { getRouterQuery } from "../../../utils/getRouterQuery";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { reservasiId } = context.query;
  return {
    props: {
      reservasiId,
    },
  };
};

const AdminReservasiDetailPage = ({ reservasiId }: any) => {

  const id = getRouterQuery(reservasiId);

  const modalUpdateKunjungan = useDisclosure();
  const modalTambahKunjunganPoli = useDisclosure();

  // Kunjungan
  const [tekananDarah, setTekananDarah] = useState("0");
  const [denyutNadi, setDenyutNadi] = useState("0");
  const [usiaTahun, setUsiaTahun] = useState("0");
  const [usiaBulan, setUsiaBulan] = useState("0");
  const [usiaHari, setUsiaHari] = useState("0");
  const [penyakitId, setPenyakitId] = useState("0");
  // --

  const [reservasi] = useGetReservasiQuery({
    variables: {
      id,
    }
  });
  const [penyakits] = useGetAllPenyakitsQuery();
  const [poliBagians] = useGetAllPoliBagiansQuery();
  const [dokters] = useGetAllDoktersQuery();
  const [perawat] = useGetAllPerawatsQuery();
  const [configuration] = useConfigurationSettingsByNameQuery({
    variables: {
      keywords: "bagi-hasil"
    }
  });
  const persentaseDokter = configuration.data?.configurationSettingsByName
    .find((conf) => conf.name.includes("dokter"))?.value ?? "0";
  const persentasePerawat = configuration.data?.configurationSettingsByName
    .find((conf) => conf.name.includes("perawat"))?.value ?? "0";
  const [, createKunjungan] = useCreateKunjunganMutation();
  const [, updateKunjungan] = useUpdateKunjunganMutation();
  const [, createKunjunganpoli] = useCreateKunjunganPoliMutation();

  useEffect(() => {
    if (reservasi.data?.getReservasi?.kunjungan?.id) {
      setTekananDarah(reservasi.data.getReservasi.kunjungan.tekananDarah.toString() ?? "0")
      setDenyutNadi(reservasi.data.getReservasi.kunjungan.denyutNadi.toString() ?? "0")
      setUsiaTahun(reservasi.data.getReservasi.kunjungan.usiaTahun.toString() ?? "0")
      setUsiaBulan(reservasi.data.getReservasi.kunjungan.usiaBulan.toString() ?? "0")
      setUsiaHari(reservasi.data.getReservasi.kunjungan.usiaHari.toString() ?? "0")
      setPenyakitId(reservasi.data.getReservasi.kunjungan.penyakit?.id.toString() ?? "0")
    }
  }, [reservasi.fetching]);

  const isLoaded = reservasi.fetching === false;

  // Kunjungan Poli
  const [biayaPoli, setbiayaPoli] = useState("");
  const [hasilBagiDokter, sethasilBagiDokter] = useState("");
  const [hasilBagiPerawat, sethasilBagiPerawat] = useState("");
  const [poliBagianId, setpoliBagianId] = useState("");
  const [dokterId, setdokterId] = useState("");
  const [perawatId, setperawatId] = useState("");
  const [penyakitPoliId, setpenyakitPoliId] = useState("");

  const openKunjunganPoli = () => {
    modalTambahKunjunganPoli.onOpen();
    setbiayaPoli(`${poliBagians.data?.getAllPoliBagians?.find((pb) =>
      pb.id === reservasi.data?.getReservasi?.poliBagianId
    )?.hargaPendaftaran ?? 0}`);
    sethasilBagiDokter(
      `${parseInt(persentaseDokter) * (poliBagians.data?.getAllPoliBagians?.find((pb) =>
        pb.id === reservasi.data?.getReservasi?.poliBagianId
      )?.hargaPendaftaran ?? 0) / 100}`
    );
    sethasilBagiPerawat(
      `${parseInt(persentasePerawat) * (poliBagians.data?.getAllPoliBagians?.find((pb) =>
        pb.id === reservasi.data?.getReservasi?.poliBagianId
      )?.hargaPendaftaran ?? 0) / 100}`
    )
    setpoliBagianId(reservasi.data?.getReservasi?.poliBagianId.toString() ?? "")
    setdokterId(reservasi.data?.getReservasi?.dokterId.toString() ?? "")
    setpenyakitPoliId(reservasi.data?.getReservasi?.kunjungan?.penyakit?.id.toString() ?? "");
  };
  // --

  const now = new Date();
  const tanggalLahir = new Date(reservasi.data?.getReservasi?.user.pasien?.tanggalLahir);
  const diffDate = now.getDate() - tanggalLahir.getDate();
  const diffMonth = diffDate < 0
    ? now.getMonth() - tanggalLahir.getMonth() - 1
    : now.getMonth() - tanggalLahir.getMonth();
  const diffYear = diffMonth < 0
    ? now.getFullYear() - tanggalLahir.getFullYear() - 1
    : now.getFullYear() - tanggalLahir.getFullYear();

  const handleClickSimpan = () => {
    if (!reservasi.data?.getReservasi?.kunjungan?.id) {
      createKunjungan({
        input: {
          tekananDarah: parseInt(tekananDarah),
          denyutNadi: parseInt(denyutNadi),
          usiaTahun: parseInt(usiaTahun),
          usiaBulan: parseInt(usiaBulan),
          usiaHari: parseInt(usiaHari),
          createdBy: "Admin",
          updatedBy: "",
          userId: reservasi.data?.getReservasi?.user.id ?? -1,
          reservasiId: id,
          penyakitId: parseInt(penyakitId),
        }
      }).then((result) => {
        if (result.error) {
          alert(result.error.message);
          return;
        }
        modalUpdateKunjungan.onClose();
      });
    } else {
      updateKunjungan({
        id: reservasi.data.getReservasi.kunjungan.id,
        input: {
          tekananDarah: parseInt(tekananDarah),
          denyutNadi: parseInt(denyutNadi),
          usiaTahun: parseInt(usiaTahun),
          usiaBulan: parseInt(usiaBulan),
          usiaHari: parseInt(usiaHari),
          createdBy: reservasi.data.getReservasi.kunjungan.createdBy,
          updatedBy: "Admin",
          userId: reservasi.data?.getReservasi?.user.id ?? -1,
          reservasiId: id,
          penyakitId: parseInt(penyakitId),
        }
      }).then((result) => {
        if (result.error) {
          alert(result.error.message);
          return;
        }
        modalUpdateKunjungan.onClose();
      });
    }
  };

  const handleClickTambahKunjunganPoli = () => {
    createKunjunganpoli({
      input: {
        biayaPoli,
        hasilBagiDokter,
        hasilBagiPerawat,
        createdBy: "Admin",
        updatedBy: "",
        poliBagianId: parseInt(poliBagianId),
        dokterId: parseInt(dokterId),
        perawatId: parseInt(perawatId),
        penyakitId: parseInt(penyakitPoliId),
        kunjunganId: reservasi.data?.getReservasi?.kunjungan?.id ?? -1,
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
        return;
      }
      modalTambahKunjunganPoli.onClose();

    })
  }

  return (
    <LayoutAdmin metaTitle="Reservasi">
      <Stack spacing="32px" w="100%">
        <Skeleton isLoaded={isLoaded}>
          <Text>
            Detail Reservasi #{reservasi.data?.getReservasi?.id}
          </Text>
        </Skeleton>
        <Stack spacing="16px">
          <Skeleton isLoaded={isLoaded}>
            <Flex justify="space-between">
              <Text fontWeight={600} fontSize="20px">
                Kunjungan Pasien {reservasi.data?.getReservasi?.user.pasien?.nama}
              </Text>
              <Button
                onClick={modalUpdateKunjungan.onOpen}
                colorScheme="blue"
              >
                Perbarui Data Kunjungan
              </Button>
            </Flex>
          </Skeleton>
          <Skeleton isLoaded={isLoaded}>
            <SimpleGrid columns={2} rowGap="4px" columnGap="16px">
              <Flex justify="space-between">
                <Text>Penyakit</Text>
                <Text>:</Text>
              </Flex>
              <Text>{reservasi.data?.getReservasi?.kunjungan?.penyakit?.nama ?? "-"}</Text>
              <Flex justify="space-between">
                <Text>Tekanan Darah</Text>
                <Text>:</Text>
              </Flex>
              <Text>{reservasi.data?.getReservasi?.kunjungan?.tekananDarah ?? "-"}</Text>
              <Flex justify="space-between">
                <Text>Denyut Nadi</Text>
                <Text>:</Text>
              </Flex>
              <Text>{reservasi.data?.getReservasi?.kunjungan?.denyutNadi ?? "-"}</Text>
              <Flex justify="space-between">
                <Text>Usia</Text>
                <Text>:</Text>
              </Flex>
              <Text>
                {(reservasi.data?.getReservasi?.kunjungan?.usiaTahun ?? 0) > 0
                  ? reservasi.data?.getReservasi?.kunjungan?.usiaTahun + " Tahun "
                  : "-"
                }
                {(reservasi.data?.getReservasi?.kunjungan?.usiaBulan ?? 0) > 0
                  ? reservasi.data?.getReservasi?.kunjungan?.usiaBulan + " Bulan "
                  : ""
                }
                {(reservasi.data?.getReservasi?.kunjungan?.usiaHari ?? 0) > 0
                  ? reservasi.data?.getReservasi?.kunjungan?.usiaHari + " Hari"
                  : ""
                }
              </Text>
            </SimpleGrid>
          </Skeleton>
        </Stack>
        <Stack spacing="16px">
          <Skeleton isLoaded={isLoaded}>
            <Text fontWeight={600} fontSize="20px">
              Kunjungan Poli
            </Text>
          </Skeleton>
          {reservasi.data?.getReservasi?.kunjungan?.id ? (
            <Flex direction="column">
              <Table borderRadius="8px" overflow="hidden" boxShadow="md" mb="8px">
                <Thead>
                  <Tr bgColor={themeColor.chakraBlue6}>
                    <Th color="white">
                      Poli
                    </Th>
                    <Th />
                  </Tr>
                </Thead>
                <Tbody>
                  {reservasi.data.getReservasi.kunjungan.kunjunganPoli?.map((kunpol) => (
                    <Tr>
                      <Td>{kunpol.poliBagian?.nama} ({kunpol.dokter?.nama})</Td>
                      <Td>Delete/Update</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Flex justify="end">
                <Button
                  onClick={() => openKunjunganPoli()}
                  colorScheme="blue"
                  w="fit-content"
                >
                  Tambah Kunjungan Poli
                </Button>
              </Flex>
            </Flex>
          ) : (
            <Text fontSize="12px">update data kunjungan dahulu!</Text>
          )}
        </Stack>
      </Stack>

      {/* Modal Update Kunjungan */}
      <Modal isOpen={modalUpdateKunjungan.isOpen} onClose={modalUpdateKunjungan.onClose}>
        <ModalOverlay />
        <ModalContent minW={["", "600px", "800px"]}>
          <ModalHeader>Update Kunjungan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Stack>
                <Text fontSize="12px">Tekanan Darah</Text>
                <Input
                  onChange={(e) => setTekananDarah(e.target.value)}
                  onWheel={(e) => e.currentTarget.blur()}
                  placeholder="Tekanan darah"
                  value={tekananDarah}
                  type="number"
                />
              </Stack>
              <Stack>
                <Text fontSize="12px">Denyut Nadi</Text>
                <Input
                  onChange={(e) => setDenyutNadi(e.target.value)}
                  onWheel={(e) => e.currentTarget.blur()}
                  placeholder="Denyut nadi"
                  value={denyutNadi}
                  type="number"
                />
              </Stack>
              <Flex direction="column">
                <SimpleGrid columns={3} gap="16px">
                  <Stack>
                    <Text fontSize="12px">Usia Tahun</Text>
                    <Input
                      onChange={(e) => setUsiaTahun(e.target.value)}
                      onWheel={(e) => e.currentTarget.blur()}
                      placeholder="Usia tahun"
                      value={usiaTahun}
                      type="number"
                    />
                  </Stack>
                  <Stack>
                    <Text fontSize="12px">Usia Bulan</Text>
                    <Input
                      onChange={(e) => setUsiaBulan(e.target.value)}
                      onWheel={(e) => e.currentTarget.blur()}
                      placeholder="Usia bulan"
                      value={usiaBulan}
                      type="number"
                    />
                  </Stack>
                  <Stack>
                    <Text fontSize="12px">Usia Hari</Text>
                    <Input
                      onChange={(e) => setUsiaHari(e.target.value)}
                      onWheel={(e) => e.currentTarget.blur()}
                      placeholder="Usia hari"
                      value={usiaHari}
                      type="number"
                    />
                  </Stack>
                </SimpleGrid>
                <Flex alignItems="center">
                  <Iconify mr="4px" boxSize="12px" icon="bx:info-circle" />
                  <Text fontSize="12px">
                    Usia berdasarkan tanggal lahir {diffYear} tahun {diffMonth
                    } bulan {diffDate < 0 ? 30 - diffDate : diffDate} hari
                  </Text>
                </Flex>
              </Flex>
              <Stack>
                <Text fontSize="12px">Penyakit</Text>
                <Select
                  onChange={(e) => setPenyakitId(e.target.value)}
                  placeholder="Pilih penyakit"
                  value={penyakitId}
                >
                  {penyakits.data?.getAllPenyakits?.map((penyakit) => (
                    <option value={penyakit.id}>{penyakit.nama} &nbsp;&nbsp; {penyakit.kode}</option>
                  ))}
                </Select>
              </Stack>

              <Button
                onClick={handleClickSimpan}
                colorScheme="blue"
                justifySelf="end"
              >
                Simpan
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter pb="0px"></ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Tambah Kunjungan Poli */}
      <Modal isOpen={modalTambahKunjunganPoli.isOpen} onClose={modalTambahKunjunganPoli.onClose}>
        <ModalOverlay />
        <ModalContent minW={["", "600px", "800px"]}>
          <ModalHeader>Tambah Kunjungan Poli</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              <Stack>
                <Text fontSize="12px">Poli Bagian</Text>
                <Select
                  onChange={(e) => setpoliBagianId(e.target.value)}
                  placeholder="Pilih poli"
                  value={poliBagianId}
                >
                  {poliBagians.data?.getAllPoliBagians?.map((poli) => (
                    <option value={poli.id}>{poli.nama}</option>
                  ))}
                </Select>
              </Stack>
              <Stack>
                <Text fontSize="12px">Dokter</Text>
                <Select
                  onChange={(e) => setdokterId(e.target.value)}
                  isDisabled={poliBagianId === ""}
                  placeholder="Pilih dokter"
                  value={dokterId}
                >
                  {dokters.data?.getAllDokters?.filter((dok) => dok.poliBagian.id === parseInt(poliBagianId)).map((dokter) => (
                    <option value={dokter.id}>{dokter.nama}</option>
                  ))}
                </Select>
              </Stack>
              <Stack>
                <Text fontSize="12px">Perawat</Text>
                <Select
                  onChange={(e) => setperawatId(e.target.value)}
                  isInvalid={perawatId === ""}
                  placeholder="Pilih perawat"
                  value={perawatId}
                >
                  {perawat.data?.getAllPerawats?.map((perawat) => (
                    <option value={perawat.id}>{perawat.nama}</option>
                  ))}
                </Select>
              </Stack>
              <Stack>
                <Text fontSize="12px">Penyakit</Text>
                <Select
                  onChange={(e) => setpenyakitPoliId(e.target.value)}
                  placeholder="Pilih Penyakit"
                  value={penyakitPoliId}
                >
                  {penyakits.data?.getAllPenyakits?.map((penyakit) => (
                    <option value={penyakit.id}>{penyakit.nama} &nbsp;&nbsp; {penyakit.kode}</option>
                  ))}
                </Select>
              </Stack>
              <Stack>
                <Text fontSize="12px">Biaya Poli</Text>
                <Input
                  onChange={(e) => setbiayaPoli(e.target.value)}
                  onWheel={(e) => e.currentTarget.blur()}
                  placeholder="Biaya poli"
                  value={biayaPoli}
                  type="number"
                />
                {poliBagians.data?.getAllPoliBagians?.find((pb) =>
                  pb.id === reservasi.data?.getReservasi?.poliBagianId
                )?.hargaPendaftaran && (
                    <Flex alignItems="center">
                      <Iconify mr="4px" boxSize="12px" icon="bx:info-circle" />
                      <Text fontSize="12px">
                        Poli {poliBagians.data?.getAllPoliBagians?.find((pb) =>
                          pb.id === reservasi.data?.getReservasi?.poliBagianId
                        )?.nama} memiliki harga pendaftaran Rp{numberWithSeparator(
                          poliBagians.data?.getAllPoliBagians?.find((pb) =>
                            pb.id === reservasi.data?.getReservasi?.poliBagianId
                          )?.hargaPendaftaran ?? 0)}
                      </Text>
                    </Flex>
                  )}
              </Stack>
              <Stack>
                <Text fontSize="12px">Hasil Bagi Dokter</Text>
                <Input
                  onChange={(e) => sethasilBagiDokter(e.target.value)}
                  onWheel={(e) => e.currentTarget.blur()}
                  placeholder="Hasil bagi dokter"
                  value={hasilBagiDokter}
                  type="number"
                />
                <Flex alignItems="center">
                  <Iconify mr="4px" boxSize="12px" icon="bx:info-circle" />
                  <Text fontSize="12px">
                    Konfigurasi Hasil Bagi Dokter: {persentaseDokter}%. ({persentaseDokter
                    }% * {biayaPoli} = {parseInt(persentaseDokter) * parseInt(biayaPoli) / 100})
                  </Text>
                </Flex>
              </Stack>
              <Stack>
                <Text fontSize="12px">Hasil Bagi Perawat</Text>
                <Input
                  onChange={(e) => sethasilBagiPerawat(e.target.value)}
                  onWheel={(e) => e.currentTarget.blur()}
                  placeholder="Hasil bagi perawat"
                  value={hasilBagiPerawat}
                  type="number"
                />
                <Flex alignItems="center">
                  <Iconify mr="4px" boxSize="12px" icon="bx:info-circle" />
                  <Text fontSize="12px">
                    Konfigurasi Hasil Bagi Perawat: {persentasePerawat}%. ({persentasePerawat
                    }% * {biayaPoli} = {parseInt(persentasePerawat) * parseInt(biayaPoli) / 100})
                  </Text>
                </Flex>
              </Stack>

              <Button
                onClick={handleClickTambahKunjunganPoli}
                colorScheme="blue"
                justifySelf="end"
              >
                Tambah
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter pb="0px"></ModalFooter>
        </ModalContent>
      </Modal>
    </LayoutAdmin>
  )
};

export default withUrqlClient(createUrqlClient)(AdminReservasiDetailPage);