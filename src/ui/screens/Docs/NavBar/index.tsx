import { h, FunctionComponent } from 'preact'
import { RouterLink } from '~/ui/router'
import {
  Container,
  Inner,
  Logo,
  LogoImage,
  Links,
  Link,
  MenuIcon,
} from './style.css'
import logoPath from './img/logo.svg'
import { defaultSubmodule } from '@date-fns/docs/consts'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { VersionSelector } from './VersionSelector'
import { SubmoduleSelector } from './SubmoduleSelector'

interface Props {
  selectedVersion: string
  latestVersion: string
  selectedPage: string
  versions: DateFnsDocs.VersionPreview[]
  selectedSubmodule: DateFnsDocs.Submodule
  menuIcon: React.ReactNode
}

export const NavBar: FunctionComponent<Props> = ({
  versions,
  selectedVersion,
  selectedPage,
  latestVersion,
  selectedSubmodule,
  menuIcon,
}) => {
  const versionPreview = versions.find(
    ({ version }) => version === selectedVersion
  )
  const submodules = versionPreview?.submodules ?? [defaultSubmodule]

  return (
    <Container>
      <Inner>
        <Links>
          <MenuIcon>{menuIcon}</MenuIcon>

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

          <Link tag="a" href="https://jobs.date-fns.org">
            JS Jobs
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
