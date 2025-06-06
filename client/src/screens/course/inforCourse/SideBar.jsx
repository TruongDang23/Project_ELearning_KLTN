import styled from 'styled-components'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import AssignmentIcon from '@mui/icons-material/Assignment'
import QuizIcon from '@mui/icons-material/Quiz'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { BuyCourse } from '~/components/popup'
import { useEffect, useState } from 'react'
import { student } from 'api'
import { Autocomplete, TextField, CircularProgress } from '@mui/material'
import { formatVND } from '~/utils/format'

function SideBar({ inforCourseData }) {
  const [openPub, setopenPub] = useState(false)
  const [statusBuy, setStatus] = useState('')
  const [voucherCode, setVoucherCode] = useState('')
  const [availableVouchers, setAvailableVouchers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [discountedPrice, setDiscountedPrice] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [isLoadingBuyCourse, setLoadingBuyCourse] = useState(false)
  const userID = localStorage.getItem('userID')
  const cancel_url = window.location.href
  const return_url = `${window.location.origin}/student/my-learning#`
  const toggleBuy = (status) => {
    setStatus(status)
    setopenPub(!openPub)
  }

  const { courseID } = useParams()

  useEffect(() => {
    // if course is free, price = 0
    // if course is payable, price = '.... đ' => using condition != 0 is correct
    if (inforCourseData.price != 0) {
      fetchSampleVouchers()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inforCourseData.price])

  const fetchSampleVouchers = async() => {
    if (userID[0] === 'S') {
      setLoading(true)
      const matchedVoucher = await student.getMatchedVouchers(courseID)
      if (matchedVoucher.status === 200) {
        setAvailableVouchers(matchedVoucher.data.data)
        setLoading(false)
      }
    }
  }

  const handleBuyCourse = async () => {
    setLoadingBuyCourse(true)
    if (inforCourseData.price == 0) {
      //If course is free => call API buyCourse to insert directly into database table
      const res = await student.buyCourse(courseID)
      setLoadingBuyCourse(false)
      if (res.data.message === 'enrolled') {
        toggleBuy('enrolled')
      } else if (res.data.message === 'created') {
        toggleBuy('created')
      }
    } else {
      //If course is not free => Open link payment
      const res = await student.payment(
        courseID,
        cancel_url,
        return_url,
        voucherCode
      )
      setLoadingBuyCourse(false)
      if (res.data.message === 'enrolled') {
        toggleBuy('enrolled')
      } else {
        window.open(
          res.data.message.checkoutUrl,
          '_blank',
          'noopener,noreferrer'
        )
      }
    }
  }

  const handleVoucherChange = (event, newValue) => {
    setSelectedVoucher(newValue)

    if (newValue) {
      setVoucherCode(newValue.voucher_code)
    } else {
      setVoucherCode('')
      setDiscountedPrice(null)
    }
  }

  const handleApplyVoucher = () => {
    if (!voucherCode) return

    // Either find from selected or from available vouchers by code
    const foundVoucher =
      selectedVoucher ||
      availableVouchers.find(
        (v) => v.voucher_code.toLowerCase() === voucherCode.toLowerCase()
      )
    if (foundVoucher) {
      // Get current price
      const regex = /([0-9-.]+)/
      const priceMatch = inforCourseData.price.match(regex)
      const price = priceMatch ? parseFloat(priceMatch[0].replace(/\./g, '')) : 0
      // Calculate discounted price
      const discount =
        (price * foundVoucher.discount_value) / 100
      let newPrice = Math.max(0, price - discount).toFixed(2)
      newPrice = formatVND(newPrice)
      setDiscountedPrice(newPrice)

      setSnackbarMessage(`Voucher applied! Your new price is $${newPrice}`)
      setSnackbarSeverity('success')
    } else {
      setSnackbarMessage('Invalid voucher code. Please try another one.')
      setSnackbarSeverity('error')
    }

    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  // Custom input handler to support manually typed voucher codes
  const handleInputChange = (event) => {
    const value = event.target.value
    setVoucherCode(value)

    // If user is typing something different from selected voucher, clear selection
    if (selectedVoucher && value !== selectedVoucher.voucher_code) {
      setSelectedVoucher(null)
    }
  }

  return (
    <>
      <SideBarWrapper>
        {/* Video */}
        <div className="sidebar-video">
          <iframe
            title="Course Introduction"
            src={inforCourseData.video_introduce}
          ></iframe>
        </div>
        <div className="sidebar-detail">
          <ul>
            <li>
              <VideoLibraryIcon />
              <span>{inforCourseData.videos} videos</span>
            </li>
            <li>
              <AssignmentIcon />
              <span>{inforCourseData.num_lecture} lectures</span>
            </li>
            <li>
              <QuizIcon />
              <span>Quizzes</span>
            </li>
            <li>
              <LocalAtmIcon />
              <span>
                {inforCourseData.price == 0
                  ? 'Free'
                  :
                  ( discountedPrice ? discountedPrice : `${inforCourseData.price}`)
                }
              </span>
            </li>
          </ul>
        </div>
        <div className="sidebar-buttons">
          { inforCourseData.is_accessible == true ?
            (
              <Link to={`/course/details/${inforCourseData.courseID}`}>
                <button className="sidebar-button button-goto">Go to course</button>
              </Link>
            )
            :
            (
              <>
                {/* Case course has price => inforCourseData.pice = '.... đ' => using condition != 0 is correct */}
                {inforCourseData.price != 0 && (
                  <div className="voucher-input-container">
                    <Autocomplete
                      id="voucher-autocomplete"
                      options={availableVouchers}
                      loading={loading}
                      getOptionLabel={(option) =>
                        `${option.voucher_code} (${option.discount_value}% off)`
                      }
                      value={selectedVoucher}
                      onChange={handleVoucherChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Enter voucher code"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {loading ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            )
                          }}
                          className="voucher-input"
                        />
                      )}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontWeight: 'bold', color: '#1971c2', fontSize: '1.3rem' }}>
                              {option.voucher_code}
                            </div>
                            <div
                              style={{
                                fontSize: '1.2rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%'
                              }}
                            >
                              <span>{option.discount_value}% off</span>
                              <span style={{ color: '#777' }}>
                          Expires:{' '}
                                {new Date(option.end_date).toLocaleDateString('vi-VN')}
                              </span>
                            </div>
                            <div
                              style={{
                                fontSize: '1.2rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%'
                              }}>
                              Remaining uses: {option.usage_limit - option.usage_count}
                            </div>
                            {option.description && (
                              <div
                                style={{
                                  fontSize: '1.2rem',
                                  color: '#666',
                                  marginTop: '2px'
                                }}
                              >
                                {option.description}
                              </div>
                            )}
                          </div>
                        </li>
                      )}
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-root': {
                          fontSize: '1.6rem',
                          borderRadius: '5px',
                          backgroundColor: '#fff'
                        }
                      }}
                      freeSolo
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                    />
                    <button
                      className="voucher-apply-button"
                      onClick={handleApplyVoucher}
                      disabled={!voucherCode}
                    >
                Apply
                    </button>
                  </div>
                )}
                { userID && (
                  <button
                    className="sidebar-button button-buy"
                    onClick={handleBuyCourse}
                  >
                    {isLoadingBuyCourse ? <CircularProgress size={20} sx={{ color: '#0d0d0d' }} /> : 'Buy now'}
                  </button>
                )}

              </>
            )}

        </div>
      </SideBarWrapper>
      {openPub && <BuyCourse handleClose={toggleBuy} status={statusBuy} />}
    </>
  )
}

