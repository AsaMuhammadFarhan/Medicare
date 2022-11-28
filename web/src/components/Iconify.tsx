import { Flex } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

const Iconify = ({
  icon,
  boxSize = "16px",
  color,
  // Flex optional
  ml,
  mr,
  mt,
  mb,
  onClick,
  cursor,
}: {
  icon: string;
  boxSize?: string;
  color?: string;
  // Flex optional
  ml?: string;
  mr?: string;
  mt?: string;
  mb?: string;
  onClick?: () => void;
  cursor?: string;
}) => {
  return (
    <Flex
      fontSize={boxSize}
      onClick={onClick}
      boxSize={boxSize}
      cursor={cursor}
      flexShrink={0}
      color={color}
      ml={ml}
      mr={mr}
      mt={mt}
      mb={mb}
    >
      <Icon icon={icon} />
    </Flex>
  )
}

export default Iconify;