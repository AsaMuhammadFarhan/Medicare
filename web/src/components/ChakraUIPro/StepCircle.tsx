import { Circle, Icon, SquareProps } from '@chakra-ui/react'
import { HiCheck } from 'react-icons/hi'
import themeColor from '../../utils/color'

interface RadioCircleProps extends SquareProps {
  isCompleted: boolean
  isActive: boolean
}

export const StepCircle = (props: RadioCircleProps) => {
  const { isCompleted, isActive } = props
  return (
    <Circle
      size="8"
      bg={isCompleted ? themeColor.chakraBlue6 : 'inherit'}
      borderWidth={isCompleted ? '0' : '2px'}
      borderColor={isActive ? themeColor.chakraBlue6 : 'inherit'}
      {...props}
    >
      {isCompleted ? (
        <Icon as={HiCheck} color="white" boxSize="5" />
      ) : (
        <Circle bg={isActive ? themeColor.chakraBlue6 : 'border'} size="3" />
      )}
    </Circle>
  )
}