/* Internal dependencies */
import React from 'react'
import type {
  BezierComponentProps,
  ContentProps,
  VariantProps,
  LinkProps,
  DisableProps,
  ActivatableProps,
  OptionItemProps,
  SideContentProps,
  AdditionalStylableProps,
} from 'Types/ComponentProps'
import type { IconName } from 'Components/Icon'

export enum ListItemSize {
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

export enum ListItemVariant {
  Blue = 'blue',
  Red = 'red',
  Green = 'green',
  Cobalt = 'cobalt',
  Monochrome = 'monochrome',
}

type MouseEventHandler = React.MouseEventHandler

interface ListItemOptions {
  size?: ListItemSize
  name?: string
  hide?: boolean
  nested?: boolean
  leftIcon?: IconName
  focused?: boolean
  disableIconActive?: boolean
  descriptionMaxLines?: number
  description?: React.ReactNode
  onClick?: (e: React.MouseEvent, name?: string) => void
  onMouseDown?: MouseEventHandler
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
}

export default interface ListItemProps extends
  BezierComponentProps,
  ContentProps,
  SideContentProps,
  VariantProps<ListItemVariant>,
  LinkProps,
  DisableProps,
  ActivatableProps,
  OptionItemProps,
  AdditionalStylableProps<['icon', 'content']>,
  ListItemOptions {}
