import { useState } from "react";
import { GeneralHeader } from "~/components/general";
import TitleAssignment from "./Assignment/TitleAssignment";
import styled from "styled-components";
import AssignmentContent from "./Assignment/AssignmentContent";
import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function Assignment() {
  const assignmentData = JSON.parse(sessionStorage.getItem('assignment'))

  const { name, topics } = assignmentData;

  const [page, setPage] = useState(1);

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams({
    page: ''
  })

  const handleChange = (event, value) => {
    setPage(value);
    setSearchParams({ page: value })
  };

  return (
    <>
      <GeneralHeader />
      <AssignmentWrapper>
        <TitleAssignment name={name} />
        <CustomPagination
          count={topics.length} // Số lượng trang dựa trên số topics
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
        {topics.length > 0 && <AssignmentContent {...topics[page - 1]} />}
      </AssignmentWrapper>
    </>
  );
}

const CustomPagination = styled(Pagination)`
  .MuiPaginationItem-root {
    background-color: #ffffff; /* Nền mặc định */
    color: #1976d2; /* Màu chữ mặc định */
    &:hover {
      background-color: #1976d2; /* Nền khi hover */
      color: #ffffff; /* Màu chữ khi hover */
    }
    &.Mui-selected {
      background-color: #1976d2; /* Nền khi được chọn */
      color: #ffffff; /* Màu chữ khi được chọn */
    }
  }
`;

const AssignmentWrapper = styled.main`
  background-color: black;
  .MuiPagination-ul {
    justify-content: center;
    margin-top: 1rem;
  }
`;

export default Assignment;
