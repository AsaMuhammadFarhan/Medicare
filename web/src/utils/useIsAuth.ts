import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = (role?: string[]) => {
  const [me] = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!me.fetching && !me.data?.me) {
      router.replace("/login?next=" + encodeURIComponent(router.asPath));
    }
    if (role && me.data?.me?.role) {
      if (!me.fetching && !role?.includes(me.data?.me?.role)) {
        router.replace("/404");
      }
    }
  }, [me.fetching, me.data, router, role]);
};
