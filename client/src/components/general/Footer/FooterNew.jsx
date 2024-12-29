import styled from 'styled-components'

function FooterNew() {
  return (
    <FooterWrapper>
      <div className="footer-infor">
        <h3>Thông tin chung</h3>
        <p>
          Đây là đồ án Xây dựng website E-learning cho các khóa học về Công Nghệ
          Thông Tin. Ngoài ra có tích hợp các mô hình ML và AI giúp giải quyết
          những vấn đề tồn đọng trong quá trình học online hiện nay. Hiện tại,
          đồ án đang trong giai đoạn phát triển cho Tiểu luận chuyên ngành.
        </p>
      </div>
      <div className="footer-infor">
        <h3>Sinh viên thực hiện</h3>
        <p>
          Đặng Quang Trường
          <br />
          Email: 21110705@student.hcmute.edu.vn
          <br />
          Phone: +84 829 039 202
        </p>
        <br />
        <p>
          Lê Thành Vinh
          <br />
          Email:21110940@student.hcmute.edu.vn
          <br />
          Phone: +84 911 685 322
        </p>
      </div>
      <div className="footer-social">
        <h3>Liên kết</h3>
        <div className="footer-social-detail">
          <p>Trường:</p>
          <a
            href="https://www.facebook.com/profile.php?id=100040342220491"
            target="_blank"
            rel="noreferrer"
            color="inherit"
          >
            Facebook
          </a>
          <a
            href="https://github.com/TruongDang23"
            color="inherit"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <div className="footer-social-detail">
          <p>Vinh:</p>
          <a
            href="https://www.facebook.com/profile.php?id=100016912685197"
            target="_blank"
            rel="noreferrer"
            color="inherit"
          >
            Facebook
          </a>
          <a
            href="https://github.com/Suzukisakae"
            color="inherit"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 3rem;
  justify-content: center;
  background-color: #353e4e;
  color: rgba(255, 255, 255, 0.7);
  .footer-infor {
    h3 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.6rem;
      line-height: 1.6;
    }
  }
  .footer-social {
    h3 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }
    .footer-social-detail {
      display: flex;
      gap: 1rem;
      p {
        font-size: 1.6rem;
        font-weight: 700;
      }
      a {
        font-size: 1.6rem;
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        &:hover {
          color: #1971c2;
        }
      }
    }
  }
  @media (min-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    .footer-infor,
    .footer-social {
      text-align: center;
    }
    .footer-social {
      .footer-social-detail {
        justify-content: center;
      }
    }
  }
  @media (max-width: 480px) {
    padding: 2rem;
    .footer-infor,
    .footer-social {
      h3 {
        font-size: 1.6rem;
      }
      p,
      a {
        font-size: 1.4rem;
      }
    }
  }
`

export default FooterNew
