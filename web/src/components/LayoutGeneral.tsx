import { Avatar, Box, Button, Divider, Flex, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import themeColor from "../utils/color";
import { useIsAuth } from "../utils/useIsAuth";
import Iconify from "./Iconify";
import Logo from "./Logo";
import { OriginalMetaTags } from "./MetaTags";
import { NextChakraLink } from "./NextChakraLink";

const adminSidebar = [
  {
    label: "Dasboard",
    link: "/admin/dashboard",
  },
  {
    label: "Kelola Reservasi",
    link: "/admin/reservasi",
  },
  // {
  //   label: "Daftar Dokter",
  //   link: "/",
  // },
  // {
  //   label: "Gudang",
  //   link: "/",
  // },
];

const pasienSidebar = [
  {
    label: "Dasboard",
    link: "/pasien/dasboard",
  },
  {
    label: "Reservasi",
    link: "/",
  },
];

const LayoutAdmin: React.FC<{ metaTitle?: string; }> = ({
  children,
  metaTitle,
}) => {
  useIsAuth(["admin"]);
  const router = useRouter();
  console.log(router.asPath)
  console.log(router.pathname)

  return (
    <Flex
      direction="row"
      minH="100vh"
      maxW="100vw"
      w="100%"
    >
      <OriginalMetaTags pageName={metaTitle} />

      {/* SIDEBAR */}
      <Stack
        bgColor={themeColor.chakraBlue6}
        alignItems="center"
        flexShrink={0}
        spacing="16px"
        p="32px 24px"
        w="320px"
      >
        <Stack>
          <Logo size="24px" color="white" />
          <Flex color="white" fontSize="24px" alignItems="center">
            <Text fontWeight={600} mr="16px">
              Medicare{" "}
              <Text
                color={themeColor.chakraBlue6}
                borderRadius="2px"
                bgColor="white"
                as="span"
                px="4px"
              >
                Admin
              </Text>
            </Text>
          </Flex>
        </Stack>

        <Stack w="100%" spacing="8px" pt="32px">
          {adminSidebar.map((nav) => (
            <NextChakraLink href={nav.link} key={nav.link}>
              <Button
                _hover={{
                  bgColor: "white",
                  color: themeColor.chakraBlue6
                }}
                bgColor={router.pathname.includes(nav.link) ?  "white" : "transparent"}
                color={router.pathname.includes(nav.link) ? themeColor.chakraBlue6 : "white"}
                w="100%"
              >
                <HStack w="100%" spacing="12px">
                  <Text>{nav.label}</Text>
                </HStack>
              </Button>
            </NextChakraLink>
          ))}
        </Stack>

        <Spacer />
        <NextChakraLink href="/" w="100%">
          <Button
            _hover={{
              bgColor: "white",
              color: themeColor.chakraBlue6
            }}
            bgColor="transparent"
            color="white"
            w="100%"
          >
            <Iconify icon="bx:arrow-back" />
            <Text ml="16px">Kembali ke Menu Utama</Text>
          </Button>
        </NextChakraLink>
        <Divider />
        <HStack spacing="12px" w="100%" color="white">
          <Avatar name={"nama"} src={""} boxSize="10" />
          <Box>
            <Text fontWeight="medium" fontSize="sm">
              {"nama"}
            </Text>
            <Text color="#EBF8FF" fontSize="sm">
              {"email"}
            </Text>
          </Box>
        </HStack>

      </Stack>

      {/* CORE */}
      <Flex
        p="32px 24px"
        w="100%"
      >
        {children}
      </Flex>

    </Flex>
  )
};

export const LayoutPasien: React.FC<{ metaTitle?: string; }> = ({
  children,
  metaTitle,
}) => {
  useIsAuth();
  const router = useRouter();

  return (
    <Flex
      direction="row"
      minH="100vh"
      maxW="100vw"
      w="100%"
    >
      <OriginalMetaTags pageName={metaTitle} />

      {/* SIDEBAR */}
      <Stack
        bgColor={themeColor.chakraBlue6}
        alignItems="center"
        flexShrink={0}
        spacing="16px"
        p="32px 24px"
        w="320px"
      >
        <Stack>
          <Logo size="24px" color="white" />
          <Flex color="white" fontSize="24px" alignItems="center">
            <Text fontWeight={600} mr="16px">
              Medicare{" "}
              <Text
                color={themeColor.chakraBlue6}
                borderRadius="2px"
                bgColor="white"
                as="span"
                px="4px"
              >
                Pasien
              </Text>
            </Text>
          </Flex>
        </Stack>

        <Stack w="100%" spacing="8px" pt="32px">
          {pasienSidebar.map((nav) => (
            <NextChakraLink href={nav.link}>
              <Button
                _hover={{
                  bgColor: "white",
                  color: themeColor.chakraBlue6
                }}
                bgColor={router.pathname.includes(nav.link) ? "transparent" : "white"}
                color={router.pathname.includes(nav.link) ? "white" : themeColor.chakraBlue6}
                w="100%"
              >
                <HStack w="100%" spacing="12px">
                  <Text>{nav.label}</Text>
                </HStack>
              </Button>
            </NextChakraLink>
          ))}
        </Stack>

        <Spacer />
        <Divider />
        <HStack spacing="12px" w="100%" color="white">
          <Avatar name={"nama"} src={""} boxSize="10" />
          <Box>
            <Text fontWeight="medium" fontSize="sm">
              {"nama"}
            </Text>
            <Text color="#EBF8FF" fontSize="sm">
              {"email"}
            </Text>
          </Box>
        </HStack>

      </Stack>

      {/* CORE */}
      <Flex
        p="32px 24px"
        w="100%"
      >
        {children}
      </Flex>

    </Flex>
  )
};

export default LayoutAdmin;