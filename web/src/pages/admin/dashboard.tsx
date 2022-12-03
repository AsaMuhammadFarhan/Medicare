import { Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import LayoutAdmin from "../../components/LayoutGeneral";
import { createUrqlClient } from "../../utils/createUrqlClient";

const AdminDashboardPage = () => {

  const [realTimeDate, setRealTimeDate] = useState(new Date())
  const [trigger, setTrigger] = useState(true);
  if (trigger === true) {
    setTrigger(false);
    setRealTimeDate(new Date());
    setTimeout(() => setTrigger(true), 1000);
  }

  return (
    <LayoutAdmin metaTitle="Admin Dashboard">
      <Stack spacing="16px">
        <Text>
          Dashboard
        </Text>
        <Text fontWeight={700} fontSize="24px">
          Selamat Datang
        </Text>
        <Text>
          {moment(realTimeDate).format('DD MMMM YYYY, h:mm:ss a')}
        </Text>
      </Stack>
    </LayoutAdmin>
  )
};

export default withUrqlClient(createUrqlClient)(AdminDashboardPage);