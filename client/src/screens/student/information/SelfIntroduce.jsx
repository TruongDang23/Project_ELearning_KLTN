import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  textarea {
    font-size: 1.6rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    max-width: 600px;
    line-height: 1.5;
    transition: border-color 0.3s, border-width 0.3s;
    &:focus {
      border-color: #187bce;
      border-width: 2px;
      outline: none; /* Loại bỏ viền mặc định của trình duyệt */
    }
  }
`

function SelfIntroduce({ profile, setProfile }) {
  return (
    <Wrapper>
      <textarea
        value={profile.self_introduce}
        rows="3"
        cols="10"
        onChange={(e) => {
          setProfile((prevProfile) => ({
            ...prevProfile,
            self_introduce: e.target.value
          }))
        }}
      />
    </Wrapper>
  )
}

export default SelfIntroduce
