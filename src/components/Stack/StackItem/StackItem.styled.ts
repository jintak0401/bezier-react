/* External dependencies */
import { isNil } from 'lodash-es'

/* Internal dependencies */
import {
  css,
  styled,
} from 'Foundation'
import { flex } from 'Components/Stack/util'
import type StackItemProps from './StackItem.types'

interface ContainerProps extends
  Required<Pick<
  StackItemProps,
  | 'direction'
  | 'mainAxis'
  | 'crossAxis'
  | 'interpolation'>> {}

export const Container = styled.div<ContainerProps>`
  ${({ mainAxis }) => !isNil(mainAxis) && css`
    justify-self: ${flex(mainAxis)};
  `}

  ${({ crossAxis }) => !isNil(crossAxis) && css`
    align-self: ${flex(crossAxis)};
  `}

  flex-basis: var(--main-axis-size);
  flex-grow: var(--grow-weight);
  flex-shrink: var(--shrink-weight);

  ${({ direction }) => (
    direction === 'horizontal'
      ? css`
        margin-left: var(--margin-before);
        margin-right: var(--margin-after);
      `
      : css`
        margin-top: var(--margin-before);
        margin-bottom: var(--margin-after);
      `
  )}

  ${({ interpolation }) => interpolation}
`
