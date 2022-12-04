import { Button, Checkbox, Flex, HStack, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import LayoutAdmin from "../../../components/LayoutGeneral";
import { NextChakraLink } from "../../../components/NextChakraLink";
import { useGetAllReservasisQuery, useReadyReservasiMutation } from "../../../generated/graphql";
import themeColor from "../../../utils/color";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const AdminReservasiPage = () => {

  const [reservasis] = useGetAllReservasisQuery();
  const [, updateReady] = useReadyReservasiMutation();

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
          Belum Datang
        </Flex>
      )
    }
    if (value === "ready") {
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
          Sudah Datang
        </Flex>
      )
    }
  };

  const handleClickReady = (id: number) => {
    updateReady({
      id,
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
        return;
      }
    });
  };

  return (
    <LayoutAdmin metaTitle="Reservasi">
      <Stack spacing="32px" w="100%">
        <Text>
          Reservasi
        </Text>
        <Stack spacing="16px">
        <HStack justify="space-between" alignItems="end">
          <Stack spacing="0px">
            <Text fontSize="20px" fontWeight={600}>
              Daftar Reservasi Aktif
            </Text>
            <Text>
              Daftar seluruh reservasi.
            </Text>
          </Stack>
          <Checkbox isChecked={false} isDisabled>
            Hanya Tampilkan Reservasi Hari Ini
          </Checkbox>
        </HStack>
        <Table borderRadius="8px" overflow="hidden" boxShadow="md">
          <Thead>
            <Tr bgColor={themeColor.chakraBlue6}>
              <Th color="white">
                ID
              </Th>
              <Th color="white">
                Nama Pasien
              </Th>
              <Th color="white">
                Status
              </Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {reservasis.data?.getAllReservasis?.filter((res) =>
              res.statusPasien === "pending" || res.statusPasien === "ready"
            ).map((reservasi) => (
              <Tr>
                <Td>
                  {reservasi.id}
                </Td>
                <Td>
                  <Stack spacing="4px">
                    <Text fontWeight={600}>
                      {reservasi.user.pasien?.nama}
                    </Text>
                    <Text fontSize="14px">
                      Memesan {reservasi.dokter?.nama}, Poli {reservasi.poliBagian?.nama}
                    </Text>
                  </Stack>
                </Td>
                <Td>
                  {getStatusPasien(reservasi.statusPasien)}
                </Td>
                <Td>
                  <Stack>
                    <Button
                      isDisabled={reservasi.statusPasien === "ready"}
                      onClick={() => handleClickReady(reservasi.id)}
                      colorScheme="green"
                      p="5.5px 12px"
                      h="auto"
                      w="auto"
                    >
                      Update Kedatangan
                    </Button>
                    <NextChakraLink href={`/admin/reservasi/${reservasi.id}`} w="100%">
                      <Button
                        colorScheme="blue"
                        p="5.5px 12px"
                        h="auto"
                        w="100%"
                      >
                        Data Kunjungan
                      </Button>
                    </NextChakraLink>
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        </Stack>
      </Stack>
    </LayoutAdmin>
  )
};

export default withUrqlClient(createUrqlClient)(AdminReservasiPage);