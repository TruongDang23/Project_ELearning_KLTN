import styled from "styled-components";
function Main({ children }) {
  return <MainWrapper>{children}</MainWrapper>;
}

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  ${"" /* Tạo kích thước cho main là 32rem */}
  width:100rem;
  max-width: 800px;
  margin-top: 1rem;

  @media (max-width: 1440px) {
    margin: 0 2rem;
  }

  @media (max-width: 768px) {
    margin: 0 1rem;
    max-width: 600px;
    gap: 0;
  }

  @media (max-width: 425px) {
    margin: 0 0.5rem;
    max-width: 400px;
    gap: 0;
  }
`;

export default Main;
