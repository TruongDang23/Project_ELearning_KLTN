import styled from "styled-components";
import FilterCourse from "./FilterCourse";
import ResultCourse from "./ResultCourse";

function MainSearch({ searchCourseData, title }) {
  return (
    <MainSearchWrapper>
      <FilterCourse title={title} />
      <ResultCourse searchCourseData={searchCourseData} />
    </MainSearchWrapper>
  );
}

const MainSearchWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 480px) {
    gap: 1rem;
  }
`;

export default MainSearch;
