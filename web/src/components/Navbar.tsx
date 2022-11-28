import { Flex, HStack, Text } from "@chakra-ui/react";
import themeColor from "../utils/color";

export const Navbar = () => {
  return (
    <Flex
      bgColor={themeColor.chakraBlue6}
      justify="center"
      color="white"
      h="40px"
      w="100%"
    >
      <HStack
        maxW="1056px"
        p="8px 16px"
        w="100%"
      >
        <Text>
          Navbar
        </Text>
      </HStack>
    </Flex>
  );
}