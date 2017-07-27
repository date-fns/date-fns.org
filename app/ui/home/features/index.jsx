import React from 'react'
import HomeBlock from '../_lib/block'

export default function Features () {
  return (
    <HomeBlock header='Why date-fns?'>
      <ol className='features-list'>
        <li className='features-item'>
          <div className='features-icon is-modular' />

          <div className='features-content'>
            <h3 className='features-title'>Modular</h3>

            <div className='features-description'>
              <p>
                With the function-per-file style, you can pick just what you
                need and stop bloating your project with useless functionality.
              </p>

              <p>
                It works well with modern module bundlers such as{' '}
                <strong>webpack</strong>, <strong>Browserify</strong>, or{' '}
                <strong>Rollup</strong> and also supports tree-shaking.
              </p>
            </div>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-native' />

          <div className='features-content'>
            <h3 className='features-title'>Native Date</h3>

            <div className='features-description'>
              <p>
                date-fns doesn't reinvent the wheel and uses the existing native
                type. Also, it doesn't extend core objects for safety sake.
              </p>

              <p>
                Functions in date-fns work predictable and stick to ECMAScript
                behavior in edge cases.
              </p>
            </div>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-immutable' />

          <div className='features-content'>
            <h3 className='features-title'>Immutable & Pure</h3>

            <div className='features-description'>
              <p>
                date-fns is built using pure functions and always returns a new
                date instance instead of changing the passed one.
              </p>

              <p>It allows to prevent bugs and skip long debugging sessions.</p>
            </div>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-types' />

          <div className='features-content'>
            <h3 className='features-title'>TypeScript & Flow</h3>

            <div className='features-description'>
              <p>
                date-fns supports both <strong>Flow</strong> and{' '}
                <strong>TypeScript</strong>.
              </p>

              <p>
                The typings are generated from the source code and bundled with
                the package, so they always up-to-date.
              </p>
            </div>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-fp' />

          <div className='features-content'>
            <h3 className='features-title'>FP</h3>

            <p className='features-description'>
              The functional programming submodule provides a better alternative
              to chaining — composition, which makes your code clean, safe and
              doesn't bloat your build.
            </p>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-i18n' />

          <div className='features-content'>
            <h3 className='features-title'>I18n</h3>

            <p className='features-description'>
              With the support of an amazing community, date-fns have dozens of
              locales. But none of them will be included in your build unless
              you use that.
            </p>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-consistent' />

          <div className='features-content'>
            <h3 className='features-title'>Consistent</h3>

            <div className='features-description'>
              <p>
                It always returns a date in the same time zone, no matter what's
                passed, a timestamp, a string or a date object.
              </p>

              <p>
                The API is tailored to have predictable names and arguments
                order.
              </p>
            </div>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-reliable' />

          <div className='features-content'>
            <h3 className='features-title'>Reliable</h3>

            <div className='features-description'>
              <p>date-fns respects timezones & DST.</p>

              <p>
                It follows semantic versioning so, always backward compatible.
              </p>

              <p>
                Each build CI checks more than 650&nbsp;000 examples in about
                400&nbsp;time&nbsp;zones.
              </p>
            </div>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-simple' />

          <div className='features-content'>
            <h3 className='features-title'>Simple</h3>

            <div className='features-description'>
              <p>
                The best API is an API that doesn't exist. With date-fns you
                always have one function that does one thing.
              </p>

              <p>
                The API is unambiguous, and there is always a single approach to
                a problem.
              </p>
            </div>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-fast' />

          <div className='features-content'>
            <h3 className='features-title'>Fast</h3>

            <p className='features-description'>
              In addition to tiny size, date-fns is fast. You can be sure that
              your users will have the best user experience.
            </p>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-docs' />

          <div className='features-content'>
            <h3 className='features-title'>Docs</h3>

            <p className='features-description'>
              Every date-fns has detailed description with examples. The
              documentation is accessible both online, at the website, and
              offline thank to JSDoc annotations.
            </p>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-coming' />

          <div className='features-content'>
            <h3 className='features-title'>More Coming!</h3>

            <p className='features-description'>
              date-fns is an active development and we have plans to add more
              features.
            </p>
          </div>
        </li>
      </ol>
    </HomeBlock>
  )
}
