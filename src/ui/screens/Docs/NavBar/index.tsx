import { defaultSubmodule } from "@date-fns/docs/consts";
import type { DateFnsDocs } from "@date-fns/docs/types";
import { FunctionComponent, h, VNode } from "preact";
import { RouterLink } from "~/ui/router";
import { SubmoduleSelector } from "./SubmoduleSelector";
import { VersionSelector } from "./VersionSelector";
import logoPath from "./img/logo.svg";
import * as styles from "./styles.css";

interface Props {
  selectedVersion?: string;
  latestVersion?: string;
  selectedPage?: string;
  versions?: DateFnsDocs.VersionPreview[];
  selectedSubmodule?: DateFnsDocs.Submodule;
  menuIcon?: VNode;
}

export const NavBar: FunctionComponent<Props> = ({
  versions,
  selectedVersion,
  selectedPage,
  latestVersion,
  selectedSubmodule,
  menuIcon,
}) => {
  const versionPreview = versions?.find(
    ({ version }) => version === selectedVersion,
  );
  const submodules = versionPreview?.submodules ?? [defaultSubmodule];

  return (
    <div class={styles.container}>
      <div class={styles.outer}>
        <div class={styles.inner}>
          <div class={styles.links}>
            {menuIcon && <div class={styles.menuIcon}>{menuIcon}</div>}

            <RouterLink class={styles.logo} to={{ name: "home" }}>
              <img class={styles.logoImage} src={logoPath} />
              date-fns
            </RouterLink>

            <a class={styles.link} href="/docs/Getting-Started">
              Documentation
            </a>

            <a class={styles.link} href="https://github.com/date-fns/date-fns">
              GitHub
            </a>

            <a
              class={styles.link}
              href="https://github.com/date-fns/date-fns/discussions"
            >
              Community
            </a>

            <a class={styles.link} href="https://twitter.com/date_fns">
              Twitter
            </a>

            <a class={styles.link} href="https://jobs.date-fns.org">
              JS Jobs
            </a>
          </div>

          {versions &&
            selectedVersion &&
            latestVersion &&
            selectedPage &&
            selectedSubmodule && (
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
            )}
        </div>
      </div>
    </div>
  );
};
