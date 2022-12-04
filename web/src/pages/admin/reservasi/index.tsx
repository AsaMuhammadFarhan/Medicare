import { Button, Checkbox, Flex, HStack, Select, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import LayoutAdmin from "../../../components/LayoutGeneral";
import { NextChakraLink } from "../../../components/NextChakraLink";
import { useCreateReservasiMutation, useGetAllPoliBagiansQuery, useGetAllReservasisQuery, useGetAllUserPasienQuery, useGetPoliBagianQuery, useReadyReservasiMutation, useToCanceledReservasiMutation } from "../../../generated/graphql";
import themeColor from "../../../utils/color";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const AdminReservasiPage = () => {

  const [reservasis] = useGetAllReservasisQuery();
  const [, updateReady] = useReadyReservasiMutation();

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

  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedPoliId, setSelectedPoliId] = useState("");
  const [selectedDokterId, setSelectedDokterId] = useState("");

  const isReady = selectedUserId !== ""
    && selectedPoliId !== ""
    && selectedDokterId !== "";

  const [poliBagians] = useGetAllPoliBagiansQuery();
  const [poliDokter] = useGetPoliBagianQuery({
    variables: {
      id: parseInt(selectedPoliId)
    }
  });
  const [userPasiens] = useGetAllUserPasienQuery();
  const [creating, createReservasi] = useCreateReservasiMutation();
  const [, cancelingReservasi] = useToCanceledReservasiMutation();

  const handleBuatReservasi = () => {
    createReservasi({
      input: {
        tanggalRencanaDatang: new Date(),
        nomorTelepon: userPasiens.data?.getAllUserPasien.find((u) =>
          u.id === parseInt(selectedUserId))?.pasien?.nomorTelepon
          ?? "0",
        userId: parseInt(selectedUserId),
        poliBagianId: parseInt(selectedPoliId),
        dokterId: parseInt(selectedDokterId),
        createdBy: `Admin`,
        updatedBy: "",
        statusPasien: "ready",
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      alert("Reservasi Berhasil Dibuat!");
    })
  };

  const handleClickCancel = (id: number) => {
    cancelingReservasi({
      id,
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      }
    })
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
    if (value === "waitingPayment") {
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
              hanya tampilkan reservasi hari ini
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
                        isDisabled={reservasi.statusPasien === "ready" || reservasi.statusPasien === "canceled"}
                        onClick={() => handleClickReady(reservasi.id)}
                        colorScheme="green"
                        p="5.5px 12px"
                        h="auto"
                        w="auto"
                      >
                        Terima Kedatangan
                      </Button>
                      {reservasi.statusPasien === "ready" && (
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
                      )}
                      {reservasi.statusPasien === "pending" && (
                        <Button
                          onClick={() => handleClickCancel(reservasi.id)}
                          colorScheme="red"
                          p="5.5px 12px"
                          h="auto"
                          w="100%"
                        >
                          Tolak Reservasi
                        </Button>
                      )}
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
        <Stack spacing="16px">
          <Text fontSize="20px" fontWeight={600}>
            Buat Reservasi
          </Text>
          <Flex
            borderRadius="8px"
            direction="column"
            overflow="hidden"
            boxShadow="md"
            w="100%"
          >
            <Flex
              bgColor={themeColor.chakraBlue6}
              fontWeight={600}
              color="white"
              w="100%"
              p="16px"
            >
              Buat Reservasi
            </Flex>
            <Stack spacing="24px" p="16px">
              <Stack>
                <Text fontSize="12px">
                  Pilih Pasien
                </Text>
                <Select
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  placeholder="Pilih pasien"
                  value={selectedUserId}
                >
                  {userPasiens.data?.getAllUserPasien?.filter((u) => u.pasien).map((user) => (
                    <option value={user.id}>{user.pasien?.nama}</option>
                  ))}
                </Select>
              </Stack>
              <Stack>
                <Text fontSize="12px">
                  Poli
                </Text>
                <Select
                  onChange={(e) => setSelectedPoliId(e.target.value)}
                  placeholder="Pilih poli"
                  value={selectedPoliId}
                >
                  {poliBagians.data?.getAllPoliBagians?.map((poliBagian) => (
                    <option value={poliBagian.id}>{poliBagian.nama}</option>
                  ))}
                </Select>
              </Stack>
              <Stack>
                <Text fontSize="12px">
                  Dokter
                </Text>
                <Select
                  onChange={(e) => setSelectedDokterId(e.target.value)}
                  isDisabled={selectedPoliId === ""}
                  placeholder="Pilih dokter"
                  value={selectedDokterId}
                >
                  {poliDokter.data?.getPoliBagian?.dokter.map((dokter) => (
                    <option value={dokter.id}>{dokter.nama}</option>
                  ))}
                </Select>
              </Stack>
              <Flex justify="end">
                <Button
                  isLoading={creating.fetching}
                  onClick={handleBuatReservasi}
                  isDisabled={!isReady}
                  colorScheme="blue"
                  w="auto"
                >
                  Buat Reservasi
                </Button>
              </Flex>
            </Stack>
          </Flex>
        </Stack>
      </Stack>
    </LayoutAdmin>
  )
};

export default withUrqlClient(createUrqlClient)(AdminReservasiPage);