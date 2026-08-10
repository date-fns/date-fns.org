import { h } from "preact";
// import { JobsBanner } from '~/ui/components/JobsBanner'
import { Contributors } from "./Contributors";
import { Examples } from "./Examples";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { Promo } from "./Promo";
import { Sponsorship } from "./Sponsorship";
import * as styles from "./styles.css";
import { Testimonials } from "./Testimonials";

export const Home = () => (
  <div class={styles.screen}>
    {/* <JobsBanner size="large" /> */}
    <Promo />
    <Examples />
    <Features />
    <Testimonials />
    <Sponsorship />
    <Contributors />
    <Footer />
  </div>
);
