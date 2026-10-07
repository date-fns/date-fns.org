import { FunctionComponent, h, Ref } from "preact";
import { useRef, useState } from "preact/hooks";
import Prism from "prismjs";
import "./theme.css?global";
import * as styles from "./styles.css";

interface CodeProps {
  value: string | JSX.Element;
}

export const Code: FunctionComponent<CodeProps> = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = async () => {
    try {
      let textToCopy = "";
      if (typeof value === "string") {
        textToCopy = value;
      } else if (codeRef.current) {
        textToCopy = codeRef.current.textContent || "";
      }

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div class={styles.container}>
      {typeof value === "string" ? (
        <CodeHighlight value={value} />
      ) : (
        <CodeComponent value={value} codeRef={codeRef} />
      )}
      <button
        class={styles.copyButton}
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

interface CodeComponentProps {
  value: JSX.Element;
  codeRef?: Ref<HTMLElement>;
}

export const CodeComponent: FunctionComponent<CodeComponentProps> = ({
  value,
  codeRef,
}) => {
  return (
    <pre class={styles.pre}>
      <code class={styles.code} ref={codeRef}>
        {value}
      </code>

    </pre>
  );
};

interface CodeHighlightProps {
  value: string;
}

function CodeHighlight({ value }: CodeHighlightProps) {
  const html = Prism.highlight(value, Prism.languages.javascript, "javascript");

  return (
    <pre class={styles.pre}>
      <code class={styles.code} dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}
