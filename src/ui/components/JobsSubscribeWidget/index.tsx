import { FunctionComponent, h } from "preact";
import { useState } from "preact/hooks";
import * as styles from "./styles.css";

export const JOBS_SUBSCRIBE_DISMISSED_KEY = "date-fns:jobs-subscribe-dismissed";

export function isDismissedInStorage(): boolean {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return (
        window.localStorage.getItem(JOBS_SUBSCRIBE_DISMISSED_KEY) === "true"
      );
    }
  } catch {
    // Gracefully handle unavailable or restricted localStorage
  }
  return false;
}

export function setDismissedInStorage(): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(JOBS_SUBSCRIBE_DISMISSED_KEY, "true");
    }
  } catch {
    // Gracefully handle unavailable or restricted localStorage
  }
}

export interface JobsSubscribeWidgetProps {
  onDismiss?: () => void;
}

export const JobsSubscribeWidget: FunctionComponent<
  JobsSubscribeWidgetProps
> = ({ onDismiss }) => {
  const [isDismissed, setIsDismissed] = useState<boolean>(isDismissedInStorage);

  if (isDismissed) {
    return null;
  }

  const handleCancel = (e: h.JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    setDismissedInStorage();
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <div class={styles.container}>
      <div class={styles.block}>
        <div class={styles.blockContent}>
          <div class={styles.header}>
            Get awesome JavaScript jobs in your email
          </div>

          <form
            class={styles.form}
            action="https://cafe.us16.list-manage.com/subscribe/post?u=bf10ea6555c1dc38f3bcfa7e5&amp;id=b7d6fa4833"
            method="post"
            target="_blank"
            rel="noreferrer,noopener"
          >
            <input
              class={styles.input}
              name="EMAIL"
              placeholder="Email"
              type="email"
              required
            />

            <div class={styles.actions}>
              <button class={styles.subscribeButton} type="submit">
                Subscribe
              </button>

              <button
                class={styles.cancelButton}
                type="button"
                onClick={handleCancel}
                aria-label="Cancel subscription"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class={styles.footer}>
        Subscribe to support date-fns development, it's free!
      </div>
    </div>
  );
};
