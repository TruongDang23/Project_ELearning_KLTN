import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import styled from 'styled-components'

const ExelAssignment = () => {
  const [jsonData, setJsonData] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })

        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]

        // Chuyển sheet thành JSON
        const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
        console.log('Sheet data:', sheetData)

        // Xử lý dữ liệu thành định dạng JSON mong muốn
        const formattedData = []

        for (let i = 1; i < sheetData.length; i++) {
          const row = sheetData[i]

          // Kiểm tra tiêu đề và câu hỏi
          if (row[0]) {
            // Tìm kiếm xem tiêu đề đã tồn tại trong formattedData chưa
            const existingTopic = formattedData.find(
              (topic) => topic.title === row[0]
            )

            // Nếu tồn tại, thêm sample và testcases
            if (existingTopic) {
              // Kiểm tra và thêm dữ liệu vào sample
              if (row[2]) {
                existingTopic.sample.push({
                  case: row[2],
                  key: row[3]
                })
              }

              // Kiểm tra và thêm dữ liệu vào testcases
              if (row[4]) {
                existingTopic.testcases.push({
                  case: row[4],
                  key: row[5]
                })
              }
            } else {
              // Nếu không tồn tại, tạo mới topic
              const newTopic = {
                title: row[0],
                question: row[1],
                sample: [],
                testcases: []
              }

              // Thêm dữ liệu vào sample
              if (row[2]) {
                newTopic.sample.push({
                  case: row[2],
                  key: row[3]
                })
              }

              // Thêm dữ liệu vào testcases
              if (row[4]) {
                newTopic.testcases.push({
                  case: row[4],
                  key: row[5]
                })
              }

              // Thêm newTopic vào formattedData
              formattedData.push(newTopic)
            }
          }
        }

        console.log('Formatted data:', formattedData)
        setJsonData({ topics: formattedData })
      }

      reader.readAsArrayBuffer(file)
    }
  }

  return (
    <Wrapper>
      <div className="header">
        <h2>Import file Excel và chuyển thành JSON</h2>

        {/* Input để chọn file */}
        <input type="file" onChange={handleFileUpload} />
      </div>

      {/* Hiển thị JSON kết quả */}
      <pre>
        {jsonData ? JSON.stringify(jsonData, null, 2) : 'Chưa có dữ liệu'}
      </pre>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;

  gap: 20px;

  .header {
    display: flex;
    flex-direction: column;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  input {
    padding: 10px;
    margin-bottom: 20px;
  }

  pre {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    max-width: 800px;
    width: 100%;
    overflow: auto;
  }
`

export default ExelAssignment
