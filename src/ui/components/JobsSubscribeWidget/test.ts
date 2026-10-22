/// <reference types="mocha" />
import Module from "module";

// Ensure Node 24 compatibility with enzyme's legacy cheerio subpath require
// oxlint-disable-next-line typescript(unbound-method)
const origRequire = (Module.prototype as any).require;
Module.prototype.require = function (this: any, id: any) {
  if (id === "cheerio/lib/utils") {
    return { isHtml: (_str: string) => true };
  }
  return origRequire.apply(this, arguments as any);
};

// Minimal DOM mock for Preact adapter in Node environment
function createMockNode(tagName = "div"): any {
  return {
    nodeName: tagName.toUpperCase(),
    tagName: tagName.toUpperCase(),
    nodeType: 1,
    childNodes: [] as any[],
    children: [] as any[],
    style: {},
    attributes: {} as any,
    ownerDocument: null,
    setAttribute(k: string, v: any) {
      this.attributes[k] = v;
    },
    getAttribute(k: string) {
      return this.attributes[k];
    },
    removeAttribute(k: string) {
      delete this.attributes[k];
    },
    appendChild(c: any) {
      this.childNodes.push(c);
      this.children.push(c);
      c.parentNode = this;
      return c;
    },
    removeChild(c: any) {
      const idx = this.childNodes.indexOf(c);
      if (idx !== -1) this.childNodes.splice(idx, 1);
      const cIdx = this.children.indexOf(c);
      if (cIdx !== -1) this.children.splice(cIdx, 1);
      c.parentNode = null;
      return c;
    },
    insertBefore(c: any, ref: any) {
      const idx = this.childNodes.indexOf(ref);
      if (idx !== -1) {
        this.childNodes.splice(idx, 0, c);
        this.children.splice(idx, 0, c);
      } else {
        this.childNodes.push(c);
        this.children.push(c);
      }
      c.parentNode = this;
      return c;
    },
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return true;
    },
  };
}

let mockStorage: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (key: string) => mockStorage[key] ?? null,
  setItem: (key: string, value: string) => {
    mockStorage[key] = String(value);
  },
  removeItem: (key: string) => {
    delete mockStorage[key];
  },
  clear: () => {
    mockStorage = {};
  },
};

const mockDoc: any = {
  createElement: (tag: string) => {
    const el = createMockNode(tag);
    el.ownerDocument = mockDoc;
    return el;
  },
  createElementNS: (_ns: string, tag: string) => {
    const el = createMockNode(tag);
    el.ownerDocument = mockDoc;
    return el;
  },
  createTextNode: (text: string) => ({
    nodeType: 3,
    nodeValue: text,
    data: text,
    parentNode: null,
  }),
  createComment: (text: string) => ({
    nodeType: 8,
    nodeValue: text,
    data: text,
    parentNode: null,
  }),
  body: createMockNode("body"),
  documentElement: createMockNode("html"),
};

(global as any).document = mockDoc;
(global as any).window = {
  document: mockDoc,
  localStorage: mockLocalStorage,
};

import { setFileScope } from "@vanilla-extract/css/fileScope";
setFileScope("src/ui/components/JobsSubscribeWidget/styles.css.ts");

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-preact-pure";
import assert from "power-assert";
import { h } from "preact";
import {
  JobsSubscribeWidget,
  JOBS_SUBSCRIBE_DISMISSED_KEY,
  isDismissedInStorage,
  setDismissedInStorage,
} from ".";

configure({ adapter: new ((Adapter as any).default || Adapter)() });

const render = (vnode: any) => shallow(vnode as any);

