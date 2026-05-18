import { FunctionComponent, h } from "preact";
import { RichText } from "~/ui/components/RichText";
import { NavBar } from "../Docs/NavBar";
import * as styles from "./styles.css";

export const YouDontNeedDateFns: FunctionComponent = () => {
  return (
    <div class={styles.screen}>
      <div class={styles.navBarContainer}>
        <NavBar
        // selectedVersion={selectedVersion}
        // latestVersion={latestVersion}
        // selectedPage={selectedPage}
        // versions={sortVersions(
        //   filterPreReleaseVersions(
        //     dateFnsPackage.data.versions,
        //     selectedVersion,
        //   ),
        // )}
        // selectedSubmodule={selectedSubmodule}
        // menuIcon={
        //   <img src={hamburgerPath} onClick={() => setMenuOpen(!menuOpen)} />
        // }
        />
      </div>

      <div class={styles.content}>
        <div class={styles.wrapper}>
          <div class={styles.inner}>
            <RichText>
              <h1>
                You Do<s>n't</s>* Need date-fns
              </h1>

              <p>
                🚧 Work in progress! The content of this page is incomplete and
                currently serves as the placeholder for future work.
              </p>

              <p>
                Since its inception, date-fns was the library that was suggested
                by numerous guides like "You Don't Need Moment.js." Now that the
                Temporal API is available in the most modern runtimes, it's time
                for date-fns to be questioned.
              </p>

              <p>
                This page is the hub for date-fns users looking into migrating
                to the Temporal API.
              </p>

              <h2>FAQ</h2>

              <h3>Can I Replace date-fns With Temporal API?</h3>

              <p>
                The Temporal API is a great addition to JavaScript, but despite
                widespread beliefs that it will make libraries like date-fns
                obsolete, it's not the case.
              </p>

              <p>
                Some date-fns functions are now available as native Temporal API
                methods that should be used instead. If you used date-fns only
                to add days, hours, or minutes to dates, then you probably can
                uninstall the library.
              </p>

              <p>
                If your use case goes beyond the most basic datetime math, then
                the answer is no, Temporal is not a batteries-included type of
                API and doesn't cover every possible need a developer working
                with datetime might have.
              </p>

              <h3>Can I use Temporal Objects with date-fns Today?</h3>

              <p>Not yet, but soon!</p>

              <p>
                The current goal of date-fns is to work toward the moment when
                all new projects default to the Temporal API and date-fns is the
                library to pick to complement it.
              </p>
              <p>
                At some point, date-fns will become a Temporal-first library.
              </p>

              <h3>Will date-fns Drop Date Support?</h3>

              <p>Not in the foreseeable future.</p>

              <p>
                date-fns will keep Date support and ship fixes and improvements
                even after it becomes a Temporal-first library.
              </p>

              <p>
                When Temporal adoption starts getting momentum, there will be
                millions of codebases that use Date. Many won't be able to
                migrate due to lack of resources. For some that have the
                resources, the migration will provide nothing but wasted time,
                energy, and new bugs.
              </p>

              <p>
                We prioritize stability and practicality over fashion. That's
                why we keep shipping CommonJS support when most of the libraries
                dropped it.
              </p>

              <h2>More Coming Soon!</h2>

              <p>This page will grow and expand, so come back later!</p>

              <p>
                If you have questions or ideas,{" "}
                <a
                  href="https://twitter.com/kossnocorp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DM me on Twitter
                </a>
                .
              </p>
            </RichText>
          </div>
        </div>
      </div>
    </div>
  );
};
