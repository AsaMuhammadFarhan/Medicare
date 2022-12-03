import { Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { LayoutPasien } from "../../components/LayoutGeneral";
import { createUrqlClient } from "../../utils/createUrqlClient";

const PasienDashboardPage = () => {
  return(
    <LayoutPasien metaTitle="Dashboard">
      <Stack spacing="16px">
        <Text>
          Dashboard
        </Text>
      </Stack>
    </LayoutPasien>
  )
};

export default withUrqlClient(createUrqlClient)(PasienDashboardPage);