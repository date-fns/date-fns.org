import classNames from 'classnames'
import { ComponentChildren, Fragment, FunctionComponent, h } from 'preact'
import * as styles from './styles.css'

interface EntitiesProps {
  children: ComponentChildren
  alwaysMulti?: boolean
}

export const Entities: FunctionComponent<EntitiesProps> = ({
  children,
  alwaysMulti,
}) => {
  const solo = !Array.isArray(children) || children.length === 1
  const childrenArr = Array.isArray(children) ? children : [children]

  return (
    <div>
      {childrenArr.map((child, index) => (
        <div
          class={classNames(
            styles.entity,
            (!solo || alwaysMulti) && styles.miltiEntity
          )}
          key={index}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
