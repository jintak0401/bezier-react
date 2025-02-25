import {
  css,
  styled,
} from '~/src/foundation'

import { type InterpolationProps } from '~/src/types/Foundation'

import { Icon } from '~/src/components/Icon'
import { LegacyIcon } from '~/src/components/LegacyIcon'
import { Text } from '~/src/components/Text'

const clickableElementStyle = css`
  &.clickable {
    cursor: pointer;
  }
`

const LeftIcon = styled(Icon)`
  ${clickableElementStyle}
`

const LegacyLeftIcon = styled(LegacyIcon)`
  ${clickableElementStyle}
`

const LeftContentWrapper = styled.div<InterpolationProps>`
  display: flex;
  align-items: center;
  padding-left: 6px;

  ${({ interpolation }) => interpolation}
`

const ContentText = styled(Text)`
  overflow: hidden;
  color: ${({ foundation }) => foundation?.theme?.['txt-black-dark']};
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ContentWrapper = styled.div<InterpolationProps>`
  display: flex;
  align-items: center;
  padding-left: 6px;
  overflow: hidden;

  ${({ interpolation }) => interpolation}
`

const HelpContainer = styled.div`
  margin-left: 8px;
`

const RightContentWrapper = styled.div<InterpolationProps>`
  display: flex;
  align-items: center;
  padding-left: 6px;
  margin: 0 6px 0 auto;

  ${({ interpolation }) => interpolation}
`

const RightItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  ${clickableElementStyle}
`

const ChildrenWrapper = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'unset' : 'none')};
`

const Wrapper = styled.div<InterpolationProps>`
  display: flex;
  align-items: center;
  height: 28px;

  ${clickableElementStyle}

  ${({ interpolation }) => interpolation}
`

export default {
  LeftIcon,
  LeftContentWrapper,
  LegacyLeftIcon,
  ContentText,
  ContentWrapper,
  HelpContainer,
  RightContentWrapper,
  RightItemWrapper,
  ChildrenWrapper,
  Wrapper,
}
