import { FunctionComponent, h } from "preact";
import { debugTypeDoc } from "~/utils/docs";
import { Code } from "../Code";

interface DebugProps {
  data: unknown;
}

export const Debug: FunctionComponent<DebugProps> = ({ data }) => {
  if (!debugTypeDoc) return null;
  return (
    <Code
      value={typeof data === "string" ? data : JSON.stringify(data, null, 2)}
    />
  );
};
