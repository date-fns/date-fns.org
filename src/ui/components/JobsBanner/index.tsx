import { h, FunctionComponent } from 'preact'
// import classnames from 'classnames'
// import { trackAction } from 'app/acts/tracking_acts'
import { Icon } from './Icon'
import { Emoji } from './Emoji'
import { Container, Inner, EmojiWrapper } from './style.css'
import { useEffect, useState } from 'preact/hooks'

interface Props {
  size: 'small' | 'large'
}

export const JobsBanner: FunctionComponent<Props> = ({ size }) => {
  const [kind, setKind] = useState<null | 'subscribe' | 'recommend'>(null)
  useEffect(() => setKind(Math.random() > 0.5 ? 'subscribe' : 'recommend'), [])

  return (
    <Container
      tag="a"
      size={size}
      href={
        kind === 'subscribe'
          ? 'https://jobs.date-fns.org'
          : 'https://jobs.date-fns.org/#recommend'
      }
      target="_blank"
      rel="noopener noreferrer"
      onClick={
        () => console.log('FIXME') /*trackAction('Banner click', { kind }) */
      }
    >
      <Inner>
        <EmojiWrapper>
          <Emoji />
        </EmojiWrapper>
        <div>
          {kind === 'subscribe' &&
            'Get jobs worth sharing to your email! JavaScript jobs by date-fns'}
          {kind === 'recommend' &&
            "Know someone who's looking for JavaScript devs? Recommend us a job!"}
          <Icon />
        </div>
      </Inner>
    </Container>
  )
}
