import React from 'react'

export default class Features extends React.Component {
  render () {
    return <div className='features'>
      <h2 className='features-header'>
        Why date-fns?
      </h2>

      <ol className='features-list'>
        <li className='features-item'>
          <div className='features-icon is-modular' />

          <div className='features-content'>
            <h3 className='features-title'>
              Modular
            </h3>

            <p className='features-description'>
              It is the perfect companion for <strong>webpack</strong> and <strong>Browserify</strong>.
              With the function-per-file style you can pick just what you need
              and stop bloating your project with useless functionality.
            </p>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-immutable' />

          <div className='features-content'>
            <h3 className='features-title'>
              Immutable
            </h3>

            <p className='features-description'>
              Build using pure functions, as date-fns always returns a new date
              instead of changing the passed one.
            </p>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-consistent' />

          <div className='features-content'>
            <h3 className='features-title'>
              Consistent
            </h3>

            <p className='features-description'>
              It always returns a date in the local timezone, no matter what
              you passed: a timestamp, a string or a date object.
            </p>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-reliable' />

          <div className='features-content'>
            <h3 className='features-title'>
              Reliable
            </h3>

            <p className='features-description'>
              It respects timezones & DST.
            </p>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-simple' />

          <div className='features-content'>
            <h3 className='features-title'>
              Simple
            </h3>

            <p className='features-description'>
              The best API is an API that doesn't exist. With date-fns you
              always have one function that does one thing.
            </p>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-safe' />

          <div className='features-content'>
            <h3 className='features-title'>
              Safe
            </h3>

            <p className='features-description'>
              It doesn't extend core objects.
            </p>
          </div>
        </li>

        <li className='features-item'>
          <div className='features-icon is-fast' />

          <div className='features-content'>
            <h3 className='features-title'>
              Fast
            </h3>

            <p className='features-description'>
              In addition to tiny size, date-fns is fast. You can be sure that
              your users will have the best user experience.
            </p>
          </div>
        </li>
      </ol>
    </div>
  }
}
