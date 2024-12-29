import styled from 'styled-components'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import StarRating from '~/components/general/Other/StarRating'
import Avatar from '@mui/material/Avatar'
import { formatDistanceToNow } from 'date-fns'
import AccordionCourse from './AccordionCourse'

function MainContentCourse({ inforCourseData }) {
  return (
    <MainContentCourseWrapper>
      <div className="what-will-you-learn">
        <h3>What you will learn in this course?</h3>
        <ul>
          {inforCourseData.targets.map((target, index) => (
            <li key={index}>
              <DoneRoundedIcon />
              {target}
            </li>
          ))}
        </ul>
      </div>
      <div className="course-requirment">
        <h3>Course Requirements</h3>
        <ul>
          {inforCourseData.requirements.map((requirement, index) => (
            <li key={index}>
              <DoneRoundedIcon />
              {requirement}
            </li>
          ))}
        </ul>
      </div>
      <div className="course-content">
        <h3 className="course-content-h3">Course Content</h3>
        <AccordionCourse inforCourseData={inforCourseData} />
      </div>
      <div className="course-review">
        <div className="course-rating">
          <h3>Course Review</h3>
          <h4>
            <span>Rating: {inforCourseData.star}</span>
            <StarRating rating_star={inforCourseData.star} />
          </h4>
        </div>
        <div className="course-list-review"></div>
        {inforCourseData.review.map((review, index) => (
          <div key={index} className="course-personal-review">
            <div className="course-personal-review-info">
              <Avatar />
              <h4>{review.reviewerName}</h4>
              <span>
                {formatDistanceToNow(new Date(review.date), {
                  addSuffix: true
                })}
              </span>
            </div>
            <div className="course-personal-review-content">
              <div className="course-personal-review-content-star">
                <StarRating rating_star={review.star} />{' '}
                <span>{review.star}</span>
              </div>
              <p>{review.message}</p>
            </div>
          </div>
        ))}
      </div>
    </MainContentCourseWrapper>
  )
}

const MainContentCourseWrapper = styled.section`
  padding-right: 20px;
  .what-will-you-learn {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    border: 2px solid #74c0fc;
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
      transition: all ease 0.3s;
    }
    h3 {
      color: #2d2f31;
      font-size: 2.4rem;
      margin-bottom: 20px;
      animation: fadeIn 1s ease-in-out;
    }
    ul {
      list-style-type: none;
      animation: fadeInUp 0.5s ease-in-out;
      li {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
        font-size: 1.8rem;
        line-height: 1.6;
        svg {
          color: #1971c2;
          font-size: 2.4rem;
          transition: transform 0.3s ease;
        }
        &:hover {
          svg {
            transform: scale(1.2);
          }
        }
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .course-requirment {
    padding: 20px;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 8px;
    border: 2px solid #74c0fc;
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
      transition: all ease 0.3s;
    }
    h3 {
      color: #2d2f31;
      font-size: 2.4rem;
      margin-bottom: 20px;
      animation: fadeIn 1s ease-in-out;
    }
    ul {
      list-style-type: none;
      animation: fadeInUp 0.5s ease-in-out;
      li {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
        font-size: 1.8rem;
        line-height: 1.6;
        svg {
          color: #007bff;
          font-size: 2.4rem;
          transition: transform 0.3s ease;
        }
        &:hover {
          svg {
            transform: scale(1.2);
          }
        }
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .course-content {
    padding: 20px;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 8px;
    border: 2px solid #74c0fc;
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
      transition: all ease 0.3s;
    }
    .course-content-h3 {
      color: #2d2f31;
      font-size: 2.4rem;
      margin-bottom: 20px;
      animation: fadeIn 1s ease-in-out;
    }
  }
  .course-review {
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    border: 2px solid #74c0fc;
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
      transition: all ease 0.3s;
    }

    h4 {
      display: flex;
      justify-content: space-between;
      font-size: 1.8rem;
      gap: 10px;
      animation: slideIn 0.5s ease-in-out;
    }
    .course-rating {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      h4 {
        display: block;
      }
      h3 {
        color: #2d2f31;
        align-items: center;
        font-size: 2.4rem;
        margin-bottom: 20px;
        animation: fadeIn 1s ease-in-out;
      }
    }
    .course-list-review {
      margin-top: 20px;
    }
    .course-personal-review {
      padding: 20px;
      margin-top: 20px;
      border-top: 0.5px solid #ccc;
      display: flex;
      flex-direction: column;
      gap: 10px;
      animation: fadeInUp 0.5s ease-in-out;
      .course-personal-review-info {
        display: flex;
        gap: 10px;
        align-items: center;
        h4 {
          font-size: 1.8rem;
          color: #2d2f31;
        }
        span {
          font-size: 1.6rem;
        }
      }
      .course-personal-review-info > span:last-child {
        margin-left: auto;
      }
      .course-personal-review-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .course-personal-review-content-star {
          display: flex;
          align-items: center;
          gap: 10px;
          span {
            font-size: 1.8rem;
          }
        }
        p {
          font-size: 1.6rem;
          line-height: 1.6;
        }
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export default MainContentCourse
