import React from 'react'
import HomeBlock, { Link } from '../_lib/block'

export default function Testimonials () {
  return (
    <HomeBlock
      header='Testimonials'
      action='Leave Your Feedback'
      actionHref='https://github.com/date-fns/date-fns/issues/new?labels[]=Feedback'
    >
      <div className='testimonials-list'>
        <div className='testimonials-item'>
          <div className='testimonials-avatar'>
            <img
              className='testimonials-avatar_image'
              src='https://github.com/jrop.png'
            />
          </div>

          <div className='testimonials-quote'>
            <div className='testimonials-quote_triangle'>
              <div className='testimonials-quote_triangle_inner' />
            </div>

            <div className='testimonials-name'>
              <Link href='https://github.com/jrop'>jrop</Link>
            </div>

            <div className='testimonials-text'>
              date-fns is the modular path to date/time manipulation. Where I
              work, it helped us get our bundle sizes down, especially because
              we are able to include only the functionality we need.
            </div>
          </div>
        </div>

        <div className='testimonials-item'>
          <div className='testimonials-avatar'>
            <img
              className='testimonials-avatar_image'
              src='https://github.com/MiracleBlue.png'
            />
          </div>

          <div className='testimonials-quote'>
            <div className='testimonials-quote_triangle'>
              <div className='testimonials-quote_triangle_inner' />
            </div>

            <div className='testimonials-name'>
              <Link href='https://github.com/MiracleBlue'>
                Nicholas Kircher
              </Link>
            </div>

            <div className='testimonials-text'>
              date-fns gave us the power to work directly with date objects,
              without worrying about conversion or mutations. It's a real game
              changer for dates.
            </div>
          </div>
        </div>

        <div className='testimonials-item'>
          <div className='testimonials-avatar'>
            <img
              className='testimonials-avatar_image'
              src='https://github.com/miljan-aleksic.png'
            />
          </div>

          <div className='testimonials-quote'>
            <div className='testimonials-quote_triangle'>
              <div className='testimonials-quote_triangle_inner' />
            </div>

            <div className='testimonials-name'>
              <Link href='https://github.com/miljan-aleksic'>
                Miljan Aleksic
              </Link>, Author of{' '}
              <Link href='https://vuikit.js.org/'>Vuikit</Link>
            </div>

            <div className='testimonials-text'>
              Sasha and Lesha Koss made what anyone dealing with dates in JS
              ever wanted, but didn’t got the time, the knowledge or the
              courage! Because of stars like date-fns the dev community is
              becoming an amazing universe. Thank you!
            </div>
          </div>
        </div>
      </div>
    </HomeBlock>
  )
}
