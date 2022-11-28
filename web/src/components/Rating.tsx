import { HStack, StackProps } from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import * as React from 'react'
import themeColor from '../utils/color';

interface Props {
  defaultValue?: number;
  max?: number;
  size?: string;
  rootProps?: StackProps;
  color?: string;
}

export const Rating = ({
  defaultValue = 0, max = 5, size = '16px', rootProps, color = themeColor.chakraBlue6
}: Props) => {
  return (
    <HStack spacing="2px" {...rootProps} pt="2px">
      {Array.from({ length: max })
        .map((_, index) => index + 1)
        .map((index) => (
          <Icon
            icon={index <= defaultValue ? "bxs:star" : "bx:star"}
            fontSize={size}
            color={color}
            key={index}
          />
        ))}
    </HStack>
  )
}