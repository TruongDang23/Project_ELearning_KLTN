import { useState } from "react";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function SideBarAccessCourse({ accessCourseData, setParams, setProgress }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: isExpanded
    }));
  };

  return (
    <SideBarAccessCourseWrapper>
      <div className="course-content">
        <h2>Course Content</h2>
      </div>
      <div className="course-info">
        {accessCourseData.chapters.map((chapter, index) => (
          <Accordion
            key={index}
            expanded={!!expanded[index]}
            onChange={handleExpansion(index)}
            sx={{
              boxShadow: "none",
              borderBottom: "1px solid #e0e0e0",
              fontSize: "1rem !important",
              padding: "0px 20px",
              "&:before": {
                display: "none"
              }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                padding: "10px 0",
                "& .MuiAccordionSummary-content": {
                  margin: 0
                }
              }}
            >
              <h3>Chapter {chapter.chapter_name}</h3>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {chapter.lectures.map((lecture, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setProgress((prevProgress) => ({
                        ...prevProgress,
                        lectureID: lecture.id,
                        percent: 0
                      }));
                    }}
                  >
                    <div>
                      <div style={{ flex: 0.9 }}>
                        <h4>
                          {index + 1}
                          {": "}
                          {lecture.type === "video" ? (
                            <>
                              <OndemandVideoIcon />
                              <a
                                onClick={() => {
                                  setParams({
                                    id: lecture.id,
                                    type: lecture.type,
                                    source: lecture.source
                                  });
                                }}
                              >
                                {lecture.name}
                              </a>
                            </>
                          ) : lecture.type === "file" ? (
                            <>
                              <AttachFileIcon />
                              <a
                                onClick={() => {
                                  setParams({
                                    id: lecture.id,
                                    type: lecture.type,
                                    source: lecture.source
                                  });
                                }}
                              >
                                {lecture.name}
                              </a>
                            </>
                          ) : lecture.type === 'quizz' ? (
                            <>
                              <QuizOutlinedIcon sx={{ fontSize:'large' }} />
                              <a
                                onClick={() => {
                                  setParams({
                                    id: lecture.id,
                                    type: lecture.type,
                                    source: lecture.source
                                  });
                                }}
                              >
                                {lecture.name}
                              </a>
                            </>
                          ) : lecture.type === 'assignment' ? (
                            <>
                              <AssignmentOutlinedIcon sx={{ fontSize:'large' }}/>
                              <a
                                onClick={() => {
                                  setParams({
                                    id: lecture.id,
                                    type: lecture.type,
                                    source: lecture.source
                                  });
                                }}
                              >
                                {lecture.name}
                              </a>
                            </>
                          ) : null}
                        </h4>
                      </div>
                      <div style={{ flex: 0.1 }}>
                        {accessCourseData.learning.map((learn) => {
                          if (lecture.id === learn.lectureID) {
                            return (
                              <>
                                {learn.progress === 100 ? (
                                  <CheckCircleIcon
                                    style={{
                                      color: "#599cde",
                                      fontSize: "30px"
                                    }}
                                  />
                                ) : (
                                  <CircularProgressbar
                                    value={learn.progress}
                                    styles={{
                                      root: { width: 25 },
                                      backgroundColor: "#f9f9f9"
                                    }}
                                  />
                                )}
                              </>
                            );
                          }
                        })}
                      </div>
                    </div>
                    <div>
                      <p>{lecture.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </SideBarAccessCourseWrapper>
  );
}

const SideBarAccessCourseWrapper = styled.section`
  background-color: #f9f9f9;
  color: #555 !important;
  .course-content {
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
    h2 {
      margin: 0;
      font-size: 2rem;
      color: #333;
    }
  }

  .course-info {
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: 10px;
        padding: 10px 0;

        div {
          display: flex;
          align-items: center;

          h4 {
            margin: 0;
            font-size: 1.6rem !important;
            line-height: 1.6;
            color: #333 !important;
          }

          a {
            margin-left: 1.6rem;
            text-decoration: none;
            color: #333;
            font-size: 1.6rem;
            cursor: pointer;
            transition: color 0.3s ease;
            &:hover {
              color: #1971c2;
            }
          }

          p {
            margin-left: 1.5rem;
            font-size: 1.5rem;
            line-height: 1.6;
          }
        }
      }
    }
  }
`;

export default SideBarAccessCourse;
