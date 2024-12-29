import styled from "styled-components";
function Error() {
  return (
    <ErrorWrapper>
      <p>
        <span>💥</span> There was an error fecthing questions.
      </p>
    </ErrorWrapper>
  );
}

const ErrorWrapper = styled.div`
  p {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 500;
    padding: 2rem;
    background-color: #495057;
    border-radius: 100px;
  }
`;

export default Error;
