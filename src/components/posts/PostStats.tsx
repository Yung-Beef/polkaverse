import { nonEmptyStr } from '@subsocial/utils'
import { useState } from 'react'
import { idToBn, PostStruct } from 'src/types'
import { MutedSpan } from '../utils/MutedText'
import { Pluralize } from '../utils/Plularize'
import { ActiveVoters, PostVoters } from '../voting/ListVoters'

type StatsProps = {
  post: PostStruct
  goToCommentsId?: string
}

export const StatsPanel = (props: StatsProps) => {
  const { post, goToCommentsId } = props

  const [commentsSection, setCommentsSection] = useState(false)
  const [postVotersOpen, setPostVotersOpen] = useState(false)

  const { upvotesCount, downvotesCount, repliesCount, sharesCount, id } = post
  const reactionsCount = upvotesCount + downvotesCount
  const showReactionsModal = () => reactionsCount && setPostVotersOpen(true)

  const toggleCommentsSection = goToCommentsId
    ? undefined
    : () => setCommentsSection(!commentsSection)
  const comments = <Pluralize count={repliesCount || 0} singularText='Comment' />

  return (
    <>
      <div className='DfCountsPreview'>
        <MutedSpan className={reactionsCount ? '' : 'disable'}>
          <span onClick={showReactionsModal}>
            <Pluralize count={reactionsCount} singularText='Reaction' />
          </span>
        </MutedSpan>
        <MutedSpan>
          {nonEmptyStr(goToCommentsId) ? (
            <a className='DfMutedLink' href={'#' + goToCommentsId}>
              {comments}
            </a>
          ) : (
            <span onClick={toggleCommentsSection}>{comments}</span>
          )}
        </MutedSpan>
        {
          <MutedSpan>
            <Pluralize count={sharesCount || 0} singularText='Share' />
          </MutedSpan>
        }
        {/* <MutedSpan><Pluralize count={score} singularText='Point' /></MutedSpan> */}
      </div>
      <PostVoters
        id={idToBn(id)}
        active={ActiveVoters.All}
        open={postVotersOpen}
        close={() => setPostVotersOpen(false)}
      />
    </>
  )
}
