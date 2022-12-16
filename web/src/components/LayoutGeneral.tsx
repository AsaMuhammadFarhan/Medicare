import {
  Avatar,
  Button,
  Divider,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
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
    label: "Reservasi",
    link: "/admin/reservasi",
  },
  {
    label: "Daftar Dokter",
    link: "/admin/daftar-dokter",
  },
  {
    label: "Gudang",
    link: "/admin/gudang",
  },
];

const adminPoliSidebar = [
  {
    label: "Dasboard",
    link: "/admin-poli/dashboard",
  },
  {
    label: "Kunjungan",
    link: "/admin-poli/kunjungan",
  },
];

const cashierSidebar = [
  {
    label: "Payment",
    link: "/cashier/payment",
  },
];

const pasienSidebar = [
  {
    label: "Dasboard",
    link: "/pasien/dashboard",
  },
  {
    label: "Buat Reservasi",
    link: "/pasien/reservasi",
  },
  {
    label: "Akun",
    link: "/pasien/data-akun",
  },
];

const LayoutAdmin: React.FC<{
  metaTitle?: string;
}> = ({
  children,
  metaTitle,
}) => {
    useIsAuth(["admin"]);
    const router = useRouter();

    const [me] = useMeQuery();
    const [, logout] = useLogoutMutation();

    const handleClickLogout = () => {
      logout().then((result) => {
        if (result.error) {
          alert(result.error.message);
          return;
        }
        router.push("/login").then(() => router.reload());
      })
    }

    return (
      <Flex
        position="relative"
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
          position="sticky"
          flexShrink={0}
          spacing="16px"
          p="32px 24px"
          top="0px"
          w="320px"
          h="100vh"
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
                  bgColor={router.pathname.includes(nav.link) ? "white" : "transparent"}
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
          <NextChakraLink href="/admin/special-register" w="100%">
            <Button
              _hover={{
                bgColor: "white",
                color: themeColor.chakraBlue6
              }}
              bgColor="transparent"
              color="white"
              w="100%"
            >
              <Text ml="16px">Buat Akun Khusus</Text>
            </Button>
          </NextChakraLink>
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

          {(me.data?.me?.username) && (
            <>
              <Divider />
              <Menu>
                <MenuButton w="100%">
                  <HStack spacing="12px" w="100%" color="white" overflow="hidden">
                    <Avatar name={me.data.me.username} src={undefined} boxSize="10" />
                    <Flex direction="column" alignItems="start">
                      <Text fontWeight="medium" fontSize="sm">
                        {me.data.me.username}
                      </Text>
                      <Text color="#EBF8FF" fontSize="sm" noOfLines={1}>
                        {me.data.me.email}
                      </Text>
                    </Flex>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={handleClickLogout}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
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

export const LayoutAdminPoli: React.FC<{
  metaTitle?: string;
}> = ({
  children,
  metaTitle,
}) => {
    useIsAuth(["admin-poli"]);
    const router = useRouter();

    const [me] = useMeQuery();
    const [, logout] = useLogoutMutation();

    const handleClickLogout = () => {
      logout().then((result) => {
        if (result.error) {
          alert(result.error.message);
          return;
        }
        router.push("/login").then(() => router.reload());
      })
    }

    return (
      <Flex
        position="relative"
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
          position="sticky"
          flexShrink={0}
          spacing="16px"
          p="32px 24px"
          top="0px"
          w="320px"
          h="100vh"
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
                  Poli
                </Text>
              </Text>
            </Flex>
          </Stack>

          <Stack w="100%" spacing="8px" pt="32px">
            {adminPoliSidebar.map((nav) => (
              <NextChakraLink href={nav.link} key={nav.link}>
                <Button
                  _hover={{
                    bgColor: "white",
                    color: themeColor.chakraBlue6
                  }}
                  bgColor={router.pathname.includes(nav.link) ? "white" : "transparent"}
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

          {(me.data?.me?.username) && (
            <>
              <Divider />
              <Menu>
                <MenuButton w="100%">
                  <HStack spacing="12px" w="100%" color="white" overflow="hidden">
                    <Avatar name={me.data.me.username} src={undefined} boxSize="10" />
                    <Flex direction="column" alignItems="start">
                      <Text fontWeight="medium" fontSize="sm">
                        {me.data.me.username}
                      </Text>
                      <Text color="#EBF8FF" fontSize="sm" noOfLines={1}>
                        {me.data.me.email}
                      </Text>
                    </Flex>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={handleClickLogout}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
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

export const LayoutCashier: React.FC<{
  metaTitle?: string;
}> = ({
  children,
  metaTitle,
}) => {
    useIsAuth(["cashier"]);
    const router = useRouter();

    const [me] = useMeQuery();
    const [, logout] = useLogoutMutation();

    const handleClickLogout = () => {
      logout().then((result) => {
        if (result.error) {
          alert(result.error.message);
          return;
        }
        router.push("/login").then(() => router.reload());
      })
    }

    return (
      <Flex
        position="relative"
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
          position="sticky"
          flexShrink={0}
          spacing="16px"
          p="32px 24px"
          top="0px"
          w="320px"
          h="100vh"
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
                  Kasir
                </Text>
              </Text>
            </Flex>
          </Stack>

          <Stack w="100%" spacing="8px" pt="32px">
            {cashierSidebar.map((nav) => (
              <NextChakraLink href={nav.link} key={nav.link}>
                <Button
                  _hover={{
                    bgColor: "white",
                    color: themeColor.chakraBlue6
                  }}
                  bgColor={router.pathname.includes(nav.link) ? "white" : "transparent"}
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

          {(me.data?.me?.username) && (
            <>
              <Divider />
              <Menu>
                <MenuButton w="100%">
                  <HStack spacing="12px" w="100%" color="white" overflow="hidden">
                    <Avatar name={me.data.me.username} src={undefined} boxSize="10" />
                    <Flex direction="column" alignItems="start">
                      <Text fontWeight="medium" fontSize="sm">
                        {me.data.me.username}
                      </Text>
                      <Text color="#EBF8FF" fontSize="sm" noOfLines={1}>
                        {me.data.me.email}
                      </Text>
                    </Flex>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={handleClickLogout}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
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

export const LayoutPasien: React.FC<{
  metaTitle?: string;
}> = ({
  children,
  metaTitle,
}) => {
    useIsAuth(["guest"]);
    const router = useRouter();

    const [me] = useMeQuery();
    const [, logout] = useLogoutMutation();

    const handleClickLogout = () => {
      logout().then((result) => {
        if (result.error) {
          alert(result.error.message);
          return;
        }
        router.push("/login").then(() => router.reload());
      })
    }
    return (
      <Flex
        position="relative"
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
          position="sticky"
          flexShrink={0}
          spacing="16px"
          p="32px 24px"
          top="0px"
          w="320px"
          h="100vh"
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
                  bgColor={router.pathname.includes(nav.link) ? "white" : "transparent"}
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
          {(me.data?.me?.username) && (
            <>
              <Divider />
              <Menu>
                <MenuButton w="100%">
                  <HStack spacing="12px" w="100%" color="white" overflow="hidden">
                    <Avatar name={me.data.me.username} src={undefined} boxSize="10" />
                    <Flex direction="column" alignItems="start">
                      <Text fontWeight="medium" fontSize="sm">
                        {me.data.me.username}
                      </Text>
                      <Text color="#EBF8FF" fontSize="sm" noOfLines={1}>
                        {me.data.me.email}
                      </Text>
                    </Flex>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={handleClickLogout}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
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