import styled from 'styled-components'
import { Element } from 'react-scroll'
import featureCer from '../assets/Certifications.png'
import featureFlex from '../assets/Flexible.png'
import featureCourse from '../assets/Courses.png'
import featureInstructor from '../assets/Instructors.png'
import featurePrice from '../assets/Prices.png'
import featureSupport from '../assets/Support.png'

function Feature() {
  const features = [
    {
      imgSrc: featureCourse,
      title: 'High Quality Courses',
      description: 'Learn from industry experts with high-quality courses.'
    },
    {
      imgSrc: featureFlex,
      title: 'Flexible Learning',
      description: 'Learn at your own pace, anytime and anywhere.'
    },
    {
      imgSrc: featureCer,
      title: 'Certifications',
      description: 'Earn certificates to showcase your skills and achievements.'
    },
    {
      imgSrc: featureInstructor,
      title: 'Expert Instructors',
      description: 'Get taught by the best instructors in the industry.'
    },
    {
      imgSrc: featurePrice,
      title: 'Affordable Prices',
      description: 'Access courses at prices that fit your budget.'
    },
    {
      imgSrc: featureSupport,
      title: 'Community Support',
      description: 'Join a community of learners and get support.'
    }
  ]

  return (
    <FeatureSection className="container white-space-medium">
      <Element name="learmore">
        <h2 className="heading-tertiary">Why Choose Us?</h2>
      </Element>
      <div className="features">
        {features.map((feature, index) => (
          <div className="feature" key={index}>
            <img src={feature.imgSrc} alt={feature.title} />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </FeatureSection>
  )
}

const FeatureSection = styled.section`
  padding: 40px 20px;
  align-items: center;

  h2 {
    font-size: 3.6rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 4rem;
    color: #1971c2;
  }

  .features {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 30px;
    max-width: 120rem;
    margin: 0 auto;
  }

  .feature {
    padding: 40px;
    background-color: #fff;
    border-radius: 8px;
    border: 2px solid #74c0fc;
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
    flex: 1 1 calc(33.333% - 20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: all 0.3s;

    img {
      width: 80px;
      height: 80px;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 2.4rem;
      margin-bottom: 3rem;
      color: #333;
    }

    p {
      font-size: 1.8rem;
      color: #555;
      line-height: 1.6;
    }

    &:hover {
      box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
      transition: all 0.3s;
    }
  }

  @media (max-width: 768px) {
    .features {
      flex-direction: column;
      gap: 20px;
    }

    .feature {
      flex: 1 1 100%;
    }
  }
`

export default Feature
