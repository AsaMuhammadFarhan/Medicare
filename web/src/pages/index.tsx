import {
  Flex,
  Text,
} from '@chakra-ui/react'

import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

const IndexPage = () => {
  const router = useRouter();
  const [me] = useMeQuery();
  const [, logout] = useLogoutMutation();

  useEffect(() => {
    if (me.fetching === false && me.data?.me?.id === undefined) router.push("/login");
  }, [me]);

  const handleClickLogout = () => {
    logout().then((result) => {
      if (result.error) {
        alert(result.error.message);
        return;
      }
    })
  }

  return (
    <Flex direction="column" h="100vh" justify="center" alignItems="center">
      <Text>Haloo {me.data?.me?.username}</Text>
      <Text fontSize="12px" onClick={() => handleClickLogout()} cursor="pointer">
        Logout
      </Text>
    </Flex>
  )
}

export default withUrqlClient(createUrqlClient)(IndexPage);