import styled from 'styled-components'

function Heading() {
  return (
    <HeadingWrapper>
      <div className="heading-container container">
        <h2 className="heading-secondary">My Learning</h2>
      </div>
    </HeadingWrapper>
  )
}

const HeadingWrapper = styled.section`
  background-color: #2d2f31;
  padding: 2rem 0;
  .heading-container {
    width: 80%;
    margin: 0 auto;
    .heading-secondary {
      font-size: 3rem;
      font-weight: 700;
      color: #f1f3f5;
    }
  }
`

export default Heading