describe("JobsSubscribeWidget", () => {
  beforeEach(() => {
    mockStorage = {};
    (global as any).window.localStorage = mockLocalStorage;
  });

  it("renders correctly with form, input, and both buttons", () => {
    const wrapper = render(h(JobsSubscribeWidget, {}));
    assert(wrapper.find("form").length === 1);
    assert(wrapper.find('input[name="EMAIL"]').length === 1);
    assert(wrapper.find('button[type="submit"]').length === 1);
    assert(wrapper.find('button[type="button"]').length === 1);
    assert(
      wrapper.text().includes("Get awesome JavaScript jobs in your email"),
    );
  });

  it("Cancel button is present and accessible", () => {
    const wrapper = render(h(JobsSubscribeWidget, {}));
    const cancelButton = wrapper.find('button[type="button"]');
    assert(cancelButton.length === 1);
    assert(cancelButton.prop("type") === "button");
    assert(cancelButton.prop("aria-label") === "Cancel subscription");
    assert(cancelButton.text() === "Cancel");
  });

  it("clicking Cancel dismisses the widget and calls onDismiss", () => {
    let dismissedCalled: boolean = false;
    const wrapper = render(
      h(JobsSubscribeWidget, {
        onDismiss: () => {
          dismissedCalled = true;
        },
      }),
    );

    let preventedDefault: boolean = false;
    let stoppedPropagation: boolean = false;
    const cancelButton = wrapper.find('button[type="button"]');
    (cancelButton.prop("onClick") as any)({
      preventDefault: () => {
        preventedDefault = true;
      },
      stopPropagation: () => {
        stoppedPropagation = true;
      },
    });

    assert(preventedDefault);
    assert(stoppedPropagation);
    assert(dismissedCalled);

    wrapper.update();
    assert(wrapper.find("form").length === 0);
  });

  it("clicking Cancel does not submit the form", () => {
    let formSubmitted = false;
    const wrapper = render(h(JobsSubscribeWidget, {}));
    const cancelButton = wrapper.find('button[type="button"]');
    assert(cancelButton.prop("type") === "button");

    let cancelPreventDefault = false;
    (cancelButton.prop("onClick") as any)({
      preventDefault: () => {
        cancelPreventDefault = true;
      },
      stopPropagation: () => {},
    });

    assert(!formSubmitted);
    assert(cancelPreventDefault);
    wrapper.update();
    assert(wrapper.find("form").length === 0);
  });

  it("clicking Subscribe preserves the existing behavior", () => {
    const wrapper = render(h(JobsSubscribeWidget, {}));
    const form = wrapper.find("form");
    assert(
      form.prop("action") ===
        "https://cafe.us16.list-manage.com/subscribe/post?u=bf10ea6555c1dc38f3bcfa7e5&id=b7d6fa4833",
    );
    assert(form.prop("method") === "post");
    assert(form.prop("target") === "_blank");
    assert(form.prop("rel") === "noreferrer,noopener");

    const subscribeButton = wrapper.find('button[type="submit"]');
    assert(subscribeButton.length === 1);
    assert(subscribeButton.text() === "Subscribe");
  });

  it("Cancel button does not trigger unintended navigation or actions", () => {
    const wrapper = render(h(JobsSubscribeWidget, {}));
    const cancelButton = wrapper.find('button[type="button"]');
    assert(cancelButton.prop("href") === undefined);
    assert(cancelButton.prop("type") === "button");
  });

  it("dismissal works correctly after component updates or rerendering", () => {
    const wrapper = render(h(JobsSubscribeWidget, {}));
    const cancelButton = wrapper.find('button[type="button"]');
    (cancelButton.prop("onClick") as any)({
      preventDefault: () => {},
      stopPropagation: () => {},
    });
    wrapper.update();
    assert(wrapper.find("form").length === 0);

    // When mounting a new instance after dismissal, it remains dismissed
    const nextWrapper = render(h(JobsSubscribeWidget, {}));
    assert(nextWrapper.find("form").length === 0);
  });

  it("dismissal persists in localStorage across sessions", () => {
    assert(mockStorage[JOBS_SUBSCRIBE_DISMISSED_KEY] === undefined);

    const wrapper = render(h(JobsSubscribeWidget, {}));
    const cancelButton = wrapper.find('button[type="button"]');
    (cancelButton.prop("onClick") as any)({
      preventDefault: () => {},
      stopPropagation: () => {},
    });

    assert(mockStorage[JOBS_SUBSCRIBE_DISMISSED_KEY] === "true");
    assert(isDismissedInStorage() === true);

    // New instance reads persisted state and renders null
    const persistedWrapper = render(h(JobsSubscribeWidget, {}));
    assert(persistedWrapper.find("form").length === 0);
  });

  it("unavailable or throwing localStorage does not crash the component", () => {
    // Simulate throwing localStorage (e.g. security sandbox)
    (global as any).window.localStorage = {
      getItem: () => {
        throw new Error("SecurityError: Access is denied");
      },
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
    };

    assert(isDismissedInStorage() === false);
    assert.doesNotThrow(() => {
      setDismissedInStorage();
    });

    let wrapper: any;
    assert.doesNotThrow(() => {
      wrapper = render(h(JobsSubscribeWidget, {}));
    });
    assert(wrapper.find("form").length === 1);

    assert.doesNotThrow(() => {
      const cancelButton = wrapper.find('button[type="button"]');
      (cancelButton.prop("onClick") as any)({
        preventDefault: () => {},
        stopPropagation: () => {},
      });
    });
    wrapper.update();
    assert(wrapper.find("form").length === 0);
  });

  it("existing subscription-widget email input requirements remain intact", () => {
    const wrapper = render(h(JobsSubscribeWidget, {}));
    const emailInput = wrapper.find('input[name="EMAIL"]');
    assert(emailInput.prop("type") === "email");
    assert(emailInput.prop("placeholder") === "Email");
    assert(emailInput.prop("required") === true);
  });
});
