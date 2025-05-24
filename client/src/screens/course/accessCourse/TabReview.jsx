import { useState } from "react"
import styled from "styled-components"
import StarRating from "~/components/general/Other/StarRating"
import StarIcon from "@mui/icons-material/Star"
import Avatar from "@mui/material/Avatar"
import StarDynamic from "~/components/general/Other/StarDynamic"
import { formatDistanceToNow } from "date-fns"
import { useParams } from "react-router-dom"
import { student } from "api"
import { Snackbar } from "~/components/general"

function TabReview({ accessCourseData, setReload }) {
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ star: 0, message: "" })
  const courseId = useParams().courseID;
  const userID = localStorage.getItem('userID')
  const userRole = (userID[0] === 'S') ? 'student' : 'non-student'
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState({
    status: false,
    message: ""
  })
  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value })
  }

  const handleSubmitReview = async () => {
    const data = {
      courseID: courseId,
      userID: userID,
      message: newReview.message,
      star: newReview.star,
      time: new Date().toISOString()
    }

    const res = await student.ratingsCourse(courseId, data)

    if (res.status == 201) {
      setOpenSuccess(true)
      setTimeout(async () => {
        setOpenSuccess(false)
      }, 2000)
      setReviews([...reviews, { ...newReview, time: new Date() }])
      setNewReview({ star: 0, message: "" })
      setReload((prev) => ({
        reload: !prev.reload
      }))
    }
    else {
      setOpenError({
        status: true,
        message: res.response.data.error
      })
      setTimeout(() => {
        setOpenError({
          status: false
        })
      }, 3000)
    }
  }

  return (
    <>
      <TabRatingWrapper>
        <div className="review">
          <div className="review-title">
            <div className="title">
              <h2>Reviews:</h2>
            </div>
            <div className="review-star">
              <span>{accessCourseData.star}</span>
              <StarIcon />
              <span>({accessCourseData.review.length} ratings)</span>
            </div>
          </div>

          <div className="review-content">
            <div className="review-list-review">
              {accessCourseData.review.map((review, index) => (
                <div key={index} className="personal-review">
                  <div className="personal-review-info">
                    <Avatar src={review.avatar ? review.avatar : ''} />
                    <h4>{review.reviewerName}</h4>
                    <span>
                      {formatDistanceToNow(new Date(review.date), {
                        addSuffix: true
                      })}
                    </span>
                  </div>
                  <div className="personal-review-content">
                    <div className="personal-review-content-star">
                      <StarRating rating_star={review.star} />{" "}
                      <span>({review.star})</span>
                    </div>
                    <p>{review.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {userRole === 'student' && (
            <div className="review-yours">
              <h2>Your Review</h2>
              <div className="review-yours-star">
                <StarDynamic
                  size="18"
                  onSetRating={(rating) =>
                    setNewReview({ ...newReview, star: rating })
                  }
                />
              </div>
              <div className="review-yours-content">
                <textarea
                  name="message"
                  placeholder="Write your review here..."
                  value={newReview.message}
                  onChange={handleReviewChange}
                />
                <button onClick={handleSubmitReview}>Submit</button>
              </div>
            </div>
          )}

        </div>
      </TabRatingWrapper>
      {openSuccess ? <> <Snackbar vertical="bottom" horizontal="right" severity="success" message="Add Review Successfully" /> </> : <> </>}
      {openError.status ? <> <Snackbar vertical="bottom" horizontal="right" severity="error" message={openError.message} /> </> : <> </>}
    </>
  );
}

const TabRatingWrapper = styled.div`
  .review {
    .review-title {
      display: flex;
      align-items: center;
      gap: 20px;
      .title {
        h2 {
          font-size: 2.4rem;
        }
      }
      .review-star {
        display: flex;
        align-items: center;
        gap: 5px;
        span {
          font-size: 1.6rem;
        }
        svg {
          color: #e59819;
        }
      }
    }
    .review-content {
      .review-list-review {
        .personal-review {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px 0;
          border-bottom: 1px solid #e0e0e0;
          animation: fadeIn 0.5s ease-in-out;
          .personal-review-info {
            display: flex;
            gap: 10px;
            align-items: center;
            h4 {
              margin: 0;
              font-size: 1.6rem;
            }
          }
          .personal-review-content {
            padding-left: 50px;
            .personal-review-content-star {
              display: flex;
              gap: 10px;
              align-items: center;
              padding-bottom: 10px;
              span {
                font-size: 1.6rem;
              }
            }
            p {
              font-size: 1.6rem;
              line-height: 1.6;
            }
          }
        }
      }
    }

    .review-yours {
      margin-top: 20px;
      animation: fadeIn 0.5s ease-in-out;
      h2 {
        font-size: 2.4rem;
      }
      .review-yours-star {
        margin-top: 10px;
        display: flex;
        gap: 10px;
      }
      .review-yours-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        textarea {
          flex-grow: 1;
          width: 100%;
          height: 100px;
          padding: 10px;
          font-size: 1.6rem;
          line-height: 1.6;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          resize: none;
        }
        button {
          flex-shrink: 0;
          margin-top: 10px;
          padding: 10px 20px;
          font-size: 1.6rem;
          background-color: #1971c2;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            background-color: #fff;
            color: #1971c2;
            outline: none;
            box-shadow: inset 0 0 0 2px #1971c2;
            transition: all 0.3s;
            transform: scale(1.05);
          }
        }
      }
    }

    .test-api {
      .button-api {
        padding: 10px 20px;
        font-size: 1.6rem;
        background-color: #1971c2;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background-color: #fff;
          color: #1971c2;
          outline: none;
          box-shadow: inset 0 0 0 2px #1971c2;
          transition: all 0.3s;
          transform: scale(1.05);
        }
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      ${"" /* transform: translateY(10px); */}
    }
    to {
      opacity: 1;
      ${"" /* transform: translateY(0); */}
    }
  }
`;

export default TabReview;
