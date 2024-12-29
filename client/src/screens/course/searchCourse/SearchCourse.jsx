import styled from 'styled-components'
import { GeneralHeader } from '~/components/general'
import { GeneralFooter } from '~/components/general'
import HeadingSearch from './HeadingSearch'
import MainSearch from './MainSearch'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Logo from '../../../assets/hdh.png'
import Loading from '~/screens/system/Loading'

import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

function SearchCourse() {
  let { category } = useParams()
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useSearchParams()
  const title = search.get('q') || ''
  const [resultSearch, setResultSearch] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    let ratings = search.get('ratings')
    let price = search.get('price') || ''
    const language = search.get('language') || ''
    const method = search.get('method') || ''
    const program = search.get('program') || ''

    // eslint-disable-next-line react-hooks/exhaustive-deps
    category = category ? category : ''
    price = price === 'Paid' ? 0.01 : 0.0
    ratings = ratings ? ratings : 0

    axios
      .get('http://localhost:3000/c/findcourse', {
        params: {
          category,
          title,
          ratings,
          language,
          method,
          program,
          price
        }
      })
      .then((response) => {
        setResultSearch(response.data)
      })
      .catch((error) => {
        //Server shut down
        if (error.message === 'Network Error') navigate('/server-shutdown')
        //Connection error
        if (error.response.status === 500) navigate('/500error')
        //Unauthorized. Need login
        if (error.response.status === 401) navigate('/401error')
        //Forbidden. Token != userAuth
        if (error.response.status === 403) navigate('/403error')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, title])

  const resultNumber = resultSearch ? resultSearch.length : 0
  const resultText = resultNumber > 1 ? 'results' : 'result'

  return (
    <>
      {resultSearch ? (
        //Ràng điều kiện nếu dữ liệu đang load thì ko gọi thẻ UserProfile
        //Vì react chạy bất đồng bộ nên chưa có dữ liệu mà gọi thẻ là sẽ bị null
        <>
          <Helmet>
            <title>
              {title ? `Search: ${title} | EL-Space` : 'Search Course'}
            </title>
          </Helmet>
          <GeneralHeader />
          <SearchCourseMain>
            <SearchCourseWrapper>
              <HeadingSearch
                resultNumber={resultNumber}
                resultText={resultText}
              />
              <MainSearch searchCourseData={resultSearch} title={title} />
            </SearchCourseWrapper>
          </SearchCourseMain>
          <GeneralFooter />
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

const SearchCourseMain = styled.main`
  background-image: url(${Logo});
  background-repeat: repeat;
  background-size: auto;
  background-attachment: fixed;
  min-height: 100vh;
`

const SearchCourseWrapper = styled.section`
  width: 100%;
  max-width: 134rem;
  margin: 0 auto;
  padding: 4.6rem 2.4rem;
  display: flex;
  flex-direction: column;
`

export default SearchCourse
