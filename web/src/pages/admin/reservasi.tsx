import { withUrqlClient } from "next-urql";
import LayoutAdmin from "../../components/LayoutGeneral";
import { createUrqlClient } from "../../utils/createUrqlClient";

const AdminReservasiPage = () => {
  return(
    <LayoutAdmin>
      tekos reservasi
    </LayoutAdmin>
  )
};

export default withUrqlClient(createUrqlClient)(AdminReservasiPage);