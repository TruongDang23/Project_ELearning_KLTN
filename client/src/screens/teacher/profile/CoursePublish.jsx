import styled from 'styled-components'

import StarRating from '~/components/general/Other/StarRating'

function CoursePublish({ course_enrolled }) {
  return (
    <CourseEnrolledWrapper>
      <div className="course-enrolled">
        <h2>Course published</h2>
        <hr />
        <div className="course-enrolled__content">
          {course_enrolled.map((course, index) => {
            const price =
              course.price == 0 ? 'Free' : course.price + ' ' + course.currency
            return (
              <div key={index} className="course-enrolled__content-item">
                <div className="item-img">
                  <img src={course.image_introduce} alt={course.title} />
                </div>
                <div className="item-body">
                  <h3 className="item-title">{course.title}</h3>
                  <span className="item-creator">{course.instructor}</span>
                  <div className="item-rating">
                    <span className="rating-star-val">{course.star}</span>
                    <StarRating rating_star={course.star} />
                    <span className="rating-count">({course.raters})</span>
                  </div>
                  <div className="item-price">
                    <span className="item-price-new">{price}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </CourseEnrolledWrapper>
  )
}

const CourseEnrolledWrapper = styled.section`
  display: flex;
  margin: 0 auto;
  width: 100%;
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

  .course-enrolled {
    width: 100%;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1971c2;
      margin-bottom: 10px;
    }
    hr {
      margin-bottom: 10px;
      border: none;
      height: 2px;
      background-color: #1971c2;
    }
    .course-enrolled__content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 2.4rem;
      margin-top: 20px;
      .course-enrolled__content-item {
        margin-bottom: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
        .item-img {
          img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            ${'' /* bo hai góc trên của ảnh */}
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
        }
        .item-body {
          margin: 14px 0;
          padding: 4px 18px;

          .item-title {
            font-size: 1.8rem;
            line-height: 1.4;
            font-weight: 700;
            color: #333;
          }
          .item-creator {
            font-size: 1.6rem;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.6);
          }
          .item-rating {
            margin-top: 8px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .rating-star-val {
              font-size: 1.6rem;
              font-weight: 800;
              color: #b4690e;
              margin-right: 6px;
            }
            .rating-count {
              font-size: 1.6rem;
              margin-left: 3px;
              font-weight: 500;
              opacity: 0.8;
            }
          }
          .item-price {
            display: flex;
            justify-content: flex-end;
            .item-price-new {
              margin-right: 8px;
              font-weight: 700;
              font-size: 2rem;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .course-enrolled {
      .course-enrolled__content {
        .course-enrolled__content-item {
          .item-body {
            .item-title {
              font-size: 1.6rem;
            }
            .item-creator {
              font-size: 1.4rem;
            }
            .item-rating {
              .rating-star-val {
                font-size: 1.4rem;
              }
              .rating-count {
                font-size: 1.4rem;
              }
            }
            .item-price {
              .item-price-new {
                font-size: 1.6rem;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 576px) {
    .course-enrolled {
      h2 {
        font-size: 1.6rem;
      }
      .course-enrolled__content {
        .course-enrolled__content-item {
          .item-body {
            .item-title {
              font-size: 1.4rem;
            }
            .item-creator {
              font-size: 1.2rem;
            }
            .item-rating {
              .rating-star-val {
                font-size: 1.2rem;
              }
              .rating-count {
                font-size: 1.2rem;
              }
            }
            .item-price {
              .item-price-new {
                font-size: 1.4rem;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 320px) {
    .course-enrolled {
      .course-enrolled__content {
        .course-enrolled__content-item {
          .item-body {
            .item-title {
              font-size: 1.2rem;
            }
            .item-creator {
              font-size: 1rem;
            }
            .item-rating {
              .rating-star-val {
                font-size: 1rem;
              }
              .rating-count {
                font-size: 1rem;
              }
            }
            .item-price {
              .item-price-new {
                font-size: 1.2rem;
              }
            }
          }
        }
      }
    }
  }
`

export default CoursePublish
