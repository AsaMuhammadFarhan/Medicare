import { withUrqlClient } from "next-urql";
import LayoutAdmin from "../../components/LayoutGeneral";
import { createUrqlClient } from "../../utils/createUrqlClient";

const AdminGudangPage = () => {
  return(
    <LayoutAdmin metaTitle="Gudang">
      Gudang
    </LayoutAdmin>
  )
};

export default withUrqlClient(createUrqlClient)(AdminGudangPage);