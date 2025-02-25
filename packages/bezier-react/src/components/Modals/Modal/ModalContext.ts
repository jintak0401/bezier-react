import { createContext } from '~/src/utils/react'

import { type ModalContentPropsContextValue } from './Modal.types'

export const [
  ModalContentPropsContextProvider,
  useModalContentPropsContext,
] = createContext<ModalContentPropsContextValue>({
  showCloseIcon: false,
})

export const [
  ModalContainerContextProvider,
  useModalContainerContext,
] = createContext<HTMLElement | undefined>(undefined)
