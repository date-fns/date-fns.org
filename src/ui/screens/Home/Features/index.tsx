import { h } from 'preact'
import { HomeBlock } from '~/ui/components/Home'
import { features } from './features'
import * as styles from './styles.css'
import classNames from 'classnames'

export const Features = () => (
  <HomeBlock header="Why date-fns?">
    <ol class={styles.list}>
      {features.map((feature) => (
        <li class={styles.item} key={feature.title}>
          <div class={classNames(styles.icon, styles.iconType[feature.icon])} />
          <div class={styles.content}>
            <h3 class={styles.title}>{feature.title}</h3>
            <div class={styles.description}>{feature.description}</div>
          </div>
        </li>
      ))}
    </ol>
  </HomeBlock>
)
