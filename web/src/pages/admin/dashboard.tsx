import { Divider, Stack, Text, Button } from "@chakra-ui/react";
import moment from "moment";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import LayoutAdmin from "../../components/LayoutGeneral";
import { createUrqlClient } from "../../utils/createUrqlClient";
import Link from "next/link"

function AdminDashboardPage() {

  const [realTimeDate, setRealTimeDate] = useState(new Date());
  const [trigger, setTrigger] = useState(true);
  if (trigger === true) {
    setTrigger(false);
    setRealTimeDate(new Date());
    setTimeout(() => setTrigger(true), 1000);
  }

  return (
    <LayoutAdmin metaTitle="Admin Dashboard">
      <Stack spacing="32px" w="100%">
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
        <Divider />
        <Stack height="12">
          <Button colorScheme={"blue"} size="md" width="20">
            <Link href="/admin/reservasi"> Reservasi </Link>
          </Button>
        </Stack>
      </Stack>
    </LayoutAdmin>
  );

}


export default withUrqlClient(createUrqlClient)(AdminDashboardPage);