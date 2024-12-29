import styled from 'styled-components'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import Link from '@mui/material/Link'

function ContactInfo({ userProfile }) {
  const {
    avatar,
    fullname,
    date_of_birth,
    street,
    province,
    country,
    social_network
  } = userProfile

  const handleOnCick = () => {
    const url = `http://localhost:5173/instructor/information`
    window.open(url, '_blank')
  }
  return (
    <ContactInfoWrapper>
      <div className="contact-info">
        <div className="contact-info__avatar">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="contact-info__content">
          <div className="contact-info__name">
            <h2>
              {fullname}
              <span onClick={handleOnCick}>
                <Link
                  // href="/instructor/information"
                  // underline="none"
                  // target="_blank"
                >
                  <BorderColorIcon style={{ fontSize: 25 }} />
                </Link>
              </span>
            </h2>
          </div>

          <div className="contact-info__content-detail">
            <div className="contact-info__content-addition">
              <p>
                <span>Date of birth:</span> {date_of_birth}
              </p>
              <p>
                <span>Address:</span> {street}, {province}, {country}
              </p>
            </div>
            <div className="contact-info__content-social">
              <h3>Social networks:</h3>
              <ul>
                {social_network.map((social_network, index) => {
                  // Kiểm tra và thêm giao thức nếu cần
                  const url =
                    social_network.startsWith('http://') ||
                    social_network.startsWith('https://')
                      ? social_network
                      : `http://${social_network}`
                  return (
                    <li key={index}>
                      <a href={url} target="__blank">
                        {social_network}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ContactInfoWrapper>
  )
}

const ContactInfoWrapper = styled.section`
  display: flex;
  margin: 0 auto;
  width: 70%;
  background-color: #fff;
  border-radius: 8px;
  border: 2px solid #74c0fc;
  box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
    transition: all ease 0.3s;
  }
  .contact-info {
    display: flex;
    align-items: center;
    padding: 0px 20px;
    gap: 10px;

    .contact-info__avatar {
      img {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        object-fit: cover;
        ${'' /* tạo phần viền trắng cho img */}
        border: 3px solid #1971c2;
      }
    }

    .contact-info__content {
      flex-grow: 1;
      margin-top: 20px;
      padding: 20px;
      .contact-info__name {
        h2 {
          font-size: 2.4rem;
          font-weight: 700;
          color: #1971c2;
          margin-bottom: 20px;
        }
        span {
          margin-left: 15px;
          cursor: pointer;
          svg {
            color: #1971c2;
            transition: all 0.3s;
            &:hover {
              box-shadow: 0 0 10px 0 #1971c2;
            }
            &:active {
              transform: scale(1.1);
            }
          }
        }
      }

      .contact-info__content-detail {
        display: flex;
        margin-bottom: 20px;
        gap: 50px;

        .contact-info__content-addition {
          p {
            font-size: 1.6rem;
            margin-bottom: 10px;
            line-height: 1.6;

            span {
              font-weight: 700;
            }
          }
        }

        .contact-info__content-social {
          h3 {
            font-size: 1.6rem;
            font-weight: 700;
          }

          ul {
            list-style: none;
            padding: 0;

            li {
              margin-bottom: 5px;
              font-size: 1.6rem;
              a {
                color: #1971c2;
                text-decoration: none;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    .contact-info {
      flex-direction: column;
      gap: 20px;
      .contact-info__content {
        padding: 10px;
        .contact-info__name {
          h2 {
            font-size: 2rem;
          }
        }
        .contact-info__content-detail {
          flex-direction: column;
          gap: 20px;
          .contact-info__content-addition {
            p {
              font-size: 1.4rem;
            }
          }
          .contact-info__content-social {
            h3 {
              font-size: 1.6rem;
            }
            ul {
              li {
                font-size: 1.4rem;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 576px) {
    .contact-info {
      .contact-info__avatar {
        img {
          width: 120px;
          height: 120px;
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    .contact-info {
      .contact-info__content {
        .contact-info__name {
          h2 {
            font-size: 1.8rem;
          }
        }
        .contact-info__content-detail {
          .contact-info__content-addition {
            p {
              font-size: 1.2rem;
            }
          }
          .contact-info__content-social {
            h3 {
              font-size: 1.4rem;
            }
            ul {
              li {
                font-size: 1.2rem;
              }
            }
          }
        }
      }
    }
  }
`

export default ContactInfo
