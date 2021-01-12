import { h, FunctionComponent } from 'preact'
import { RouterLink } from '~/ui/router'
import { Container, Inner, Logo, LogoImage, Links, Link } from './style.css'
import logoPath from './img/logo.svg'
import {
  DEFAULT_SUBMODULE,
  Submodule,
  VersionPreview,
} from '@date-fns/date-fns-db'
import { VersionSelector } from './VersionSelector'
import { SubmoduleSelector } from './SubmoduleSelector'

interface Props {
  selectedVersion: string
  latestVersion: string
  selectedPage: string
  versions: VersionPreview[]
  selectedSubmodule: Submodule
}

export const NavBar: FunctionComponent<Props> = ({
  versions,
  selectedVersion,
  selectedPage,
  latestVersion,
  selectedSubmodule,
}) => {
  const versionPreview = versions.find(
    ({ version }) => version === selectedVersion
  )
  const submodules = versionPreview?.submodules ?? [DEFAULT_SUBMODULE]

  return (
    <Container>
      <Inner>
        <Links>
          <Logo tag={RouterLink} to={{ name: 'home' }}>
            <LogoImage tag="img" src={logoPath} />
            date-fns
          </Logo>

          <Link tag="a" href="https://github.com/date-fns/date-fns">
            GitHub
          </Link>

          <Link tag="a" href="https://github.com/date-fns/date-fns/discussions">
            Community
          </Link>

          <Link tag="a" href="https://twitter.com/date_fns">
            Twitter
          </Link>
        </Links>

        <div>
          <VersionSelector
            selectedVersion={selectedVersion}
            latestVersion={latestVersion}
            selectedPage={selectedPage}
            selectedSubmodule={selectedSubmodule}
            versions={versions}
          />

          <SubmoduleSelector
            selectedSubmodule={selectedSubmodule}
            selectedPage={selectedPage}
            selectedVersion={selectedVersion}
            submodules={submodules}
          />
        </div>
      </Inner>
    </Container>
  )
}
