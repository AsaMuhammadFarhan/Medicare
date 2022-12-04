import { Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import GudangBhp from "../../components/Gudang/Bhp";
import ConfigurationSetting from "../../components/Gudang/ConfigurationSetting";
import GudangObat from "../../components/Gudang/Obat";
import DaftarPenyakit from "../../components/Gudang/Penyakit";
import GudangPoli from "../../components/Gudang/Poli";
import GudangTindakan from "../../components/Gudang/Tindakan";
import LayoutAdmin from "../../components/LayoutGeneral";
import { createUrqlClient } from "../../utils/createUrqlClient";

const AdminGudangPage = () => {
  return (
    <LayoutAdmin metaTitle="Gudang">
      <Stack spacing="32px" w="100%">
        <Text>
          Gudang
        </Text>
        <Stack spacing="16px">
          <GudangObat />
          <GudangTindakan />
          <GudangBhp />
          <GudangPoli />
          <DaftarPenyakit />
          <ConfigurationSetting />
        </Stack>
      </Stack>
    </LayoutAdmin>
  )
};

export default withUrqlClient(createUrqlClient)(AdminGudangPage);