import {
  Button,
  Flex,
  HStack,
  Skeleton,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import Iconify from '../components/Iconify'
import Logo from '../components/Logo'
import { OriginalMetaTags } from '../components/MetaTags'
import { NextChakraLink, NextChakraLinkWithHover } from '../components/NextChakraLink'
import { useConfigurationSettingsByNameQuery, useGetCountUserQuery, useLogoutMutation, useMeQuery } from '../generated/graphql'
import themeColor from '../utils/color'
import { createUrqlClient } from '../utils/createUrqlClient'

const IndexPage = () => {
  const router = useRouter()
  const [me] = useMeQuery();
  const [, logout] = useLogoutMutation();
  const [apaItuMedicare] = useConfigurationSettingsByNameQuery({
    variables: {
      keywords: "apa-itu-medicare"
    }
  });
  const [countUsers] = useGetCountUserQuery();
  const [countPartners] = useConfigurationSettingsByNameQuery({
    variables: {
      keywords: "jumlah-klinik-partner"
    }
  });
  const [ratingMedicare] = useConfigurationSettingsByNameQuery({
    variables: {
      keywords: "rating-medicare"
    }
  });

  const totalUser = countUsers.data?.getCountUser ?? 0;

  const isLoaded = countUsers.fetching === false
    && countPartners.fetching === false
    && ratingMedicare.fetching === false

  const handleClickLogout = () => {
    logout().then((result) => {
      if (result.error) {
        alert(result.error.message);
        return;
      }
      router.reload();
    })
  };

  const getBaseRouter = (role?: string) => {
    if (!role) return "/";
    if (role === "admin") return "/admin/dashboard";
    if (role === "admin-poli") return "/admin-poli/dashboard";
    if (role === "cashier") return "/cashier/payment";
    if (role === "guest") return "/pasien/dashboard";
    return "/"
  };

  return (
    <Flex display="flex" w="100%" direction="column" maxW="100vw">
      <OriginalMetaTags pageName="Home" />

      {/* One Page Height Hero */}
      <Flex
        alignItems="center"
        position="relative"
        direction="column"
        minH="100vh"
        mb="48px"
        w="100%"
      >
        <Flex
          borderRadius={[
            "0% 0% 90% 90% / 0% 0% 10% 10%",
            "0% 0% 90% 90% / 0% 0% 10% 10%",
            "0% 0% 60% 60% / 0% 0% 40% 40%"
          ]}
          bgColor={themeColor.chakraBlue6}
          h={["80%", "80%", "80%"]}
          position="absolute"
          zIndex={1}
          w="100%"
        />

        <HStack
          position="absolute"
          spacing="16px"
          color="white"
          maxW="1056px"
          zIndex={2}
          px="16px"
          w="100%"
          h="40px"
        >
          <Logo color="white" size="24px" />
          <NextChakraLinkWithHover href="/" title="Home">
            <Text fontWeight={700} fontSize="20px">
              medicare
            </Text>
          </NextChakraLinkWithHover>
          <Spacer />
          {!me.data?.me ? (
            <>
              <NextChakraLinkWithHover href="/login" title="Login">
                Login
              </NextChakraLinkWithHover>
              <NextChakraLinkWithHover href="/register" title="Register">
                Register
              </NextChakraLinkWithHover>
            </>
          ) : (
            <>
              <Text>
                Halo, {me.data.me?.username}
              </Text>
              <HStack
                display={["none", "none", "block"]}
                spacing="16px"
              >
                <NextChakraLink href={getBaseRouter(me.data.me.role)}>
                  <Button
                    variant="link"
                    color="white"
                  >
                    Dashboard
                  </Button>
                </NextChakraLink>
                <Button
                  onClick={() => {
                    handleClickLogout()
                  }}
                  variant="link"
                  color="white"
                >
                  Logout
                </Button>
              </HStack>
            </>
          )}
        </HStack>

        <Stack
          mt={["80px", "80px", "160px"]}
          alignItems="center"
          spacing="24px"
          maxW="816px"
          zIndex={2}
          mx="16px"
        >
          <Stack
            textAlign={["start", "start", "center"]}
            alignItems="center"
            spacing="16px"
            color="white"
          >
            <Text
              as="h1"
              fontSize={["36px", "36px", "60px"]}
              fontWeight={800}
            >
              Kesehatanmu Adalah Prioritas Utama Kami
            </Text>
            <Text fontSize="20px">
              Kami tahu, bahkan merawat kesehatan bisa menjadi hal yang membosankan bila harus menunggu waktu yang lama.
            </Text>
          </Stack>
          <Stack
            direction={["column", "column", "row"]}
            w={["100%", "100%", "fit-content"]}
            alignItems="center"
            spacing="16px"
          >
            {me.data?.me?.id ? (
              <>
                <NextChakraLink
                  href={getBaseRouter(me.data.me.role)}
                  w={["100%", "100%", "fit-content"]}
                  title="Dashboard"
                >
                  <Button
                    _hover={{ bgColor: themeColor.chakraBlue8 }}
                    w={["100%", "100%", "fit-content"]}
                    bgColor={themeColor.chakraBlue10}
                    colorScheme="blue"
                  >
                    Dashboard
                  </Button>
                </NextChakraLink>
                <Button
                  w={["100%", "100%", "fit-content"]}
                  onClick={handleClickLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NextChakraLink href="/login" title="Login">
                  <Button
                    _hover={{ bgColor: themeColor.chakraBlue8 }}
                    bgColor={themeColor.chakraBlue10}
                    colorScheme="blue"
                  >
                    Masuk
                  </Button>
                </NextChakraLink>
                <NextChakraLink href="/register" title="Register">
                  <Button>
                    Daftar Sekarang
                  </Button>
                </NextChakraLink>
              </>
            )}
          </Stack>
        </Stack>

        <Stack
          direction={["column", "column", "row"]}
          maxW="832px"
          zIndex={2}
          mt="40px"
          px="16px"
          w="100%"
        >
          <Stack
            bgColor={themeColor.chakraBlue10}
            alignItems="center"
            borderRadius="8px"
            color="white"
            w="100%"
            p="16px"
          >
            <Flex
              alignItems="center"
              justify="center"
              fontSize="40px"
              flexShrink={0}
              boxSize="60px"
            >
              <Iconify boxSize='40px' icon="bx:timer" />
            </Flex>
            <Text textAlign="center">
              Menghemat waktu kamu dengan fitur{" "}
              <Text as="span" fontWeight={700}>
                mengambil antrian bisa dari mana saja
              </Text>
            </Text>
          </Stack>
          <Stack
            bgColor={themeColor.chakraBlue10}
            alignItems="center"
            borderRadius="8px"
            color="white"
            w="100%"
            p="16px"
          >
            <Flex
              alignItems="center"
              justify="center"
              fontSize="40px"
              flexShrink={0}
              boxSize="60px"
            >
              <Iconify boxSize='40px' icon="bx:user-check" />
            </Flex>
            <Text textAlign="center">
              Kamu dapat merasa lebih puas karena{" "}
              <Text as="span" fontWeight={700}>
                kamu bisa  memilih dokter sendiri
              </Text>
            </Text>
          </Stack>
          <Stack
            bgColor={themeColor.chakraBlue10}
            alignItems="center"
            borderRadius="8px"
            color="white"
            w="100%"
            p="16px"
          >
            <Flex
              alignItems="center"
              justify="center"
              fontSize="40px"
              flexShrink={0}
              boxSize="60px"
            >
              <Iconify boxSize='40px' icon="bx:receipt" />
            </Flex>
            <Text textAlign="center">
              <Text as="span" fontWeight={700}>
                Track record terdigitalisasi{" "}
              </Text>
              membuatmu dapat melihat riwayat konsultasi kapan saja dan dimana saja
            </Text>
          </Stack>
        </Stack>
      </Flex>

      {/* Marketing Section */}
      <Flex justify="center" w="100%" mb="48px">
        <Stack
          textAlign={["start", "start", "center"]}
          alignItems="center"
          justify="center"
          spacing="24px"
          maxW="1056px"
          px="16px"
        >
          <Stack
            alignItems="center"
          >
            <Text
              fontSize={["36px", "36px", "60px"]}
              fontWeight={[700, 700, 600]}
            >
              Apa sih{" "}
              <Text as="span" color={themeColor.chakraBlue6}>
                Medicare{" "}
              </Text>
              Itu?
            </Text>
            <Skeleton isLoaded={apaItuMedicare.fetching === false}>
              <Text fontSize="20px" color={themeColor.muted}>
                {apaItuMedicare.data?.configurationSettingsByName[0]?.value ?? (
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                )}
              </Text>
            </Skeleton>
          </Stack>
          <Skeleton isLoaded={isLoaded} w="100%">
            <Stack
              direction={["column", "column", "row"]}
              bgColor={themeColor.chakraBlue8}
              p={["24px", "24px", "64px"]}
              borderRadius="16px"
              alignItems="center"
              textAlign="center"
              color="white"
              w="100%"
            >
              <Stack w="100%" px="8px">
                <Text fontSize="64px" fontWeight={600}>
                  {totalUser > 1000 ? `${totalUser.toString().slice(0, -3)}k` : totalUser}
                </Text>
                <Text fontSize="18px">
                  Pengguna
                </Text>
              </Stack>
              <Stack w="100%" px="8px">
                <Text fontSize="64px" fontWeight={600}>
                  {countPartners.data?.configurationSettingsByName[0]?.value ?? 30}+
                </Text>
                <Text fontSize="18px">
                  Klinik Partner
                </Text>
              </Stack>
              <Stack w="100%" px="8px">
                <Text fontSize="64px" fontWeight={600}>
                  {ratingMedicare.data?.configurationSettingsByName[0]?.value ?? "-"}
                </Text>
                <Text fontSize="18px">
                  Stars
                </Text>
              </Stack>
            </Stack>
          </Skeleton>
        </Stack>
      </Flex>

    </Flex>
  )
}

export default withUrqlClient(createUrqlClient)(IndexPage);