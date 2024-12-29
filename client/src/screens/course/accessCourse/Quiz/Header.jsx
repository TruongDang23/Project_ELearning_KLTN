import styled from "styled-components";

function Header({ title, description }) {
  return (
    <HeaderWrapper>
      <h1>Quiz</h1>
      <h2>{title}</h2>
      <h3>{description}</h3>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  @import url("https://fonts.googleapis.com/css2?family=Codystar&display=swap");
  text-align: center;
  margin-top: 2.4rem;
  h1 {
    font-family: "Codystar";
    font-size: 5.6rem;
    text-shadow: 2px 2px 0 #495057, 4px 4px 0 #fff;
    letter-spacing: 0.6rem;
  }
  h2 {
    font-size: 3.6rem;
    margin-bottom: 2rem;
  }
  p {
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 4rem;
  }
`;

export default Header;
