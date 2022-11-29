import { withUrqlClient } from "next-urql";
import LayoutAdmin from "../../components/LayoutGeneral";
import { createUrqlClient } from "../../utils/createUrqlClient";

const AdminDashboardPage = () => {
  return(
    <LayoutAdmin>
      tekos dashboard
    </LayoutAdmin>
  )
};

export default withUrqlClient(createUrqlClient)(AdminDashboardPage);