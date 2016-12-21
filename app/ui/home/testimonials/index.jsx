import React from 'react'

export default class Testimonials extends React.Component {
  render () {
    return <div className='testimonials'>
      <h2 className='testimonials-header'>
        Testimonials
      </h2>

      <div className='testimonials-list'>
        <div className='testimonials-item'>
          <div className='testimonials-avatar'>
            <img className='testimonials-avatar_image' src='https://avatars.githubusercontent.com/u/52201?v=3' />
          </div>

          <div className='testimonials-quote'>
            <div className='testimonials-quote_triangle'><div className='testimonials-quote_triangle_inner'></div></div>

            <div className='testimonials-name'>
              Sasha Koss, Team Lead @ Toptal
            </div>

            <div className='testimonials-text'>
              Build using pure functions, as date-fns always returns a new date
              instead of changing the passed one.
            </div>
          </div>
        </div>

        <div className='testimonials-item'>
          <div className='testimonials-avatar'>
            <img className='testimonials-avatar_image' src='https://avatars.githubusercontent.com/u/52201?v=3' />
          </div>

          <div className='testimonials-quote'>
            <div className='testimonials-quote_triangle'><div className='testimonials-quote_triangle_inner'></div></div>

            <div className='testimonials-name'>
              Sasha Koss, Team Lead @ Toptal
            </div>

            <div className='testimonials-text'>
              Build using pure functions, as date-fns always returns a new date
              instead of changing the passed one.
            </div>
          </div>
        </div>

        <div className='testimonials-item'>
          <div className='testimonials-avatar'>
            <img className='testimonials-avatar_image' src='https://avatars.githubusercontent.com/u/52201?v=3' />
          </div>

          <div className='testimonials-quote'>
            <div className='testimonials-quote_triangle'><div className='testimonials-quote_triangle_inner'></div></div>

            <div className='testimonials-name'>
              Sasha Koss, Team Lead @ Toptal
            </div>

            <div className='testimonials-text'>
              Build using pure functions, as date-fns always returns a new date
              instead of changing the passed one.
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
