import { h, FunctionComponent } from 'preact'
import { RouterLink } from 'ui/router'
import { Container, Inner, Logo, LogoImage, Links, Link } from './style.css'
import logoPath from './img/logo.svg'
import { VersionPreview } from 'db'
import { VersionSelector } from './VersionSelector'

interface Props {
  selectedVersion: string
  latestVersion: string
  selectedDoc: string
  versions: VersionPreview[]
}

export const NavBar: FunctionComponent<Props> = ({ versions, selectedVersion, selectedDoc, latestVersion }) => (
  <Container>
    <Inner>
      <Links>
        <Logo tag={RouterLink} to={{ name: 'home' }}>
          <LogoImage tag="img" src={logoPath} />
          date-fns
        </Logo>

        <Link
          tag="a"
          href="https://github.com/date-fns/date-fns"
        >
          GitHub
        </Link>

        <Link tag="a" href="https://twitter.com/date_fns">
          Twitter
        </Link>

        <Link
          tag="a"
          href="https://spectrum.chat/date-fns"
        >
          Community
        </Link>
      </Links>

      <div>
        <VersionSelector
          selectedVersion={selectedVersion}
          latestVersion={latestVersion}
          selectedDoc={selectedDoc}
          versions={versions}
        />

        {/* 
        FIXME:
        <SubmoduleSelector
          docId={docId}
          docs={docs}
          selectedSubmodule={selectedSubmodule}
          selectedVersion={selectedVersion}
          selectedVersionTag={selectedVersionTag}
          routeData={routeData}
        /> */}
      </div>
    </Inner>
  </Container>
)
