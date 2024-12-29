import styled, { createGlobalStyle } from "styled-components";
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang


function Loading() {
  return (
    <>
      <Helmet>
        <title>Loading | EL-Space</title>
      </Helmet>
      <GlobalStyle />
      <LoadingWrapper>
        <div className="loader">Loading...</div>
      </LoadingWrapper>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgba(200, 220, 240, 0.8) !important;
  }
`;

const LoadingWrapper = styled.div`
  .loader {
    width: 250px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    font-weight: 900;
    color: #155b96;
    letter-spacing: 0.2em;

    &::before,
    &::after {
      content: "";
      display: block;
      width: 15px;
      height: 15px;
      background: #155b96;
      position: absolute;
      animation: load 0.7s infinite alternate ease-in-out;
    }

    &::before {
      top: 0;
    }

    &::after {
      bottom: 0;
    }
  }

  @keyframes load {
    0% {
      left: 0;
      height: 30px;
      width: 15px;
    }
    50% {
      height: 8px;
      width: 40px;
    }
    100% {
      left: 235px;
      height: 30px;
      width: 15px;
    }
  }
`;

export default Loading;
