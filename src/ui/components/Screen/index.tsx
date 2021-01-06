import { h, FunctionComponent } from 'preact'
import { ScreenContainer } from './style.css'

export const Screen: FunctionComponent = ({ children }) => (
  <ScreenContainer>
    {children}
  </ScreenContainer>
)