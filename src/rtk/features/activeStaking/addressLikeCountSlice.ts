import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { getAddressLikeCountToPosts } from 'src/components/utils/datahub/super-likes'
import { RootState } from 'src/rtk/app/rootReducer'
import { createSimpleFetchWrapper } from 'src/rtk/app/wrappers'

export type AddressLikeCount = {
  address: string
  postId: string
  count: number
}

const sliceName = 'addressLikeCount'

export function getAddressLikeCountId({
  address,
  postId,
}: Pick<AddressLikeCount, 'address' | 'postId'>) {
  return `${address}-${postId}`
}
const adapter = createEntityAdapter<AddressLikeCount>({
  selectId: data => getAddressLikeCountId(data),
})
const selectors = adapter.getSelectors<RootState>(state => state.addressLikeCount)

export const selectAddressLikeCount = selectors.selectById
export const selectAllAddressLikeCounts = selectors.selectEntities

function getAllPostIdsFromStore(state: RootState) {
  return state.posts.ids as string[]
}
export const fetchAddressLikeCountSlice = createSimpleFetchWrapper<
  { postIds: string[] | null; address: string },
  AddressLikeCount[]
>({
  fetchData: async function ({ postIds, address }, state) {
    if (postIds === null) {
      postIds = getAllPostIdsFromStore(state)
    }
    return await getAddressLikeCountToPosts(address, postIds)
  },
  saveToCacheAction: data => slice.actions.setSuperLikeCounts(data),
  getCachedData: (state, { postIds, address }) => {
    if (postIds === null) {
      postIds = getAllPostIdsFromStore(state)
    }

    const entities = selectAllAddressLikeCounts(state)
    let isEveryDataCached = true

    const postEntities: AddressLikeCount[] = []
    for (let i = 0; i < postIds.length; i++) {
      const postId = getAddressLikeCountId({ address, postId: postIds[i] })
      if (!entities[postId]) {
        isEveryDataCached = false
        break
      } else {
        postEntities.push(entities[postId]!)
      }
    }

    if (isEveryDataCached) {
      return postEntities
    }
    return undefined
  },
  sliceName,
})

const slice = createSlice({
  name: sliceName,
  initialState: adapter.getInitialState(),
  reducers: {
    setSuperLikeCounts: adapter.upsertMany,
  },
})

export default slice.reducer
