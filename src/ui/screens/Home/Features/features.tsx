import { h, Fragment } from 'preact'
import {
  IconType,
} from './style.css'

export const features = [
  {
    title: 'Modular',
    description: (
      <>
        <p>
          With the function-per-file style, you can pick just what you need and
          stop bloating your project with useless functionality.
        </p>

        <p>
          It works well with modern module bundlers such as{' '}
          <strong>webpack</strong>, <strong>Browserify</strong>, or{' '}
          <strong>Rollup</strong> and also supports tree-shaking.
        </p>
      </>
    ),
    icon: IconType.modular
  },

  {
    title: 'Native Date',
    description: (
      <>
        <p>
          date-fns doesn't reinvent the wheel and uses the existing native type.
          Also, it doesn't extend core objects for safety sake.
        </p>

        <p>
          Functions in date-fns work predictable and stick to ECMAScript
          behavior in edge cases.
        </p>
      </>
    ),
    icon: IconType.native
  },

  {
    title: 'Immutable & Pure',
    description: (
      <>
        <p>
          date-fns is built using pure functions and always returns a new date
          instance instead of changing the passed one.
        </p>

        <p>It allows to prevent bugs and skip long debugging sessions.</p>
      </>
    ),
    icon: IconType.immutable
  },

  {
    title: 'TypeScript & Flow',
    description: (
      <>
        <p>
          date-fns supports both <strong>Flow</strong> and{' '}
          <strong>TypeScript</strong>.
        </p>

        <p>
          The typings are generated from the source code and bundled with the
          package, so they always up-to-date.
        </p>
      </>
    ),
    icon: IconType.types
  },

  {
    title: 'FP',
    description: (
      <>
        The functional programming submodule provides a better alternative to
        chaining — composition, which makes your code clean, safe and doesn't
        bloat your build.
      </>
    ),
    icon: IconType.fp
  },

  {
    title: 'I18n',
    description: (
      <>
        With the support of an amazing community, date-fns have dozens of
        locales. But none of them will be included in your build unless you use
        that.
      </>
    ),
    icon: IconType.i18n
  },

  {
    title: 'Consistent',
    description: (
      <>
        <p>
          It always returns a date in the same time zone, no matter what's
          passed, a timestamp, a string or a date object.
        </p>

        <p>
          The API is tailored to have predictable names and arguments order.
        </p>
      </>
    ),
    icon: IconType.consistent
  },

  {
    title: 'Reliable',
    description: (
      <>
        <p>date-fns respects timezones & DST.</p>

        <p>It follows semantic versioning so, always backward compatible.</p>

        <p>
          Each build CI checks more than 650&nbsp;000 examples in about
          400&nbsp;time&nbsp;zones.
        </p>
      </>
    ),
    icon: IconType.reliable
  },

  {
    title: 'Simple',
    description: (
      <>
        <p>
          The best API is an API that doesn't exist. With date-fns you always
          have one function that does one thing.
        </p>

        <p>
          The API is unambiguous, and there is always a single approach to a
          problem.
        </p>
      </>
    ),
    icon: IconType.simple
  },

  {
    title: 'Fast',
    description: (
      <>
        In addition to tiny size, date-fns is fast. You can be sure that your
        users will have the best user experience.
      </>
    ),
    icon: IconType.fast
  },

  {
    title: 'Docs',
    description: (
      <>
        Every date-fns has detailed description with examples. The documentation
        is accessible both online, at the website, and offline thank to JSDoc
        annotations.
      </>
    ),
    icon: IconType.docs
  },

  {
    title: 'More Coming!',
    description: (
      <>
        date-fns is an active development and we have plans to add more
        features.
      </>
    ),
    icon: IconType.coming
  }
]