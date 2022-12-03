import { Flex, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { LayoutPasien } from "../../components/LayoutGeneral";
import { NextChakraLinkWithHover } from "../../components/NextChakraLink";
import { useMeWithAllDataQuery } from "../../generated/graphql";
import themeColor from "../../utils/color";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { dateFormatWithoutDay } from "../../utils/format";

const PasienDashboardPage = () => {

  const [meWithAllData] = useMeWithAllDataQuery();

  const isTherePendingResevasi: boolean =
    meWithAllData.data?.meWithAllData?.reservasi.findIndex((res) =>
      res.statusPasien === "pending"
    ) !== 1;

  return (
    <LayoutPasien metaTitle="Dashboard">
      <Stack spacing="16px" w="100%">
        <Text>
          Dashboard
        </Text>
        {isTherePendingResevasi ? (
          <Stack
            borderRadius="8px"
            overflow="hidden"
            boxShadow="md"
            spacing="24px"
            p="16px"
            w="100%"
          >
            <Text fontWeight={600} fontSize="24px" color={themeColor.chakraBlue9}>
              Reservasi Aktif
            </Text>
            {meWithAllData.data?.meWithAllData?.reservasi.map((res) => (
              <HStack justify="space-between" w="100%" key={res.id}>
                <Stack spacing="4px">
                  <Text fontSize="18px">
                    Reservasi ID#{res.id}
                  </Text>
                  <Text fontSize="14px">
                    [{dateFormatWithoutDay(new Date(parseInt(res.tanggalRencanaDatang)))
                    }] Bersama {res.dokter?.nama} di Poliklinik {res.poliBagian?.nama}
                  </Text>
                </Stack>
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
                  {res.statusPasien}
                </Flex>
              </HStack>
            ))}
          </Stack>
        ) : (
          <Flex>
            <Text>
              Tidak ada reservasi aktif...{" "}
            </Text>
            <NextChakraLinkWithHover href="/pasien/reservasi">
              Buat Sekarang
            </NextChakraLinkWithHover>
          </Flex>
        )}
        <SimpleGrid columns={[1, 2, 2]} gap="16px">
          {/* <Stack
            borderRadius="8px"
            overflow="hidden"
            boxShadow="md"
            spacing="24px"
            p="16px"
            w="100%"
          >
            <Text fontWeight={600} fontSize="24px" color={themeColor.chakraBlue9}>
              Riwayat Kunjungan
            </Text>
          </Stack>
          <Stack
            borderRadius="8px"
            overflow="hidden"
            boxShadow="md"
            spacing="24px"
            p="16px"
            w="100%"
          >
            <Text fontWeight={600} fontSize="24px" color={themeColor.chakraBlue9}>
              Riwayat 
            </Text>
          </Stack> */}
        </SimpleGrid>
      </Stack>
    </LayoutPasien>
  )
};

export default withUrqlClient(createUrqlClient)(PasienDashboardPage);