const SideBarWrapper = styled.aside`
  align-self: start;
  padding: 20px;
  height: auto-fit;
  color: #fff;
  background-color: #2d2f31;
  border-radius: 8px;
  box-shadow: #0000000f 0px 4px 20px 0px;

  .sidebar-video {
    iframe {
      width: 100%;
      height: 200px;
      transition: transform 0.3s ease-in-out;
      border-radius: 5px;
      animation: fadeIn 1s ease-in-out;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .sidebar-detail {
    margin-top: 20px;
    padding: 0px 20px;
    ul {
      display: grid;
      grid-template-columns: 1fr 1fr;
      list-style: none;
      padding: 0;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 1.6rem;
        svg {
          margin-right: 10px;
          font-size: 2rem;
          color: #1971c2;
          transition: transform 0.3s ease, color 0.3s ease;
        }
        &:hover {
          svg {
            transform: scale(1.2);
            color: #0c47a1;
          }
        }
        animation: fadeInUp 0.7s ease-in-out;
      }
    }
  }

  .sidebar-buttons {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .sidebar-button {
      padding: 10px;
      border: none;
      border-radius: 5px;
      font-size: 1.6rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.3s ease;
      animation: fadeInUp 0.8s ease-in-out;

      &:hover {
        transform: translateY(-2px);
      }
    }

    .button-buy {
      background-color: #1971c2;
      color: white;
      &:hover {
        background-color: #155b96;
      }
    }

    .button-goto {
      background-color: #e59819;
      width: 100%;
      color: white;
      &:hover {
        background-color: #c87f0a;
      }
    }

    .voucher-input-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      animation: fadeInUp 0.9s ease-in-out;

      .voucher-input {
        flex: 1;
        /* padding: 10px; */
        font-size: 1.6rem;
        color: #1c2526;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        transition: border-color 0.3s ease, transform 0.3s ease;

        &::placeholder {
          color: #999;
        }

        &:hover {
          border-color: #a1a1a1;
          transform: translateY(-2px);
        }

        &:focus {
          border-color: #1971c2;
          border-width: 2px;
        }
      }

      .voucher-apply-button {
        padding: 20px 20px;
        font-size: 1.6rem;
        font-weight: 700;
        background-color: #fff;
        color: #1971c2;
        outline: none;
        border: none;
        box-shadow: inset 0 0 0 2px #1971c2;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease, transform 0.3s ease;

        &:hover {
          transform: translateY(-2px);
        }
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
export default SideBar
