import styled from "styled-components";
import { useState } from "react";
import AssignmentTopic from "./AssignmentTopic";
import CodeEditor from "./CodeEditor";

function AssignmentContent({ title, question, sample, testcases }) {
  const [topicWidth, setTopicWidth] = useState(40); // Initial width in percentage

  const handleMouseMove = (e) => {
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 80) {
      // Set limits to avoid collapsing
      setTopicWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <AssignmentContentWrapper>
      <ResizablePanel style={{ width: `${topicWidth}%` }}>
        <AssignmentTopic title={title} question={question} sample={sample} />
      </ResizablePanel>
      <Separator onMouseDown={handleMouseDown} />
      <ResizablePanel style={{ width: `${100 - topicWidth}%` }}>
        <CodeEditor testcases={testcases} />
      </ResizablePanel>
    </AssignmentContentWrapper>
  );
}

const AssignmentContentWrapper = styled.section`
  display: flex;
  margin-top: 1rem;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }


`;

const ResizablePanel = styled.div`
  overflow: auto;

  @media (max-width: 768px) {
    width: 100% !important;
  }
`;

const Separator = styled.div`
  width: 5px;
  background-color: #ccc;
  cursor: col-resize;
  user-select: none;
`;

export default AssignmentContent;
