import styled from 'styled-components'
import { GeneralHeader } from '~/components/general'
import { GeneralFooter } from '~/components/general'
import HeadingSearch from './HeadingSearch'
import MainSearch from './MainSearch'
import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Logo from '../../../assets/hdh.png'
import Loading from '~/screens/system/Loading'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang
import { anonymous } from 'api'
import { Snackbar } from "~/components/general"

function SearchCourse() {
  let { category } = useParams()
  const [search, setSearch] = useSearchParams()
  const [openError, setOpenError] = useState({
    status: false,
    message: ""
  })
  const title = search.get('q') || ''
  const [resultSearch, setResultSearch] = useState()

  const searchCourse = async(params) => {
    const res = await anonymous.searchCourse(params)
    if (res.status === 200) {
      setResultSearch(res.data)
    }
    else {
      setOpenError({
        status: true,
        message: res.response.data.error
      })
    }
  }

  useEffect(() => {
    const initialParams = {
      category: category || '',
      title: search.get('q') || '',
      ratings: search.get('ratings') || '',
      language: search.get('language') || '',
      method: search.get('method') || '',
      program: search.get('program') || '',
      price: search.get('price') || '',
      limit: 200,
      page: 'searchcourse'
    }
    searchCourse(initialParams);
  }, [category, search])

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
      { openError.status ? <> <Snackbar vertical="bottom" horizontal="right" severity="error" message={openError.message}/> </> : <> </> }
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
