import { Avatar, Button, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from "../../../components/DatePicker";
import { LayoutPasien } from "../../../components/LayoutGeneral";
import {
  useCreateReservasiMutation,
  useGetAllPoliBagiansQuery,
  useGetPoliBagianQuery,
  useMeWithAllDataQuery,
} from "../../../generated/graphql";
import themeColor from "../../../utils/color";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const PasienBuatReservasiPage = () => {

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [meWithAllData] = useMeWithAllDataQuery();

  if (meWithAllData.fetching === false && !meWithAllData.data?.meWithAllData?.pasien?.id) {
    router.push("/pasien/data-akun")
  };

  const [selectedTanggalKedatangan, setSelectedTanggalKedatangan] = useState<Date | null>(null);
  const [selectedPoliId, setSelectedPoliId] = useState("");
  const [selectedDokterId, setSelectedDokterId] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");

  const isReady = selectedTanggalKedatangan !== null
    && selectedPoliId !== ""
    && selectedDokterId !== ""
    && nomorTelepon !== "";

  useEffect(() => {
    setNomorTelepon(meWithAllData.data?.meWithAllData?.pasien?.nomorTelepon ?? "");
  }, [meWithAllData.fetching])

  const [poliBagians] = useGetAllPoliBagiansQuery();
  const [poliDokter] = useGetPoliBagianQuery({
    variables: {
      id: parseInt(selectedPoliId)
    }
  });
  const [creating, createReservasi] = useCreateReservasiMutation();

  const handleBuatReservasi = () => {
    if (!isReady) {
      alert("Lengkapi semua data!")
      return;
    }
    createReservasi({
      input: {
        tanggalRencanaDatang: selectedTanggalKedatangan,
        nomorTelepon,
        userId: meWithAllData.data?.meWithAllData?.id ?? -1,
        poliBagianId: parseInt(selectedPoliId),
        dokterId: parseInt(selectedDokterId),
        createdBy: `User#${meWithAllData.data?.meWithAllData?.id}`,
        updatedBy: "",
        statusPasien: "pending",
      }
    }).then((result) => {
      if (result.error) {
        alert(result.error.message)
        return;
      };
      router.push("/pasien/dashboard");
    })
  };

  return (
    <LayoutPasien metaTitle="Buat Reservasi">
      <Stack spacing="32px" w="100%">
        <Text>
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
              <Stack spacing="16px" direction={["column", "column", "row"]}>
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
                <Button
                  onClick={onOpen}
                  color={themeColor.chakraBlue6}
                  variant="outline"
                  flexShrink={0}
                >
                  Lihat Semua Dokter
                </Button>
              </Stack>
            </Stack>
            <Stack>
              <Text fontSize="12px">
                Tanggal Kedatangan
              </Text>
              <DatePicker
                onChange={(data) => setSelectedTanggalKedatangan(data)}
                placeholderText="Pilih tanggal kedatangan"
                selected={selectedTanggalKedatangan}
              />
            </Stack>
            <Stack>
              <Text fontSize="12px">
                Nomor Telepon untuk Reservasi Ini
              </Text>
              <Input
                onChange={(e) => setNomorTelepon(e.target.value)}
                placeholder="Nomor Telepon"
                value={nomorTelepon}
              />
            </Stack>
            <Flex justify="end">
              <Button
                isLoading={creating.fetching}
                onClick={handleBuatReservasi}
                colorScheme="blue"
                w="auto"
              >
                Buat Reservasi
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={["", "600px", "800px"]}>
          <ModalHeader>Daftar Dokter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="24px">
              {poliBagians.data?.getAllPoliBagians?.map((pb) => (
                <Stack borderRadius="8px" boxShadow="md" p="16px" key={pb.id}>
                  <Text fontWeight={600} fontSize="18px" color={themeColor.chakraBlue10}>
                    Poli {pb.nama}
                  </Text>
                  <SimpleGrid columns={[1, 1, 3]} gap="16px">
                    {pb.dokter.map((dok) => (
                      <HStack
                        onClick={() => {
                          setSelectedPoliId(pb.id.toString());
                          setSelectedDokterId(dok.id.toString());
                          onClose();
                        }}
                        bgColor={themeColor.chakraBlue6}
                        borderRadius="8px"
                        cursor="pointer"
                        color="white"
                        p="8px"
                      >
                        <Avatar
                          name={dok.nama}
                          boxSize="40px"
                          size="md"
                        />
                        <Flex direction="column">
                          <Text fontWeight={700}>
                            {dok.nama}
                          </Text>
                          <Text fontSize="14px">
                            {dok.nomorTelepon}
                          </Text>
                        </Flex>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </Stack>
              ))}
            </Stack>
          </ModalBody>
          <ModalFooter pb="0px"></ModalFooter>
        </ModalContent>

      </Modal>
    </LayoutPasien>
  )
};

export default withUrqlClient(createUrqlClient)(PasienBuatReservasiPage);