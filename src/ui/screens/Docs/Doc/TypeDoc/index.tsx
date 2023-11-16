import type { DateFnsDocs } from '@date-fns/docs/types'
import { FunctionComponent, h } from 'preact'
import { useContext, useEffect, useMemo } from 'preact/hooks'
import { parse } from 'typeroo'
import { RouterContext } from '~/ui/router'
import { matchTypeHash } from '~/utils/docs'
import { TypeDocConstants } from './Constants'
import { TypeDocFunction } from './Function'
import { useTypesModal } from './Types'

interface TypeDocProps {
  page: DateFnsDocs.TypeDocPage
}

export const TypeDoc: FunctionComponent<TypeDocProps> = ({ page }) => {
  const { location, navigate } = useContext(RouterContext)
  const doc = useMemo(() => parse(page.doc), [page.slug])
  const showTypesModal = useTypesModal()

  useEffect(() => {
    const { typeId, nestedId } = matchTypeHash(location.hash)

    if (!typeId) return

    showTypesModal({
      parent: page.title,
      typeId,
      nestedId:
        nestedId === undefined || isNaN(nestedId) ? undefined : nestedId,
      doc,
      onClose: () => {
        // TODO: Fix Switcher to allow replacing the current location
        if (location.name === '404') return
        navigate({ ...location, hash: '' })
      },
    })
  }, [window.location.href])

  switch (page.kind) {
    case 'function':
      return <TypeDocFunction page={page} doc={doc} />

    case 'constants':
      return <TypeDocConstants page={page} doc={doc} />
  }
}
