import styled from 'styled-components'
import StarRating from './StarRating'
import { Link } from 'react-router-dom'

function Course({ course }) {
  const { courseID, title, price, star, raters, image_introduce, fullname } =
    course
  return (
    <CourseWrapper>
      <div className="item-img">
        <img src={image_introduce} alt={title} />
      </div>
      <div className="item-body">
        <h3 className="item-title">{title}</h3>
        <span className="item-creator">{fullname}</span>
        <div className="item-rating">
          <span className="rating-star-val">{star}</span>
          <StarRating rating_star={star} />
          <span className="rating-count">({raters})</span>
        </div>
        <div className="item-price">
          <span className="item-price-new">Free</span>
          <span className="item-price-old">${price}</span>
        </div>
      </div>
      <div className="item-btns">
        <Link to={`/course/infor/${courseID}`}>
          <button className="item-btn see-details-btn">See Details</button>
        </Link>
        {/* <button className="item-btn add-to-cart-btn">Add to Cart</button> */}
      </div>
    </CourseWrapper>
  )
}

const CourseWrapper = styled.div`
  margin-bottom: 20px;
  background-color: #fff;
  border: 2px solid #74c0fc;
  box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.3s;
  .item-img {
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      ${'' /* bo hai góc trên của ảnh */}
      ${'' /* border-top-left-radius: 10px;
      border-top-right-radius: 10px; */}
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
        ${'' /* opacity: 0.8; */}
      }
    }
    .item-price-new {
      font-weight: 700;
      font-size: 1.6rem;
    }
    .item-price-old {
      ${'' /* opacity: 0.8; */}
      font-weight: 500;
      text-decoration: line-through;
      font-size: 1.6rem;
      margin-left: 8px;
    }
  }

  .item-btns {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    padding: 4px 8px 20px 18px;

    margin-top: auto;
    .item-btn {
      display: inline-block;
      font-size: 1.6rem;
      padding: 1rem 2rem;
      font-weight: 700;
      border-radius: 5px;
      text-decoration: none;
      transition: all 0.3s;

      &.see-details-btn {
        background-color: #1971c2;
        color: #fff;
        border: none;
        &:hover {
          background-color: #155b96;
          transition: all 0.3s;
        }
      }

      &.add-to-cart-btn {
        background-color: #fff;
        color: #1971c2;
        border: 2px solid #1971c2;
        margin-left: 10px;
        &:hover {
          background-color: #1971c2;
          color: #fff;
          transition: all 0.3s;
        }
      }
    }
  }

  &:hover {
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
    transition: all ease 0.3s;
  }
`

export default Course
