import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-scroll'

import heroNew from '../assets/heroNew.png'
import heroNewTwo from '../assets/heroNew-two.png'

function HeroSection() {
  const [hovered, setHovered] = useState(false)
  return (
    <SectionHero>
      <div className="hero">
        <div className="hero-text-box">
          <h1 className="headingPrimary">
            Learn essential skills for today and tomorrow
          </h1>
          <p className="heroDescription">
            Skills for your present (and your future). Unlock your potential
            with our online courses. Gain skills that matter today and shape
            your future. Start learning with us now!
          </p>
          <div className="heroBtns">
            <Link to="courses" duration={500} offset={-10}>
              <a className="heroBtnPrimary">Start learning &rarr;</a>
            </Link>
            <Link to="learmore" duration={500} offset={-10}>
              <a className="heroBtnOutline">Learn more &darr;</a>
            </Link>
          </div>
        </div>
        <div
          className="hero-img-box"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={hovered ? heroNewTwo : heroNew}
            className="heroImg"
            alt="Hero Section Image"
          />
        </div>
      </div>
    </SectionHero>
  )
}

const SectionHero = styled.section`
  height: 90vh;
  ${'' /* background-color: #0b3052; */}
  background: radial-gradient(
    circle,
    rgba(30, 81, 123, 1),
    #0b3052
  );
  background-size: 200% 200%;
  animation: gradientMovement 10s ease infinite;

  @keyframes gradientMovement {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
  ${'' /* padding: 4.8rem 0 9.6rem 0; */}

  ${'' /* add image background */}


  .hero {
    max-width: 120rem;
    margin: 0 auto;
    padding: 0 3.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9.6rem;
    align-items: center;

    .hero-text-box {
      margin-top: 1rem;
      .headingPrimary {
        font-size: 4rem;
        line-height: 1.2;
        margin-bottom: 3.2rem;
        text-transform: uppercase;
        font-weight: 700;
        color: #fff;
        ${'' /* color: #1864ab; */}
        letter-spacing: -0.5px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      }

      .heroDescription {
        color: #f0f0f0;
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        font-size: 2rem;
        line-height: 1.6;
        margin-bottom: 4.8rem;
      }

      .heroBtns {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1.6rem;
        margin-bottom: 4.8rem;

        @media (max-width: 768px) {
          flex-direction: column;
          align-items: center;
        }

        .heroBtnPrimary {
          display: inline-block;
          padding: 1.6rem 4.8rem;
          font-size: 1.6rem;
          font-weight: 700;
          color: #fff;
          background-color: #1971c2;
          border: none;
          border-radius: 5px;
          text-transform: uppercase;
          text-decoration: none;
          margin-right: 1.6rem;
          transition: all 0.3s;

          &:hover {
            background-color: #155b96;
            transition: all 0.3s;
          }
        }

        .heroBtnOutline {
          display: inline-block;
          padding: 1.6rem 4.8rem;
          font-size: 1.6rem;
          font-weight: 700;
          color: #1971c2;
          background-color: #fff;
          border: 2px solid #1971c2;
          border-radius: 5px;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;

          &:hover {
            background-color: #1971c2;
            color: #fff;
            transition: all 0.3s;
          }
        }
      }
    }

    .hero-img-box {
      padding: 3.2rem;
      transition: transform 0.3s ease-in-out;
      .heroImg {
        width: 100%;
        object-fit: cover;
        transition: all 0.5s;
      }
      &:hover .heroImg {
        transform: scale(1.02); /* Scale image on hover */
      }
    }
  }
  @media (max-width: 768px) {
    .hero {
      grid-template-columns: 1fr;
      gap: 4.8rem;

      .hero-text-box {
        text-align: center;
      }
      .hero-img-box {
        display: none;
      }
    }
  }
  @media (min-width: 1400px) {
    .hero {
      max-width: 140rem;
    }
  }
`

export default HeroSection
