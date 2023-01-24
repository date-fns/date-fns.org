import type { DateFnsDocs } from '@date-fns/docs/types'
import { FunctionComponent, h } from 'preact'
import { useContext, useEffect, useMemo } from 'preact/hooks'
import { RouterContext } from '~/ui/router'
import { TypeDocFunction } from './Function'
import { useTypesModal } from './Types'
import { parse } from 'typeroo'
import { TypeDocConstants } from './Constants'
import type { DeclarationReflection } from 'typedoc'

interface TypeDocProps {
  page: DateFnsDocs.TypeDocPage
}

const typeHashRE = /types\/(\w+)\/(\w+)/

export const TypeDoc: FunctionComponent<TypeDocProps> = ({ page }) => {
  const { location, navigate } = useContext(RouterContext)
  const showTypesModal = useTypesModal()
  const doc = useMemo(() => parse(page.doc), [page.slug])

  useEffect(() => {
    const captures = location.hash.match(typeHashRE)
    if (!captures) return

    const type = captures[2]
    if (!type) return

    const typeId = parseInt(type)
    if (isNaN(typeId)) return

    showTypesModal({
      typeId,
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
