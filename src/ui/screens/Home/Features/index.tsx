import { h } from 'preact'
import { HomeBlock } from 'ui/components/Home'
import {
  List,
  Item,
  Icon,
  Content,
  Title,
  Description
} from './style.css'
import { features } from './features'

export const Features = () => (
  <HomeBlock header="Why date-fns?">
    <List tag="ol">
      {features.map(feature => (
        <Item tag="li" key={feature.title}>
          <Icon type={feature.icon} />
          <Content>
            <Title>{feature.title}</Title>
            <Description>{feature.description}</Description>
          </Content>
        </Item>
      ))}
    </List>
  </HomeBlock>
)
export default Features
