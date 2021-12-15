/* External dependencies */
import React, { useState, useCallback, useMemo, useRef, forwardRef, Ref, useImperativeHandle } from 'react'
import { isEmpty, noop } from 'lodash-es'

/* Internal dependencies */
import { Typography } from 'Foundation'
import { Icon, IconSize, isIconName } from 'Components/Icon'
import { Text } from 'Components/Text'
import { OverlayPosition } from 'Components/Overlay'
import useFormControlContext from 'Components/Forms/useFormControlContext'

import SelectProps, { SelectRef, SelectSize } from './Select.types'
import * as Styled from './Select.styled'

export const SELECT_CONTAINER_TEST_ID = 'bezier-react-select-container'
export const SELECT_TRIGGER_TEST_ID = 'bezier-react-select-trigger'
export const SELECT_TRIGGER_TEXT_TEST_ID = 'bezier-react-select-trigger-text'
export const SELECT_DROPDOWN_TEST_ID = 'bezier-react-select-dropdown'

const DEFAULT_DROPDOWN_MARGIN_Y = 6
const DEFAULT_DROPDOWN_Z_INDEX = 10

function Select({
  testId = SELECT_CONTAINER_TEST_ID,
  triggerTestId = SELECT_TRIGGER_TEST_ID,
  triggerTextTestId = SELECT_TRIGGER_TEXT_TEST_ID,
  dropdownTestId = SELECT_DROPDOWN_TEST_ID,
  as,
  dropdownInterpolation,
  size = SelectSize.M,
  defaultFocus = false,
  placeholder = '',
  iconComponent,
  iconColor = 'txt-black-dark',
  text,
  textColor = 'txt-black-darkest',
  withoutChevron = false,
  chevronColor = 'txt-black-darker',
  dropdownStyle,
  dropdownClassName,
  dropdownContainer,
  dropdownMarginX,
  dropdownMarginY = DEFAULT_DROPDOWN_MARGIN_Y,
  dropdownZIndex = DEFAULT_DROPDOWN_Z_INDEX,
  dropdownPosition = OverlayPosition.BottomLeft,
  onClickTrigger = noop,
  onHideDropdown = noop,
  children,
  ...rest
}: SelectProps,
forwardedRef: Ref<SelectRef>,
) {
  const contextValue = useFormControlContext()

  const {
    disabled = false,
    hasError = false,
    Wrapper,
    ...ownProps
  } = contextValue?.getFieldProps(rest) ?? {
    ...rest,
    Wrapper: React.Fragment,
  }

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  const [isDropdownOpened, setIsDropdownOpened] = useState(defaultFocus)

  const LeftComponent = useMemo(() => {
    if (isIconName(iconComponent)) {
      return (
        <Icon
          name={iconComponent}
          size={IconSize.XS}
          color={iconColor}
          marginRight={6}
        />
      )
    }

    return iconComponent
  }, [
    iconComponent,
    iconColor,
  ])

  const handleClickTrigger = useCallback((event: React.MouseEvent) => {
    if (!disabled) {
      setIsDropdownOpened(prevState => !prevState)
      onClickTrigger(event)
    }
  }, [
    disabled,
    onClickTrigger,
  ])

  const handleHideDropdown = useCallback(() => {
    setIsDropdownOpened(false)
    onHideDropdown()
  }, [onHideDropdown])

  const getDOMNode = useCallback(() => triggerRef.current, [])

  const handle = useMemo((): SelectRef => ({ handleClickTrigger, handleHideDropdown, getDOMNode }), [
    handleClickTrigger,
    handleHideDropdown,
    getDOMNode,
  ])

  useImperativeHandle(forwardedRef, () => handle)

  const hasContent = !isEmpty(text)

  // TODO: 접근성을 지키도록 개선
  return (
    <Wrapper>
      <Styled.Container
        data-testid={testId}
        ref={containerRef}
        {...ownProps}
      >
        <Styled.Trigger
          data-testid={triggerTestId}
          as={as}
          ref={triggerRef}
          size={size}
          focus={isDropdownOpened && !disabled}
          error={hasError}
          disabled={disabled}
          onClick={handleClickTrigger}
        >
          <Styled.MainContentWrapper>
            { LeftComponent }
            <Text
              testId={triggerTextTestId}
              typo={Typography.Size14}
              color={hasContent ? textColor : 'txt-black-dark'}
            >
              { hasContent ? text : placeholder }
            </Text>
          </Styled.MainContentWrapper>
          { !withoutChevron && (
          <Icon
            name={`chevron-${isDropdownOpened ? 'up' : 'down'}` as const}
            size={IconSize.XS}
            color={chevronColor}
            marginLeft={6}
          />
          ) }
        </Styled.Trigger>

        <Styled.Dropdown
          style={dropdownStyle}
          className={dropdownClassName}
          testId={dropdownTestId}
          withTransition
          show={isDropdownOpened && !disabled}
          zIndex={dropdownZIndex}
          marginX={dropdownMarginX}
          marginY={dropdownMarginY}
          target={triggerRef.current}
          container={dropdownContainer || containerRef.current}
          position={dropdownPosition}
          interpolation={dropdownInterpolation}
          onHide={handleHideDropdown}
        >
          { children }
        </Styled.Dropdown>
      </Styled.Container>
    </Wrapper>
  )
}

export default forwardRef(Select)
