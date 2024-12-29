import styled from "styled-components";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function TitleAssignment({ name }) {
  const navigate = useNavigate()
  const params = useParams()
  return (
    <TitleAssignmentWrapper>
      <Button onClick={() => {
        navigate(`/course/details/${params.courseID}`)
      }}>
        <ArrowBackSharpIcon />
      </Button>
      <h1>{name}</h1>
    </TitleAssignmentWrapper>
  );
}

const TitleAssignmentWrapper = styled.div`
  width: 100%;
  height: 4rem;
  background-color: #1e1e1e;
  padding: 0 2rem;
  display: flex;
  gap: 2rem;

  button {
    background-color: transparent;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    svg {
      font-size: 2.5rem;
    }
  }
  h1 {
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #fff;
    margin: auto 0;
  }
`;

export default TitleAssignment;
