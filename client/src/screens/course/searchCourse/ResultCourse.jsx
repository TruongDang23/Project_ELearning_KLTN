import styled from 'styled-components'
import CourseCard from './CourseCard'
import ReactPaginate from 'react-paginate'
import { useState, useEffect } from 'react'

const Items = ({ currentItems }) => {
  return (
    <ItemsWrapper>
      {currentItems &&
        currentItems.map((course) => (
          <CourseCard key={course.courseID} course={course} />
        ))}
    </ItemsWrapper>
  )
}

const PaginatedItems = ({ items, itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    setItemOffset(newOffset)
    setCurrentItems(items.slice(newOffset, newOffset + itemsPerPage))
  }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(items.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(items.length / itemsPerPage))
  }, [items, itemOffset, itemsPerPage])

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        disabledClassName="disabled"
      />
    </>
  )
}

function ResultCourse({ searchCourseData }) {
  return (
    <ResultCourseWrapper>
      <PaginatedItems items={searchCourseData} itemsPerPage={10} />
    </ResultCourseWrapper>
  )
}

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const ResultCourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .pagination {
    display: flex;
    justify-content: center;
    padding: 0;
    list-style: none;
    margin-top: 20px;
  }

  .pagination li {
    margin: 0 5px;
  }

  .pagination li a {
    font-size: 1.2rem;
    padding: 8px 12px;
    border: 1px solid #1971c2;
    border-radius: 4px;
    text-decoration: none;
    color: #1971c2;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }

  .pagination li a:hover {
    background-color: #1971c2;
    color: white;
  }

  .pagination li.active a {
    background-color: #1971c2;
    color: white;
    border-color: #1971c2;
  }

  .pagination li.disabled a {
    cursor: block;
    border: 1px solid #ccc;
    color: #ccc;
    background-color: transparent;
    cursor: not-allowed;
    pointer-events: none;
  }

  .pagination li.previous a,
  .pagination li.next a {
    font-weight: bold;
  }

  .pagination li.break a {
    border: none;
    background: transparent;
    cursor: default;
  }
`

export default ResultCourse
