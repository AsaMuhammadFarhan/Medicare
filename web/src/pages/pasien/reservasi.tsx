import { Flex, Select, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import DatePicker from "../../components/DatePicker";
import { LayoutPasien } from "../../components/LayoutGeneral";
import { useGetAllDoktersQuery, useGetAllPoliBagiansQuery } from "../../generated/graphql";
import themeColor from "../../utils/color";
import { createUrqlClient } from "../../utils/createUrqlClient";

const PasienBuatReservasiPage = () => {

  const [poliBagians] = useGetAllPoliBagiansQuery();
  const [dokters] = useGetAllDoktersQuery();

  const [selectedTanggalKedatangan, setSelectedTanggalKedatangan] = useState<Date | null>(null);
  const [selectedPoliId, setSelectedPoliId] = useState("");
  const [selectedDokterId, setSelectedDokterId] = useState("");

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
                Tanggal Kedatangan
              </Text>
              <DatePicker
                onChange={(data) => setSelectedTanggalKedatangan(data)}
                selected={selectedTanggalKedatangan}
              />
            </Stack>
            <Stack>
              <Text fontSize="12px">
                Dokter
              </Text>
              <Select
                onChange={(e) => setSelectedDokterId(e.target.value)}
                placeholder="Pilih dokter"
                value={selectedDokterId}
              >
                {dokters.data?.getAllDokters?.map((dokter) => (
                  <option value={dokter.id}>{dokter.nama}</option>
                ))}
              </Select>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </LayoutPasien>
  )
};

export default withUrqlClient(createUrqlClient)(PasienBuatReservasiPage);