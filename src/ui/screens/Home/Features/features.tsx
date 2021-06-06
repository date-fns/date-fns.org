import { h, Fragment } from 'preact'
import { IconType } from './style.css'

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
          <strong>webpack</strong>, <strong>Browserify</strong>, and{' '}
          <strong>Rollup</strong> and also supports tree-shaking.
        </p>
      </>
    ),
    icon: IconType.modular,
  },

  {
    title: 'Native Date',
    description: (
      <>
        <p>
          date-fns uses the native <code>Date</code> type and doesn't reinvent the wheel.
          It doesn't extend core objects for safety's sake.
        </p>

        <p>
          Functions in date-fns work predictably and stick to ECMAScript
          behavior in edge cases.
        </p>
      </>
    ),
    icon: IconType.native,
  },

  {
    title: 'Immutable & Pure',
    description: (
      <>
        <p>
          date-fns is built using pure functions and always returns a new date
          instance instead of changing the passed one.
        </p>

        <p>It helps to prevent bugs and avoid long debugging sessions.</p>
      </>
    ),
    icon: IconType.immutable,
  },

  {
    title: 'TypeScript & Flow',
    description: (
      <>
        <p>
          date-fns supports both <strong>TypeScript</strong> and{' '}
          <strong>Flow</strong>.
        </p>

        <p>
          The typings are generated from the source code and bundled with the
          package, so they're always up-to-date.
        </p>
      </>
    ),
    icon: IconType.types,
  },

  {
    title: 'FP',
    description: (
      <>
        The functional programming submodule provides a better alternative to
        chaining: composition; which makes your code clean and safe and doesn't
        bloat your build.
      </>
    ),
    icon: IconType.fp,
  },

  {
    title: 'I18n',
    description: (
      <>
        With support from the amazing community, date-fns has dozens of locales.
        Only the ones that you use will be included in your project.
      </>
    ),
    icon: IconType.i18n,
  },

  {
    title: 'Consistent',
    description: (
      <>
        <p>
          date-fns always returns a date in the same time zone, no matter what's
          passed - a timestamp, a string or a date object.
        </p>

        <p>
          The API is tailored to have predictable names and arguments order.
        </p>
      </>
    ),
    icon: IconType.consistent,
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
    icon: IconType.reliable,
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
    icon: IconType.simple,
  },

  {
    title: 'Fast',
    description: (
      <>
        In addition to tiny size, date-fns is fast. You can be sure that your
        users will have the best user experience.
      </>
    ),
    icon: IconType.fast,
  },

  {
    title: 'Docs',
    description: (
      <>
        Every date-fns function has a detailed description with examples. The
        documentation is accessible both online on the website and offline
        thanks to JSDoc annotations.
      </>
    ),
    icon: IconType.docs,
  },

  {
    title: 'More Coming!',
    description: (
      <>
        date-fns is an active development and we are constantly adding new
        features.
      </>
    ),
    icon: IconType.coming,
  },
]
