import { h, ComponentChild, FunctionComponent } from 'preact'
import { Block, InnerContainer, Header, SubHeader, Content, Actions } from './style.css'

interface Props {
  header?: ComponentChild
  subHeader?: ComponentChild
  actions?: ComponentChild
}

export const HomeBlock: FunctionComponent<Props> = ({
  header,
  subHeader,
  actions,
  children
}) => (
  <Block>
    <InnerContainer>
      {header && <Header>{header}</Header>}

      {subHeader && <SubHeader>{subHeader}</SubHeader>}

      <Content>{children}</Content>

      <Actions>{actions}</Actions>
    </InnerContainer>
  </Block>
)
