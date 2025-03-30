import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-scroll'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { slidesWelcome } from '~/constants/ui'

function HeroSection() {
  const [hovered, setHovered] = useState(false)

  return (
    <SwiperStyles>
      <HeroWrapper>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          className="hero-swiper"
        >
          {slidesWelcome.map((slide, index) => (
            <SwiperSlide key={index}>
              <SlideContent>
                <TextBox>
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <ButtonGroup>
                    <Link to="courses" duration={500} offset={-10}>
                      <ButtonPrimary>Start learning →</ButtonPrimary>
                    </Link>
                    <Link to="learmore" duration={500} offset={-10}>
                      <ButtonOutline>Learn more ↓</ButtonOutline>
                    </Link>
                  </ButtonGroup>
                </TextBox>
                <ImageBox
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <img
                    src={hovered ? slide.images[1] : slide.images[0]}
                    alt={`Slide ${index} Image`}
                  />
                </ImageBox>
              </SlideContent>
            </SwiperSlide>
          ))}
        </Swiper>
      </HeroWrapper>
    </SwiperStyles>
  )
}

const HeroWrapper = styled.section`
  height: 90vh;
  background: radial-gradient(circle, rgba(30, 81, 123, 1), #0b3052);
  background-size: 200% 200%;
  animation: gradientMovement 10s ease infinite;
  position: relative;
  overflow: hidden;

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

  .hero-swiper {
    max-width: 120rem;
    margin: 0 auto;
    height: 100%;
  }

  .swiper-slide {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const SlideContent = styled.div`
  display: flex;
  align-items: center;
  gap: 9.6rem;
  padding: 0 3.2rem;
  max-width: 120rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4.8rem;
    padding: 0 2rem;
  }
`

const TextBox = styled.div`
  flex: 2;
  color: #fff;

  h1 {
    font-size: 5rem;
    line-height: 1.2;
    margin-bottom: 3.2rem;
    text-transform: uppercase;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 2.4rem;
    line-height: 1.6;
    margin-bottom: 4.8rem;
    color: #f0f0f0;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    text-align: center;
    h1 {
      font-size: 3.2rem;
    }
    p {
      font-size: 1.8rem;
    }
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.6rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`

const ButtonPrimary = styled.a`
  display: inline-block;
  padding: 1.6rem 4.8rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  background-color: #1971c2;
  border-radius: 5px;
  text-transform: uppercase;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #155b96;
  }
`

const ButtonOutline = styled.a`
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
  }
`

const ImageBox = styled.div`
  flex: 1;
  padding: 3.2rem;
  transition: transform 0.3s ease-in-out;

  img {
    max-width: 40rem;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.5s;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const SwiperStyles = styled.div`
  .swiper-button-prev,
  .swiper-button-next {
    background: rgba(0, 0, 0, 0.4);
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    color: #fff;
    font-size: 2.4rem;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }

    &::after {
      font-size: 2.4rem;
    }
  }

  .swiper-button-prev {
    left: 2rem;
  }

  .swiper-button-next {
    right: 2rem;
  }

  .swiper-pagination {
    bottom: 2rem;
  }

  .swiper-pagination-bullet {
    width: 1rem;
    height: 1rem;
    background: #bbb;
    opacity: 0.8;
    transition: background 0.3s;
  }

  .swiper-pagination-bullet-active {
    background: #717171;
    opacity: 1;
  }

  @media (min-width: 1400px) {
    .hero-swiper {
      max-width: 140rem;
    }
  }
`

export default HeroSection
