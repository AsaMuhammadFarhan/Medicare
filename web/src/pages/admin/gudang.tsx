import { Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import GudangObat from "../../components/Gudang/Obat";
import GudangPoli from "../../components/Gudang/Poli";
import GudangTindakan from "../../components/Gudang/Tindakan";
import LayoutAdmin from "../../components/LayoutGeneral";
import { createUrqlClient } from "../../utils/createUrqlClient";

const AdminGudangPage = () => {
  return (
    <LayoutAdmin metaTitle="Gudang">
      <Stack spacing="16px" w="100%">
        <Text>
          Gudang
        </Text>
        <GudangObat />
        <GudangTindakan />
        <GudangPoli />
      </Stack>
    </LayoutAdmin>
  )
};

export default withUrqlClient(createUrqlClient)(AdminGudangPage);