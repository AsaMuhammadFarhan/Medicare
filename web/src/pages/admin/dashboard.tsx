import { withUrqlClient } from "next-urql";
import LayoutGeneral from "../../components/LayoutGeneral";
import { createUrqlClient } from "../../utils/createUrqlClient";

const AdminDashboardPage = () => {
  return(
    <LayoutGeneral
      roleAccess={["admin"]}
    >
      tekos
    </LayoutGeneral>
  )
};

export default withUrqlClient(createUrqlClient)(AdminDashboardPage);