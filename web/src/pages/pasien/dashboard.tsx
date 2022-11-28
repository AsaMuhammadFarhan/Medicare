import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";

const PasienDashboardPage = () => {
  useIsAuth();
  return(
    <>layout</>
  )
};

export default withUrqlClient(createUrqlClient)(PasienDashboardPage);