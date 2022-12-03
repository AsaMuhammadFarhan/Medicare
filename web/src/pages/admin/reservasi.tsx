import { Flex, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import LayoutAdmin from "../../components/LayoutGeneral";
import { useGetAllReservasisQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const AdminReservasiPage = () => {

  const [reservasis] = useGetAllReservasisQuery();

  return (
    <LayoutAdmin metaTitle="Reservasi">
      <Stack spacing="16px">
        <Text>
          Reservasi
        </Text>
        <Flex direction="column" borderRadius="8px" bgColor="white" overflow="hidden">
          <Table>
            <Thead>
              <Tr>
                <Th>
                  ID
                </Th>
                <Th>
                  Nama Pasien
                </Th>
                <Th>
                  Status Pasien
                </Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {reservasis.data?.getAllReservasis?.map((reservasi) => (
                <Tr>
                  <Td>
                    {reservasi.id}
                  </Td>
                  <Td>
                    {reservasi.user.pasien?.nama}
                  </Td>
                  <Td>
                    {reservasi.statusPasien}
                  </Td>
                  <Td>
                    Ini button
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Stack>
    </LayoutAdmin>
  )
};

export default withUrqlClient(createUrqlClient)(AdminReservasiPage);