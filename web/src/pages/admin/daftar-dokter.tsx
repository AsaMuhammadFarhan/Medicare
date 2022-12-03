import { withUrqlClient } from "next-urql";
import LayoutAdmin from "../../components/LayoutGeneral";
import { createUrqlClient } from "../../utils/createUrqlClient";

const AdminDaftarDokterPage = () => {
  return (
    <LayoutAdmin metaTitle="Daftar Dokter">
      Daftar Dokter
    </LayoutAdmin>
  )
};

export default withUrqlClient(createUrqlClient)(AdminDaftarDokterPage);