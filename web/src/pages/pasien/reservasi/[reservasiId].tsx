import { Box, Flex, SimpleGrid, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { withUrqlClient } from "next-urql";
import { LayoutPasien } from "../../../components/LayoutGeneral";
import {
  useGetReservasiQuery,
} from "../../../generated/graphql";
import themeColor from "../../../utils/color";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { dateFormatWithoutDay, numberWithSeparator } from "../../../utils/format";
import { getRouterQuery } from "../../../utils/getRouterQuery";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { reservasiId } = context.query;
  return {
    props: {
      reservasiId,
    },
  };
};

const PasienReservasiDetailPage = ({ reservasiId }: any) => {

  const id = getRouterQuery(reservasiId);

  const [reservasi] = useGetReservasiQuery({
    variables: {
      id,
    }
  });

  const displayedReservasi = reservasi.data?.getReservasi;
  const getTotalPrice = (reservasi: typeof displayedReservasi) => {
    let totalPrice = 0;
    let bagiHasilDokter = 0;
    let bagiHasilPerawat = 0;
    if (reservasi?.kunjungan?.kunjunganPoli) {
      reservasi.kunjungan.kunjunganPoli.forEach((kp) => {
        totalPrice = totalPrice + parseInt(kp.biayaPoli);
        bagiHasilDokter = bagiHasilDokter + parseInt(kp.hasilBagiDokter);
        bagiHasilPerawat = bagiHasilPerawat + parseInt(kp.hasilBagiPerawat);
        if (kp.obat) {
          kp.obat.forEach((obt) => {
            totalPrice = totalPrice + obt.harga
          })
        }
        if (kp.tindakan) {
          kp.tindakan.forEach((tdkn) => {
            totalPrice = totalPrice + tdkn.harga
            bagiHasilDokter = bagiHasilDokter + tdkn.bagiHasilDokter;
            bagiHasilPerawat = bagiHasilPerawat + tdkn.bagiHasilPerawat;
          })
        }
        if (kp.bhp) {
          kp.bhp.forEach((bahan) => {
            totalPrice = totalPrice + bahan.harga
          })
        }
      })
    }
    return {
      hargaTotal: totalPrice,
      bagiHasilDokter,
      bagiHasilPerawat,
    }
  };

  const getStatusPasien = (value: string) => {
    if (value === "pending") {
      return (
        <Flex
          bgColor={themeColor.chakraBlue1}
          color={themeColor.chakraBlue6}
          textTransform="uppercase"
          fontWeight={600}
          fontSize="12px"
          w="fit-content"
          rounded="full"
          p="4px 8px"
        >
          Menunggu Waktu Kedatangan
        </Flex>
      )
    }
    if (value === "ready") {
      return (
        <Flex
          bgColor={themeColor.chakraBlue1}
          color={themeColor.chakraBlue6}
          textTransform="uppercase"
          fontWeight={600}
          fontSize="12px"
          w="fit-content"
          rounded="full"
          p="4px 8px"
        >
          Sedang Berlangsung
        </Flex>
      )
    }
    if (value === "waitingPayment") {
      return (
        <Flex
          bgColor={themeColor.redSoftBg}
          color={themeColor.redHard}
          textTransform="uppercase"
          fontWeight={600}
          fontSize="12px"
          w="fit-content"
          rounded="full"
          p="4px 8px"
        >
          Menunggu Pembayaran
        </Flex>
      )
    }
    if (value === "success") {
      return (
        <Flex
          bgColor={themeColor.greenSoftBg}
          color={themeColor.greenHard}
          textTransform="uppercase"
          fontWeight={600}
          fontSize="12px"
          w="fit-content"
          rounded="full"
          p="4px 8px"
        >
          Selesai
        </Flex>
      )
    }
    if (value === "canceled") {
      return (
        <Flex
          bgColor={themeColor.redSoftBg}
          color={themeColor.redHard}
          textTransform="uppercase"
          fontWeight={600}
          fontSize="12px"
          w="fit-content"
          rounded="full"
          p="4px 8px"
        >
          Dibatalkan
        </Flex>
      )
    }
  };

  return (
    <LayoutPasien metaTitle="Reservasi">
      <Stack spacing="32px" w="100%">
        <Text>
          Detail Reservasi #{id}
        </Text>

        <Stack spacing="0px">
          <Text fontSize="20px" fontWeight={600}>
            Reservasi #{id}
          </Text>
          <Text fontSize="14px" color={themeColor.muted}>
            Transaksi pada {dateFormatWithoutDay(new Date(parseInt(displayedReservasi?.updatedAt ?? "0")))}
          </Text>
        </Stack>

        <Stack spacing="0px">
          <Text
            fontWeight={600}
            fontSize="18px"
          >
            Hasil Pemeriksaan
          </Text>
          <SimpleGrid maxW="600px" columns={2} columnGap="16px">
            <Flex justify="space-between">
              <Text>
                Penyakit
              </Text>
              <Text>:</Text>
            </Flex>
            <Text>
              {displayedReservasi?.kunjungan?.penyakit?.nama}
              {(displayedReservasi?.kunjungan?.kunjunganPoli?.filter((kp) =>
                kp.penyakit?.nama !== displayedReservasi?.kunjungan?.penyakit?.nama
              ).length ?? 0) > 0 && ", " + displayedReservasi?.kunjungan?.kunjunganPoli?.filter((kp) =>
                kp.penyakit?.nama !== displayedReservasi?.kunjungan?.penyakit?.nama
              ).map((kp) => kp.penyakit?.nama).join(", ")}
            </Text>
            <Flex justify="space-between">
              <Text>
                Tekanan Darah
              </Text>
              <Text>:</Text>
            </Flex>
            <Text>
              {displayedReservasi?.kunjungan?.tekananDarah}
            </Text>
            <Flex justify="space-between">
              <Text>
                Denyut Nadi
              </Text>
              <Text>:</Text>
            </Flex>
            <Text>
              {displayedReservasi?.kunjungan?.denyutNadi}
            </Text>
            <Flex justify="space-between">
              <Text>
                Tekanan Darah
              </Text>
              <Text>:</Text>
            </Flex>
            <Text>
              {displayedReservasi?.kunjungan?.usiaTahun} tahun {displayedReservasi?.kunjungan?.usiaBulan
              } bulan {displayedReservasi?.kunjungan?.usiaHari} hari
            </Text>
            <Flex justify="space-between">
              <Text>
                Status
              </Text>
              <Text>:</Text>
            </Flex>
            <Text>
              {getStatusPasien(displayedReservasi?.statusPasien ?? '')}
            </Text>
          </SimpleGrid>
        </Stack>

        <Box
          overflow="scroll"
          css={{
            "&::-webkit-scrollbar": {
              height: "3px",
              width: "0px",
            },
            "&::-webkit-scrollbar-track": {
              height: "3px",
              background: "#FAFAFA",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#3182ce",
            },
          }}
        >
          <Table borderRadius="8px" overflow="hidden" boxShadow="md">
            <Thead>
              <Tr bgColor={themeColor.chakraBlue6}>
                <Th color="white">
                  Barang/Jasa
                </Th>
                <Th color="white">
                  Harga Satuan
                </Th>
                <Th color="white">
                  Jumlah
                </Th>
                <Th color="white">
                  Total
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {displayedReservasi?.kunjungan?.kunjunganPoli?.map((kp) => (
                <>
                  <Tr>
                    <Td>
                      Periksa Poli {kp.poliBagian?.nama}
                    </Td>
                    <Td />
                    <Td />
                    <Td>
                      Rp {numberWithSeparator(parseInt(kp.biayaPoli))}
                    </Td>
                  </Tr>
                  {kp.obat?.map((obt) => (
                    <Tr>
                      <Td>
                        {obt.refObat.nama}
                      </Td>
                      <Td>
                        Rp {numberWithSeparator(obt.refObat.harga)}
                      </Td>
                      <Td>
                        @{obt.jumlah}
                      </Td>
                      <Td>
                        Rp {numberWithSeparator(obt.harga)}
                      </Td>
                    </Tr>
                  ))}
                  {kp.tindakan?.map((tdkn) => (
                    <Tr>
                      <Td>
                        {tdkn.refTindakan.nama}
                      </Td>
                      <Td>
                        Rp {numberWithSeparator(tdkn.refTindakan.harga)}
                      </Td>
                      <Td>
                        @{tdkn.jumlah}
                      </Td>
                      <Td>
                        Rp {numberWithSeparator(tdkn.harga)}
                      </Td>
                    </Tr>
                  ))}
                  {kp.bhp?.map((bahan) => (
                    <Tr>
                      <Td>
                        {bahan.refBhp.nama}
                      </Td>
                      <Td>
                        Rp {numberWithSeparator(bahan.refBhp.harga)}
                      </Td>
                      <Td>
                        @{bahan.jumlah}
                      </Td>
                      <Td>
                        Rp {numberWithSeparator(bahan.harga)}
                      </Td>
                    </Tr>
                  ))}
                </>
              ))}
              <Tr bgColor={themeColor.chakraBlue2}>
                <Td>
                  <Text fontWeight={600} fontSize="18px" color={themeColor.chakraBlue10}>
                    Total
                  </Text>
                </Td>
                <Td />
                <Td />
                <Td>
                  <Text fontWeight={600} fontSize="18px" color={themeColor.chakraBlue10}>
                    Rp {numberWithSeparator(getTotalPrice(displayedReservasi).hargaTotal)}
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </LayoutPasien >
  )
};

export default withUrqlClient(createUrqlClient)(PasienReservasiDetailPage);