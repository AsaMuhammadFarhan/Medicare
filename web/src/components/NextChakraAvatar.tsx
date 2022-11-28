import { Avatar, Flex } from "@chakra-ui/react";
import Image from "next/image";

const NextChakraAvatar = ({
  size,
  src,
  name,
  alt,
  objectFit = "cover",
  title,
}: {
  // Box
  size: string;
  src: string | null | undefined;
  // Image
	objectFit?: "-moz-initial" | "contain" | "cover" | "fill" | "inherit" | "initial" | "none" | "revert" | "scale-down" | "unset";
  name: string | null | undefined;
  alt?: string;
  title?: string;
}) => {

  return (
    <Flex
      position="relative"
      overflow="hidden"
      flexShrink={0}
      rounded="full"
      boxSize={size}
    >
      {src ? (
        <Image
          title={title ?? alt ?? name ?? undefined}
          alt={alt ?? alt ?? name ?? undefined}
          objectFit={objectFit}
          layout="fill"
          sizes={size}
          src={src}
        />
      ) : (
        <Avatar
          title={title ?? alt ?? name ?? undefined}
          name={name ?? undefined}
          src={src ?? undefined}
          boxSize={size}
        />
      )}
    </Flex>
  );
};

export default NextChakraAvatar;