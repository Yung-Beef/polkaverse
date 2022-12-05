import React from 'react'
import TxButton from './TxButton'

export const FollowButtonStub = React.memo(() => (
  <TxButton
    type='primary'
    ghost={true}
    label='Follow'
    tx={'spaceFollows.followSpace'}
    params={[]}
  />
))
