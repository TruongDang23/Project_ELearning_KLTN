import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import styled from 'styled-components'

const ExcelImport = () => {
  const [jsonData, setJsonData] = useState(null)

  // Hàm để xử lý file Excel khi người dùng upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })

        // In ra tên các trang tính
        console.log('Sheet Names:', workbook.SheetNames)

        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]

        // Chuyển sheet thành JSON và in ra để kiểm tra
        const sheetData = XLSX.utils.sheet_to_json(firstSheet)
        console.log('Sheet data:', sheetData)

        // Kiểm tra nếu sheetData có dữ liệu trước khi tiếp tục xử lý
        if (sheetData && sheetData.length > 0) {
          // In ra các khóa của hàng đầu tiên để kiểm tra tên cột
          console.log('Column names:', Object.keys(sheetData[0]))

          // Kiểm tra xem các cột có đúng tên không và loại bỏ khoảng trắng
          const formattedData = sheetData.map((row) => {
            return {
              question: row['question'] ? row['question'].trim() : '',
              answers: row['answers']
                ? row['answers'].split('\n').map((answer) => answer.trim()) // Ngăn cách bằng dấu xuống dòng
                : [],
              key: [row['key'] ? row['key'].trim() : '']
            }
          })

          console.log('Formatted data:', formattedData)

          setJsonData({
            questions: formattedData
          })
        } else {
          console.error('Sheet data is empty or not valid.')
        }
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

export default ExcelImport
