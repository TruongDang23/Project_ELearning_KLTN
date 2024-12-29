import { useState, useEffect } from 'react'
// import { useParams, useLocation } from 'react-router-dom'
import { AppBar, Tabs, Tab, Box } from '@mui/material'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TabOverview from './TabOverview'
import TabReview from './TabReview'
import TabChatAI from './TabChatAI'
import TabQA from './TabQA'

// import courseQA from '~/data/QAdata'

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
    <TabviewAccessCourseWrapper>
      <div>
        <AppBar position="static">
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

export default TabviewAccessCourse
