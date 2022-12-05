import React from 'react'
import { AnyAccountId, ProfileData } from 'src/types'

export type AddressProps = {
  className?: string
  style?: React.CSSProperties
  address: AnyAccountId
  owner?: ProfileData
}

export type ExtendedAddressProps = AddressProps & {
  children?: React.ReactNode
  afterName?: JSX.Element
  details?: JSX.Element
  isPadded?: boolean
  isShort?: boolean
  size?: number
  withFollowButton?: boolean
  spaceId?: string
}
