import { Button, Flex, HStack, Input, Select, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatePicker from "../../components/DatePicker";
import { LayoutPasien } from "../../components/LayoutGeneral";
import {
  useCreateReservasiMutation,
  useGetAllPoliBagiansQuery,
  useGetPoliBagianQuery,
  useMeWithAllDataQuery,
} from "../../generated/graphql";
import themeColor from "../../utils/color";
import { createUrqlClient } from "../../utils/createUrqlClient";

const PasienBuatReservasiPage = () => {

  const router = useRouter();

  const [meWithAllData] = useMeWithAllDataQuery();

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
      <Stack spacing="16px" w="100%">
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
              <HStack spacing="16px">
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
                  color={themeColor.chakraBlue6}
                  variant="outline"
                  flexShrink={0}
                >
                  Lihat Semua Dokter
                </Button>
              </HStack>
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
    </LayoutPasien>
  )
};

export default withUrqlClient(createUrqlClient)(PasienBuatReservasiPage);