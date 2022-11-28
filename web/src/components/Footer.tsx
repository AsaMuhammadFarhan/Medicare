import { Stack, Text } from "@chakra-ui/react";
import themeColor from "../utils/color";
import { NextChakraLinkWithHover } from "./NextChakraLink";

export const SimpleFooter = () => {
  const currentYear: number = new Date().getFullYear();

  const footerLinks = [
    { title: "Home", link: "/" },
    { title: "Privacy Police", link: "/privacy" },
  ];

  return (
    <Stack
      direction={["column-reverse", "column-reverse", "row"]}
      bgColor={themeColor.chakraBlue6}
      justify="space-between"
      spacing="16px"
      color="white"
      p="16px"
      w="100%"
      h="56px"
    >
      <Text>
        Copyright {currentYear} ©
      </Text>
      <Stack
        direction={["column", "column", "row"]}
        spacing="16px"
      >
        {footerLinks.map((link) => (
          <FooterLink
            key={link.title}
            title={link.title}
            link={link.link}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export const FooterLink = ({ title, link }: { title: string; link: string; }) => {
  return (
    <NextChakraLinkWithHover href={link} title={title}>
      {title}
    </NextChakraLinkWithHover>
  );
}