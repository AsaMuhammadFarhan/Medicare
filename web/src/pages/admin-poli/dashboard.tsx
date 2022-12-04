import { Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { LayoutAdminPoli } from "../../components/LayoutGeneral";
import { createUrqlClient } from "../../utils/createUrqlClient";

const AdminPoliDashboardPage = () => {

  const [realTimeDate, setRealTimeDate] = useState(new Date())
  const [trigger, setTrigger] = useState(true);
  if (trigger === true) {
    setTrigger(false);
    setRealTimeDate(new Date());
    setTimeout(() => setTrigger(true), 1000);
  }

  return (
    <LayoutAdminPoli metaTitle="Poli">
      <Stack spacing="32px">
        <Text>
          Dashboard
        </Text>
        <Stack spacing="8px">
          <Text fontWeight={700} fontSize="24px">
            Selamat Datang
          </Text>
          <Text>
            {moment(realTimeDate).format('DD MMMM YYYY, h:mm:ss a')}
          </Text>
        </Stack>
      </Stack>
    </LayoutAdminPoli>
  )
};

export default withUrqlClient(createUrqlClient)(AdminPoliDashboardPage);