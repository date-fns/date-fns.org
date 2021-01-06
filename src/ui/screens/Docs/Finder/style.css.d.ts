import { CSSComponent, CSSPreactComponent } from 'types/decss'
import { RouterLink } from 'ui/router'

export const Container: CSSComponent
export const LogoImage: CSSComponent
export const Search: CSSComponent
export const SearchField: CSSComponent
export const SearchCancel: CSSComponent
export const CategoriesList: CSSComponent
export const Category: CSSComponent
export const CategoryHeader: CSSComponent
export const Item: CSSPreactComponent<typeof RouterLink, { isCurrent?: boolean }>
export const ItemHeader: CSSComponent
export const ItemText: CSSComponent
export const ItemIcon: CSSComponent
export const NoResultsContainer: CSSComponent
export const NoResultsText: CSSComponent
