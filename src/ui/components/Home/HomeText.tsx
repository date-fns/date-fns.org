import { h, FunctionComponent } from 'preact'
import { Text } from './style.css'

export const HomeText: FunctionComponent = ({ children }) => (
  <Text>{children}</Text>
)
