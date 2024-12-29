import StarRating from "~/components/general/Other/StarRating";
import StarIcon from "@mui/icons-material/Star";
import styled, { keyframes } from "styled-components";

function TabOverview({ accessCourseData }) {
  return (
    <TabOverviewWrapper>
      <div className="overview">
        <h2 className="overview-title">Course: {accessCourseData.title}</h2>
        <div className="overview-stats">
          <div className="stats-star">
            <div className="stats-star-number">
              {accessCourseData.star} <StarIcon />
            </div>
            <p>{accessCourseData.review.length} ratings</p>
          </div>
          <div className="stats-student">
            <span>{accessCourseData.number_enrolled}</span>
            <p>Students</p>
          </div>
          <div className="stats-duration">
            <span>{accessCourseData.videos}</span>
            <p>Videos</p>
          </div>
        </div>
        <div className="overview-description">
          <h2>Description</h2>
          <div className="description">
            <p>
              <strong>Instructor:</strong> {accessCourseData.instructor}
            </p>
            <p>
              <strong>Course Type:</strong> {accessCourseData.type_of_course}
            </p>
            <p>
              <strong>Program:</strong> {accessCourseData.program}
            </p>
            <p>
              <strong>Category:</strong> {accessCourseData.category}
            </p>
            <p>
              <strong>Course For:</strong> {accessCourseData.course_for}
            </p>
          </div>
        </div>
      </div>
    </TabOverviewWrapper>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const TabOverviewWrapper = styled.div`
  .overview {
    animation: ${fadeIn} 0.5s ease-in-out;
    h2 {
      margin-bottom: 10px;
      font-size: 2.4rem;
      line-height: 1.6;
    }
    .overview-stats {
      display: flex;
      gap: 40px;
      margin-top: 20px;
      .stats-star {
        display: flex;
        flex-direction: column;
        align-items: center;
        .stats-star-number {
          display: flex;
          gap: 5px;
          margin-bottom: 5px;
          font-weight: bold;
          ${"" /* style cho material icon */}
          svg {
            color: #e59819;
          }
        }
      }
      .stats-student {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          margin-bottom: 5px;
          font-weight: bold;
        }
      }
      .stats-duration {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          margin-bottom: 5px;
          font-weight: bold;
        }
      }
    }
    .overview-description {
      margin-top: 20px;
      animation: ${fadeIn} 0.5s ease-in-out;
      h2 {
        font-size: 2.4rem;
      }
      .description {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-top: 20px;
      }
    }
  }
`;

export default TabOverview;
