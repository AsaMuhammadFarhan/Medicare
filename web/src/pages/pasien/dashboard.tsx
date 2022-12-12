import { Button, Divider, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import Iconify from "../../components/Iconify";
import { LayoutPasien } from "../../components/LayoutGeneral";
import { NextChakraLink, NextChakraLinkWithHover } from "../../components/NextChakraLink";
import { useMeWithAllDataQuery } from "../../generated/graphql";
import themeColor from "../../utils/color";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { dateFormatWithoutDay } from "../../utils/format";

const PasienDashboardPage = () => {

  const [meWithAllData] = useMeWithAllDataQuery();

  const pendingReservasi = meWithAllData.data?.meWithAllData?.reservasi.filter((res) =>
    res.statusPasien === "pending"
  ) ?? [];
  const readyReservasi = meWithAllData.data?.meWithAllData?.reservasi.filter((res) =>
    res.statusPasien === "ready"
  ) ?? [];
  const waitingPaymentReservasi = meWithAllData.data?.meWithAllData?.reservasi.filter((res) =>
    res.statusPasien === "waitingPayment"
  ) ?? [];
  const successAndCanceledReservasi = meWithAllData.data?.meWithAllData?.reservasi.filter((res) =>
    res.statusPasien === "success" || res.statusPasien === "canceled"
  ) ?? [];

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
    <LayoutPasien metaTitle="Dashboard">
      <Stack spacing="32px" w="100%">
        <Text>
          Dashboard
        </Text>

        <Stack spacing="4px">
          <Text fontSize="24px" fontWeight={600} color={themeColor.chakraBlue10}>
            Selamat Datang, {meWithAllData.data?.meWithAllData?.pasien?.nama ?? "Pasien"}!
          </Text>
          <Text>
            Ini adalah tampilan dashboard kamu
          </Text>
        </Stack>
        <Divider orientation="horizontal" />
        <Stack
          spacing="8px"
          w="100%"
        >
          <Text fontWeight={600} fontSize="24px" color={themeColor.chakraBlue9}>
            Reservasi Aktif
          </Text>
          {(pendingReservasi.length > 0 || readyReservasi.length > 0 || waitingPaymentReservasi.length > 0) ? (
            <>
              {waitingPaymentReservasi.map((res) => (
                <HStack
                  justify="space-between"
                  alignItems="center"
                  borderRadius="8px"
                  overflow="hidden"
                  boxShadow="md"
                  key={res.id}
                  w="100%"
                  p="16px"
                >
                  <Stack spacing="4px">
                    <Text fontSize="18px">
                      Reservasi ID#{res.id}
                    </Text>
                    <Text fontSize="14px">
                      [{dateFormatWithoutDay(new Date(parseInt(res.tanggalRencanaDatang)))
                      }] Bersama {res.dokter?.nama} di Poliklinik {res.poliBagian?.nama}
                    </Text>
                  </Stack>
                  {getStatusPasien(res.statusPasien)}
                </HStack>
              ))}
              {readyReservasi.map((res) => (
                <HStack
                  justify="space-between"
                  alignItems="center"
                  borderRadius="8px"
                  overflow="hidden"
                  boxShadow="md"
                  key={res.id}
                  w="100%"
                  p="16px"
                >
                  <Stack spacing="4px">
                    <Text fontSize="18px">
                      Reservasi ID#{res.id}
                    </Text>
                    <Text fontSize="14px">
                      [{dateFormatWithoutDay(new Date(parseInt(res.tanggalRencanaDatang)))
                      }] Bersama {res.dokter?.nama} di Poliklinik {res.poliBagian?.nama}
                    </Text>
                  </Stack>
                  {getStatusPasien(res.statusPasien)}
                </HStack>
              ))}
              {pendingReservasi.map((res) => (
                <HStack
                  justify="space-between"
                  alignItems="center"
                  borderRadius="8px"
                  overflow="hidden"
                  boxShadow="md"
                  key={res.id}
                  w="100%"
                  p="16px"
                >
                  <Stack spacing="4px">
                    <Text fontSize="18px">
                      Reservasi ID#{res.id}
                    </Text>
                    <Text fontSize="14px">
                      [{dateFormatWithoutDay(new Date(parseInt(res.tanggalRencanaDatang)))
                      }] Bersama {res.dokter?.nama} di Poliklinik {res.poliBagian?.nama}
                    </Text>
                  </Stack>
                  {getStatusPasien(res.statusPasien)}
                </HStack>
              ))}
            </>
          ) : (
            <Flex
              alignItems="center"
              direction="column"
              justify="center"
              h="100px"
              w="100%"
            >
              <Text>
                Tidak ada reservasi aktif.
              </Text>
              <NextChakraLinkWithHover href="/pasien/reservasi">
                <Button colorScheme="blue">
                  Buat Reservasi Sekarang
                </Button>
              </NextChakraLinkWithHover>
            </Flex>
          )}
        </Stack>
        <Stack
          spacing="16px"
          w="100%"
        >
          <Text fontWeight={600} fontSize="24px" color={themeColor.chakraBlue9}>
            Riwayat Kunjungan
          </Text>
          {successAndCanceledReservasi.map((res) => (
            <Stack
              borderRadius="8px"
              overflow="hidden"
              key={`${res.id}`}
              boxShadow="md"
              spacing="16px"
              p="24px"
            >
              <Stack spacing="4px">
                <Flex justify="space-between">
                  <Text fontSize="18px">
                    Reservasi ID#{res.id}
                  </Text>
                  <Flex h="fit-content">
                    {getStatusPasien(res.statusPasien)}
                  </Flex>
                </Flex>
                {res.statusPasien === "success" ? (
                  <Text fontSize="14px" color={themeColor.muted}>
                    Periksa {res.kunjungan?.penyakit} dengan {res.kunjungan?.kunjunganPoli?.map((kp) =>
                      `${kp.dokter?.nama} (Poli ${kp.poliBagian?.nama})`
                    ).join(", juga ")}
                  </Text>
                ) : (
                  <Text fontSize="14px" color={themeColor.muted}>
                    Periksa dibatalkan
                  </Text>
                )}
              </Stack>
              {res.statusPasien === "success" && (
                <NextChakraLink
                  href={"/pasien/reservasi/" + res.id}
                  borderRadius="8px"
                  w="100%"
                >
                  <HStack
                    _hover={{
                      bgColor: "gray.50"
                    }}
                    justify="space-between"
                    borderColor="gray.200"
                    borderRadius="8px"
                    borderWidth="1px"
                    p="16px"
                  >
                    <HStack>
                      <Flex
                        color={themeColor.chakraBlue8}
                        alignItems="center"
                        borderRadius="4px"
                        bgColor="gray.50"
                        justify="center"
                        flexShrink={0}
                        boxSize="40px"
                      >
                        <Iconify icon="bx:file" boxSize="24px" />
                      </Flex>
                      <Flex direction="column">
                        <Text fontSize="14px">
                          Reservasi-{res.id}_{moment(new Date(parseInt(res.updatedAt))).format('L')}
                        </Text>
                        <Text color={themeColor.muted}>
                        </Text>
                      </Flex>
                    </HStack>
                    <Button colorScheme="blue">
                      Lihat
                    </Button>
                  </HStack>
                </NextChakraLink>
              )}
            </Stack>
          ))}
          {successAndCanceledReservasi.length === 0 && (
            <Flex
              alignItems="center"
              direction="column"
              justify="center"
              h="100px"
              w="100%"
            >
              <Flex>
                Riwayat kunjungan kosong.
              </Flex>
            </Flex>
          )}
        </Stack>
      </Stack>
    </LayoutPasien>
  )
};

export default withUrqlClient(createUrqlClient)(PasienDashboardPage);