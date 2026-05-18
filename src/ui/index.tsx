import { defaultSubmodule } from "@date-fns/docs/consts";
import { Fragment, h, VNode } from "preact";
import { useContext, useEffect } from "preact/hooks";
import "reset.css/reset.css?global";
import { AppRouteLocation, RouterContext } from "~/ui/router";
import { Docs } from "~/ui/screens/Docs";
import { Home } from "~/ui/screens/Home";
import { NotFound } from "~/ui/screens/NotFound";
import { Modals, ModalsContext, useModals } from "./components/Modals";
import "./global.css?global";
import { YouDontNeedDateFns } from "./screens/YouDontNeedDateFns";

const win = typeof window !== "undefined" ? window : undefined;

export const UI = () => {
  const { location } = useContext(RouterContext);

  useEffect(() => {
    win?.ga?.("send", "pageview");
  }, [JSON.stringify(location)]);

  const modalsApi = useModals();

  return (
    <>
      <ModalsContext.Provider value={modalsApi}>
        <Content location={location} />
        <Modals api={modalsApi} />
      </ModalsContext.Provider>
    </>
  );
};

interface ContentProps {
  location: AppRouteLocation;
}

function Content({ location }: ContentProps): VNode<any> {
  switch (location.name) {
    case "home":
      return <Home />;

    case "youDontNeedDateFns":
      return <YouDontNeedDateFns />;

    case "docs":
      return (
        <Docs
          selectedSubmodule={defaultSubmodule}
          selectedPage={location.params.page}
        />
      );

    case "submoduleDocs":
      return (
        <Docs
          selectedSubmodule={location.params.submodule}
          selectedPage={location.params.page}
        />
      );

    case "versionDocs":
      return (
        <Docs
          selectedSubmodule={defaultSubmodule}
          selectedPage={location.params.page}
          selectedVersion={location.params.version}
        />
      );

    case "submoduleVersionDocs":
      return (
        <Docs
          selectedSubmodule={location.params.submodule}
          selectedPage={location.params.page}
          selectedVersion={location.params.version}
        />
      );

    case "404":
      return <NotFound />;
  }
}
