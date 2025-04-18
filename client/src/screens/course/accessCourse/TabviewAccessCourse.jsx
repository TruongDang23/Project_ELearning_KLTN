import { useState, useEffect } from 'react'
import { AppBar, Tabs, Tab, Box } from '@mui/material'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TabOverview from './TabOverview'
import TabReview from './TabReview'
import TabChatAI from './TabChatAI'
import TabQA from './TabQA'
import { globalFlag } from '~/context/GlobalFlag'
import { Button } from '@mui/material'
import SummarizeIcon from '@mui/icons-material/Summarize' // optional icon
import { model } from 'api'
import CircularProgress from '@mui/material/CircularProgress'
import { Snackbar } from '~/components/general'
import { useSearchParams } from "react-router-dom"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <PStyle>{children}</PStyle>
        </Box>
      )}
    </div>
  )
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function TabviewAccessCourse({ accessCourseData, lectureId, setReload }) {
  const [value, setValue] = useState(0)
  const openPopup = globalFlag((state) => state.setOpenPopupSummary)
  const setText = globalFlag((state) => state.setSummaryText)
  const [isLoading, setIsLoading] = useState(false)
  const [openError, setOpenError] = useState({
    status: false,
    message: ''
  })
  const [searchParam] = useSearchParams()
  const sourceUrl = searchParam.get('source')

  const summaryLecture = async () => {
    setIsLoading(true)
    try {
      const res = await model.getSummaryLecture(sourceUrl)
      if (res.status === 200) {
        setText(res.data)
        openPopup()
      }
    } catch (error) {
      setOpenError({
        status: true,
        message: 'Error when summarizing-lecture: ' + error.message
      })
      setTimeout(() => {
        setOpenError({
          status: false
        })
      }, 3000)
    } finally {
      setIsLoading(false)
    }
  }
  // const location = useLocation()
  const [lectureQA, setLectureQA] = useState([])

  // Lấy lectureId từ query parameters
  // const searchParams = new URLSearchParams(location.search)
  // const lectureId = searchParams.get('id')

  useEffect(() => {
    // Lọc dữ liệu QnA dựa trên lectureId từ accessCourseData
    const filteredQA = []
    accessCourseData.chapters.forEach((chapter) => {
      chapter.lectures.forEach((lecture) => {
        if (lecture.id.toString() === lectureId) {
          filteredQA.push(...lecture.QnA)
        }
      })
    })
    setLectureQA(filteredQA)
  }, [lectureId, accessCourseData])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <TabviewAccessCourseWrapper>
        <div>
          <AppBar position="static">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <TabStyled label="Overview" {...a11yProps(0)} />
                <TabStyled label="Chat AI" {...a11yProps(1)} />
                <TabStyled label="Reviews" {...a11yProps(2)} />
                <TabStyled label="Q&A" {...a11yProps(3)} />
              </Tabs>

              <Box pr={2}>
                <SummaryButton
                  startIcon={!isLoading && <SummarizeIcon />}
                  onClick={summaryLecture}
                  variant="outlined"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Summary Lecture'}
                </SummaryButton>
              </Box>
            </Box>
          </AppBar>
          <TabPanel value={value} index={0}>
            <TabOverview accessCourseData={accessCourseData} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TabChatAI />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TabReview accessCourseData={accessCourseData} setReload={setReload} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <TabQA lectureQA={lectureQA} setReload={setReload} lectureId={lectureId}/>
          </TabPanel>
        </div>
      </TabviewAccessCourseWrapper>
      {openError.status ? (
        <>
          {' '}
          <Snackbar
            vertical="bottom"
            horizontal="right"
            severity="error"
            message={openError.message}
          />{' '}
        </>
      ) : (
        <> </>
      )}
    </>

  )
}

const PStyle = styled.p`
  font-size: 1.6rem;
`

const TabStyled = styled(Tab)`
  color: #f9f9f9 !important;
  font-size: 1.6rem !important; /* Thay đổi kích thước chữ tại đây */

  &.Mui-selected {
    color: #ffffff !important;
    font-weight: bold;
    font-size: 1.6rem !important; /* Kích thước chữ khi tab được chọn */
  }
`

const TabviewAccessCourseWrapper = styled.section`
  .MuiAppBar-colorPrimary {
    background-color: #2d2f31;
  }
  .MuiTabs-indicator {
    background-color: #f9f9f9;
  }
  .MuiTab-textColorPrimary {
    color: #f9f9f9;
  }
  .MuiTab-textColorPrimary.Mui-selected {
    color: #f9f9f9;
  }
  .MuiTab-root {
    text-transform: none;
  }
`
const SummaryButton = styled(Button)`
  && {
    color: #f9f9f9;
    border: 1px solid #f9f9f9;
    font-size: 1.4rem;
    text-transform: none;
    font-weight: 500;
    padding: 6px 16px;
    border-radius: 8px;
    margin-right: 16px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #ffffff22;
      border-color: #ffffff;
    }
  }
`
export default TabviewAccessCourse
