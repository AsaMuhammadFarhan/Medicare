import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import themeColor from "../utils/color";
import { useIsAuth } from "../utils/useIsAuth";
import Logo from "./Logo";
import { OriginalMetaTags } from "./MetaTags";

const LayoutGeneral: React.FC<{ roleAccess?: string[]; metaTitle?: string;}> = ({
  children,
  roleAccess,
  metaTitle,
}) => {
  useIsAuth(roleAccess);

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
        p="32px 24px"
        w="320px"
      >
        <Logo size="24px" color="white" />
        <Flex color="white" fontSize="24px" alignItems="center">
          <Text fontWeight={600} mr="16px">
            Medicare{" "}
            <Text
              color={themeColor.chakraBlue6}
              borderRadius="4px"
              bgColor="white"
              as="span"
              px="8px"
            >
              Admin
            </Text>
          </Text>
        </Flex>

      </Stack>

      {/* CORE */}
      <Flex w="100%"></Flex>
      {children}

    </Flex>
  )
};

export default LayoutGeneral;