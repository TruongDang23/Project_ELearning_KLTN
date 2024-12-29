import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Popover from '@mui/material/Popover'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import StarRating from '~/components/general/Other/StarRating'

function CourseCard({ course }) {
  const {
    courseID,
    title,
    method,
    program,
    image_introduce,
    price,
    currency,
    keywords,
    instructor,
    star,
    num_reviews,
    num_lectures,
    course_for,
    targets
  } = course

  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const handleOnCick = () => {
    const url = `http://localhost:5173/course/infor/${courseID}`
    window.open(url, '_blank')
  }

  const open = Boolean(anchorEl)

  return (
    <CourseCardWrapper>
      <div
        className="course-card"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={handleOnCick}
      >
        <div className="course-card__img">
          <img src={image_introduce} alt="course" />
        </div>
        <div className="course-card__content">
          <a
            href={`/course/infor/${courseID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>{title}</h3>
          </a>
          <div className="course-card__content-keyword">
            {keywords.map((keyword, index) => (
              <span key={index}>{keyword}</span>
            ))}
          </div>
          <div className="course-card__content-infor">
            <ul>
              <li>
                <span id="title-infor">Method: </span>
                <span>{method}</span>
              </li>
              <li>
                <span id="title-infor">Program: </span>
                <span>{program}</span>
              </li>
            </ul>
          </div>
          <div className="course-card__content-instructor">
            <span>{instructor}</span>
          </div>
          <div className="course-card__content-vote">
            <span id="star-number">{star} </span>
            <StarRating rating_star={star} />
            <span>({num_reviews} reviews)</span>
          </div>
          <div className="course-card__content-lectures">
            <span>{num_lectures} lectures</span>
            <span>{course_for}</span>
          </div>
        </div>
        <div className="course-card__price">
          {price == 0 ? (
            <p>Free</p>
          ) : (
            <p>
              {price} {currency}
            </p>
          )}
        </div>
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
          '& .MuiPaper-root': {
            // Default width for large screens
            width: '30%',
            // Media query for medium screens
            '@media (max-width: 960px)': {
              width: '50%'
            },
            // Media query for small screens
            '@media (max-width: 600px)': {
              width: '80%'
            }
          }
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        className="responsive-popover"
        onClose={handlePopoverClose}
        disableRestoreFocus
        disableScrollLock={true}
      >
        <PopoverContent>
          <h3>What you will learn:</h3>
          <ul>
            {targets.map((target, index) => (
              <li key={index}>
                <DoneRoundedIcon />
                {target}
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </CourseCardWrapper>
  )
}
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const PopoverContent = styled.div`
  padding: 1rem;
  h3 {
    color: #2d2f31;
    font-size: 1.6rem;
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
      font-size: 1.2rem;
      line-height: 1.6;
      svg {
        color: #1971c2;
        font-size: 1.6rem;
        transition: transform 0.3s ease;
      }
      &:hover {
        svg {
          transform: scale(1.2);
        }
      }
    }
  }

  button {
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    background-color: #1971c2;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 1rem;
    &:hover {
      background-color: #155b96;
    }
  }
`

const CourseCardWrapper = styled.div`
  .course-card {
    display: flex;
    justify-content: space-between;
    ${'' /* border-top: 1px solid #ccc; */}
    animation: ${fadeIn} 0.6s ease-out;
    overflow: hidden;
    background-color: #fff;
    border-radius: 8px;
    border: 2px solid #74c0fc;
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
      transition: all ease 0.3s;
      cursor: pointer;
    }

    .course-card__img {
      width: 30%;
      height: 18rem;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        padding: 5px;
      }

      @media (max-width: 768px) {
        width: 40%;
      }

      @media (max-width: 576px) {
        width: 30%;
      }
    }

    .course-card__content {
      flex-grow: 1;
      padding: 1rem 2rem;

      ${'' /* Bỏ dấu gạch dưới của Link */}
      a {
        text-decoration: none;
      }

      h3 {
        color: #333;
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.6;
      }

      .course-card__content-keyword {
        margin-bottom: 1rem;
        display: flex;
        gap: 1rem;

        span {
          background-color: #f0f0f0;
          padding: 0.5rem;
          border-radius: 5px;
          font-size: 1rem;
        }
      }

      .course-card__content-infor {
        margin-bottom: 2.5rem;

        ul {
          padding: 0;
          list-style: none;

          li {
            display: inline-block;
            margin-right: 1rem;

            #title-infor {
              font-weight: 700;
              color: #333;
            }

            span {
              font-size: 1.2rem;
              color: #333;
            }
          }
        }
      }

      .course-card__content-instructor {
        margin-bottom: 1rem;

        span {
          font-size: 1.5rem;
          font-weight: 500;
          color: #333;
        }
      }

      .course-card__content-vote {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        span {
          font-size: 1.2rem;
        }

        #star-number {
          font-size: 1.2rem;
          font-weight: 600;
        }
      }

      .course-card__content-lectures {
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;

        span {
          color: #333;
          font-size: 1.2rem;
        }
      }

      @media (max-width: 768px) {
        padding: 1rem;
      }

      @media (max-width: 576px) {
        span {
          font-size: 1rem;
        }
      }
    }

    .course-card__price {
      padding: 2rem 1rem;

      p {
        color: #333;
        margin: 0;
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 1.6;
      }

      @media (max-width: 768px) {
        padding: 1rem;

        p {
          font-size: 1.4rem;
        }
      }

      @media (max-width: 576px) {
        p {
          font-size: 1.2rem;
        }
      }
    }
  }
`

export default CourseCard
