import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { useMemo } from 'react'
import config from 'src/config'

const { enableGraphQl, graphqlUrl } = config

let apolloClient: ApolloClient<NormalizedCacheObject>

export function getApolloClient() {
  if (!apolloClient) return initializeApollo()
  return apolloClient
}

const createApolloClient = (graphqlUrl: string): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri: graphqlUrl,
    cache: new InMemoryCache(),
  })
}

export const initializeApollo = (initialState: any = null) => {
  if (!enableGraphQl || !graphqlUrl)
    throw new Error('Graphql is disabled or graphql URL is not set')

  const _apolloClient = apolloClient ?? createApolloClient(graphqlUrl)

  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }

  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const useApollo = (initialState?: NormalizedCacheObject) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
