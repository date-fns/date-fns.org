import { h } from "preact";
import { HomeExternalLink } from "~/ui/components/Home";
import darkLogoPath from "./img/coderabbit-dark.svg";
import * as styles from "./styles.css";

export const Sponsors = () => (
  <div class={styles.wrapper}>
    <h3 class={styles.header}>Sponsored by:</h3>

    <HomeExternalLink href="https://coderabbit.link/datefns">
      <picture>
        <img class={styles.logo} src={darkLogoPath} alt="CodeRabbit" />
      </picture>
    </HomeExternalLink>
  </div>
);
