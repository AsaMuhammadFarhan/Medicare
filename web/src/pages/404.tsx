
import { Flex, Stack, StackDivider, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Image from "next/image";
import { SimpleFooter } from "../components/Footer";
import { OriginalMetaTags } from "../components/MetaTags";
import { Navbar } from "../components/Navbar";
import { NextChakraLinkWithHover } from "../components/NextChakraLink";
import { useMeQuery } from "../generated/graphql";
import themeColor from "../utils/color";
import { createUrqlClient } from "../utils/createUrqlClient";

const FourOFour = () => {
  const [me] = useMeQuery();
  const getLocationLink = () => {
    if (me.data?.me?.role === "admin" || me.data?.me?.role === "admin-poli") return "/admin/dashboard";
    if (me.data?.me?.role === "guest") return "/pasien/dashboard";
    return "/"
  }
  return (
    <Flex
      bgColor={themeColor.chakraBlue6}
      justify="space-between"
      alignItems="center"
      direction="column"
      display="flex"
      color="white"
      maxW="100vw"
      minH="100vh"
      w="100%"
      h="100%"
    >
      <OriginalMetaTags pageName="404" />
      <Navbar />
      <Stack
        alignItems="center"
        spacing="24px"
        maxW="1056px"
        px="16px"
        w="100%"
      >
        <Stack
          divider={<StackDivider borderWidth="4px" />}
          direction={["column", "column", "row"]}
          spacing={["16px", "16px", "36px"]}
        >
          <Stack maxW="280px">
            <Text fontWeight={600} fontSize={["32px", "32px", "60px"]}>
              Page 404
            </Text>
            <Text pl={["", "", "3px"]}>
              Halaman yang kamu cari ga ada. Kok kamu bisa sampai sini HEY!
            </Text>
          </Stack>
          <Flex
            h={["calc(100vw * 3 / 4 - 48px * 3 / 4)", "calc(100vw * 3 / 4 - 48px * 3 / 4)", "150px"]}
            w={["calc(100vw - 48px)", "calc(100vw - 48px)", "200px"]}
            border="4px solid white"
            position="relative"
            objectFit="cover"
          >
            <Image
              src="/images/tom-kaget.jpeg"
              alt="404 | Tom Kaget"
              sizes="100px"
              layout="fill"
            />
          </Flex>
        </Stack>
        <NextChakraLinkWithHover href={getLocationLink()}>
          Go Home
        </NextChakraLinkWithHover>
      </Stack>
      <SimpleFooter />
    </Flex>
  );
}

export default withUrqlClient(createUrqlClient)(FourOFour);