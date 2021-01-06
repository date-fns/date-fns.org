import { h } from 'preact'
import { NoResultsContainer, NoResultsText } from './style.css'

export const NoResults = () => (
  <NoResultsContainer>
    <NoResultsText tag="p">
      Your search didn't match any results.
    </NoResultsText>
  </NoResultsContainer>
)
