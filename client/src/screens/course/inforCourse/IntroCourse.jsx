import styled from "styled-components";
import StarRating from "~/components/general/Other/StarRating";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Person4Icon from "@mui/icons-material/Person4";

function IntroCourse({ inforCourseData }) {
  const { title, image_introduce, keywords } = inforCourseData;
  return (
    <IntroCourseWrapper>
      <div className="container intro-course">
        <div className="intro-course-detail">
          <h3>{title}</h3>
          <div className="intro-course-keyword">
            {keywords.map((keyword, index) => (
              <span key={index}>{keyword}</span>
            ))}
          </div>
          <div className="intro-course-infor">
            <ul>
              <li>
                <VideoCameraFrontIcon />
                {inforCourseData.method}
              </li>
              <li>
                <WorkspacePremiumIcon />
                {inforCourseData.program}
              </li>
            </ul>
            <div className="intro-course-infor-instructor">
              <Person4Icon />
              <span>{inforCourseData.instructor}</span>
            </div>
            <div className="intro-course-infor-star">
              <StarRating rating_star={inforCourseData.star} />
              {inforCourseData.star} ({inforCourseData.review.length} reviews){" "}
              {inforCourseData.number_enrolled} students enrolled
            </div>
          </div>
        </div>
        <div className="intro-course-img">
          <img src={image_introduce} alt="Course Introduction" />
        </div>
      </div>
    </IntroCourseWrapper>
  );
}

const IntroCourseWrapper = styled.section`
  background-color: #2d2f31;
  color: #fff;
  min-height: 200px;
  .intro-course {
    display: grid;
    /* Phần đầu tiên chiếm 2 phần, phần còn lại là 1 phần */
    grid-template-columns: 2fr 1fr;
    .intro-course-detail {
      padding: 20px;
      h3 {
        font-size: 2.8rem;
        animation: fadeIn 1s ease-in-out;
      }
      .intro-course-keyword {
        display: flex;
        gap: 10px;
        margin-top: 10px;
        font-size: 1.6rem;
        span {
          background-color: #4a4a4a;
          padding: 5px 10px;
          border-radius: 5px;
          animation: fadeInUp 0.5s ease-in-out;
        }
      }
      .intro-course-infor {
        margin-top: 20px;
        ul {
          padding: 0;
          list-style: none;
          li {
            display: flex;
            align-items: center;
            font-size: 1.6rem;
            gap: 10px;
            margin-bottom: 10px;
            svg {
              font-size: 2rem;
              color: #1971c2;
              transition: transform 0.3s ease;
            }
            &:hover {
              svg {
                transform: scale(1.2);
              }
            }
            animation: fadeInUp 0.7s ease-in-out;
          }
        }
        .intro-course-infor-instructor,
        .intro-course-infor-star {
          display: flex;
          align-items: center;
          font-size: 1.6rem;
          gap: 10px;
          margin-bottom: 10px;
          svg {
            font-size: 2rem;
          }
          animation: fadeInUp 0.7s ease-in-out;
        }
        .intro-course-infor-instructor svg {
          color: #1971c2;
        }
        .intro-course-infor-star svg {
          color: #e59819;
        }
      }
    }
    .intro-course-img {
      padding: 20px;
      text-align: center;
      
      img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        object-fit: cover;
        animation: fadeIn 1s ease-in-out;
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
  @media (max-width: 1400px) {
    .intro-course {
      grid-template-columns: 1fr;
      .intro-course-img {
        img {
          height: auto;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .intro-course-detail h3 {
      font-size: 2.4rem;
    }
    .intro-course-keyword span {
      font-size: 1.4rem;
    }
    .intro-course-infor li {
      font-size: 1.4rem;
    }
    .intro-course-infor-instructor,
    .intro-course-infor-star {
      font-size: 1.4rem;
    }
    .intro-course-infor-star {
      flex-direction: column;
      align-items: flex-start !important;
    }
  }

  @media (max-width: 480px) {
    .intro-course-detail h3 {
      font-size: 2rem;
    }
    .intro-course-keyword span {
      font-size: 1.2rem;
    }
    .intro-course-infor li {
      font-size: 1.2rem;
    }
    .intro-course-infor-instructor,
    .intro-course-infor-star {
      font-size: 1.2rem;
    }
    .intro-course-infor-star {
      flex-direction: column;
      align-items: flex-start !important;
    }
  }
`;

export default IntroCourse;
