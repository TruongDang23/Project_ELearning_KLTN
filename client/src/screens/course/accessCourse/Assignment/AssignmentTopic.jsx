import styled from "styled-components";

function AssignmentTopic({ title, question, sample }) {
  return (
    <AssignmentTopicWrapper>
      <h2>{title}</h2>
      <p>{question}</p>
      {/* Tạo bảng */}
      <table>
        <thead>
          <tr>
            <th>Input</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          {sample.map((item, index) => (
            <tr key={index}>
              <td>{item.case}</td>
              <td>{item.key}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AssignmentTopicWrapper>
  );
}

const AssignmentTopicWrapper = styled.aside`
  ${'' /* width: 100%; */}
  height: auto; /* Đảm bảo chiều cao tự động điều chỉnh */
  color: #e3e3e3;
  background-color: #333537;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 25rem;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }

  p {
    font-size: 1.6rem;
    font-weight: 400;
    margin-top: 1rem;
    line-height: 1.6;
  }

  table {
    font-size: 1.6rem;
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    border-collapse: collapse;

    th {
      background-color: #1976d2;
      border: 1px solid #e3e3e3;
      color: white;
      font-weight: 500;
      text-align: center;
      padding: 0.5rem;
    }

    td {
      padding: 0.5rem;
      border: 1px solid #e3e3e3;
    }
  }
`;

export default AssignmentTopic;
