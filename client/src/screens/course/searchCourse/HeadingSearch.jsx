/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import { useSearchParams } from "react-router-dom"

function HeadingSearch({ resultNumber, resultText }) {
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useSearchParams()
  const title = search.get('q') || ''
  return (
    <HeadingSearchWrapper>
      {
        //Ràng điều kiện nếu dữ liệu đang load thì ko gọi thẻ UserProfile
        //Vì react chạy bất đồng bộ nên chưa có dữ liệu mà gọi thẻ là sẽ bị null
        title === '' ?
          (
            <h1>
              {resultNumber} {resultText} found
            </h1>
          ) :
          (
            <h1>
              {resultNumber} {resultText} found for "{title}"
            </h1>
          )
      }
    </HeadingSearchWrapper>
  );
}

const HeadingSearchWrapper = styled.section`
  h1 {
    font-size: 2.6rem;
    font-weight: 700;
    color: #333;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

export default HeadingSearch;
