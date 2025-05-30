<!-- **WEBSITE E-LEARNING**
1. Đây là đồ án tốt nghiệp + Tiểu luận chuyên ngành Công Nghệ Thông Tin
2. Có ứng dụng AI và ML trong việc phân tích tình trạng học tập của học viên, cũng như theo dõi và nhắc nhở học viên mỗi khi họ mất tập trung.
3. Ngoài ra đồ án có xây dựng model Giảng viên ảo giúp học viên sẽ được học và giải đáp thắc mắc 24/24.
4. Các công nghệ và thư viện được sử dụng:
- Node JS (version 20.11.1)
- Yarn (version 1.22.19)
- (MongoDB bổ sung sau, hoặc sử dụng một DB khác)
- (MySQL bổ sung sau, hoặc sử dụng một DB khác)
- Công cụ xây dựng source code: Vite (version 5.2.0)
- ![Screens](/src/assets/image.png "Screens Tree") -->

# BÁO CÁO KHÓA LUẬN TỐT NGHIỆP CÔNG NGHỆ PHẦN MỀM
## Trường Đại Học Sư Phạm Kỹ Thuật TP.HCM. Khoa Công Nghệ Thông Tin

# _Đề tài_: _Xây dựng hệ thống website E-learning cung cấp khóa học CNTT dùng React.js và Node.js_

### Nhóm sinh viên thực hiện:

- Đặng Quang Trường: 21110705
- Lê Thành Vinh: 21110940

### Giảng viên hướng dẫn: TS. Lê Vĩnh Thịnh

## Lý thuyết:

### 1. Đặt vấn đề:

- Sự phát triển nhanh của CNTT cùng yêu cầu khắt khe từ thị trường lao động đòi
  hỏi người học phải nâng cao kiến thức và kỹ năng.
- Đặc biệt là sau đại dịch Covid-19, mô hình học trực tuyến được thúc đẩy mạnh
  mẽ, giúp tiết kiệm chi phí, thời gian và tạo sự linh hoạt trong việc học tập
  mọi lúc, mọi nơi.

### 2. Giải pháp đề xuất:

Nhóm sinh viên chúng em đã chọn đề tài "Xây dựng website cung cấp các khóa học
CNTT dùng ReactJS và NodeJS". Nền tảng tập trung:

- Cung cấp khóa học CNTT từ cơ bản đến nâng cao, phù hợp nhiều đối tượng.
- Tích hợp tính năng quản lý khóa học, đánh giá chất lượng, tương tác học viên -
  giảng viên.
- Tối ưu trải nghiệm với công nghệ ReactJS và NodeJS.

### 3. Kiến trúc hệ thống:

![Kiến trúc hệ thống](/client/src/assets/readme/newstrucure.jpg)

### 4. Sơ đồ usecase

Admin

![admin](/client/src/assets/readme/ucAdmin.png)

Giảng viên ![gv](/client/src/assets/readme/ucInsruction.png)

Học viên ![hv](/client/src/assets/readme/ucStudent.png)

## Thực hành:

### 1. Cài đặt chương trình

Bước 1: Clone project về máy tính

Bước 2:

- Đầu tiên, mở cmd và tiến hành truy cập vào thư mục server bằng lệnh:
  `cd server`.
- Sau đó, dùng lệnh `npm i` để tiến hành cài đặt các thư viện.
- Dùng lệnh `npm run dev` để chạy server, và mở một cmd khác nhập lệnh
  `npm run socket` để chạy socket server.

Bước 3:

- Sau đó dùng lệnh `npm i` để tiến hành cài đặt các thư viện
- Dùng lệnh `npm run dev` để chạy client
- Nhập đường dẫn: `http://localhost:5173/` trên trình duyệt

### 2. Deploy lên VPS

Trang web được deploy trên VPS (Virtual Private Server) với tên miền là
[https://techskillup.online/](https://techskillup.online/)

### 3. Một số giao diện

Đăng nhập ![Đăng nhập](/client/src/assets/readme/login.png)

Trang chủ ![Trang chủ](/client/src/assets/readme/Home.png)

Chatbot trợ lý ![Chatbot trợ lý](/client/src/assets/readme/Chatbot.png)

Trang tìm kiếm khóa học
![Trang tìm kiếm khóa học](/client/src/assets/readme/Search.png)

Trang My Learning (Khóa học của tôi)
![Trang My Learning](/client/src/assets/readme/learning.png)

Trang chi tiết khóa học
![Trang chi tiết khóa học](/client/src/assets/readme/IntroCourse.png)

Trang truy cập khóa học
![Trang truy cập khóa học](/client/src/assets/readme/DetailCourse.png)

Tài nguyên File của khóa học
![Tài nguyên File của khóa học](/client/src/assets/readme/FileResource.png)

Tài nguyên Quizz của khóa học
![Tài nguyên Quizz của khóa học](/client/src/assets/readme/quizz.png)

Tài nguyên Assignment của khóa học
![Tài nguyên Assignment của khóa học](/client/src/assets/readme/asign.png)

Chat AI ![Chat AI](/client/src/assets/readme/ChatAI.png)

Face Detection ![Face Detection](/client/src/assets/readme/FaceDetect.png)

Câu hỏi tương tác
![Câu hỏi tương tác](/client/src/assets/readme/Interaction.png)

Tóm tắt bài giảng
![Tóm tắt bài giảng](/client/src/assets/readme/SummaryLecture.png)

Dashboard Admin ![Dashboard Admin](/client/src/assets/readme/DashboardAdmin.png)

Quản lí khóa học ![Quản lí khóa học](/client/src/assets/readme/quanlikhoa.png)

Quản lí người dùng ![Quản lí người dùng](/client/src/assets/readme//Account.png)

## Kết luận

### 1. Kiến thức đã tìm hiểu

- Công nghệ MERN Stack

- Kiến trúc Restful API.

- Tiêu chuẩn JSON Web Token (JWT) để xác thực người dùng

- Giao thức Web Socket

- Dịch vụ lưu trữ Google Cloud Storage

- Giải thuật Content-Based Filtering

- AI Automation trên nền tảng N8N

- Kỹ thuật Retrieval-Augmented Generation (RAG)

- Thư viện face-api.js

- Phương pháp xây dựng customer chatbot bằng các workflow thông qua nền tảng
  VoiceFlow

- Phương pháp thanh toán điện tử qua PayOS
- Tích hợp chức năng gửi mail bằng Gmail

- Quy trình xây dựng và deploy project lên VPS (Virtual Private Server)

### 2. Kiến thức đã áp dụng

- Xây dựng API bằng Node.js và Express Framework.

- Lưu trữ dữ liệu hệ thống kết hợp giữa MongoDB và MySQL.

- Ứng dụng JWT để xác thực người dùng, đảm bảo tính bảo mật và hiệu quả của hệ
  thống API.

- Xây dựng giao thức WebSocket để tạo kết nối trong thời gian thực giữa những
  người dùng trong hệ thống.

- Phát triển giao diện website bằng thư viện ReactJS.

- Sử dụng dịch vụ Google Cloud Storage để lưu trữ các file đa phương tiện của
  người dùng, khóa học

- Xây dựng tính năng gợi ý khóa học phù hợp đối với từng học viên dựa trên giải
  thuật Content-Based Filtering

- Sử dụng nền tảng N8N để tạo các workflow tự động, có tích hợp AI vào chức
  năng: Tóm tắt nội dung khóa học, Chatbot assistant dùng kỹ thuật RAG

- Sử dụng thư viện face-api.js để nhận diện độ tập trung của học viên trong các
  bài giảng video

- Xây dựng customer chatbot để hướng dẫn người dùng sử dụng website thông qua
  nền tảng VoiceFlow. Chatbot được xây dựng bằng phương pháp no-code & low-code
  mà chỉ cần thiết kế các workflow phù hợp

- Tích hợp PayOS nhằm thực hiện chức năng thanh toán điện tử để mua khóa học

- Thư viện nodemailer để tích hợp chức năng gửi mail qua dịch vụ Gmail

- Xây dựng và deploy project lên VPS, cấu hình domain để truy cập website global

### 3. Hướng mong muốn nghiên cứu

- Cấu hình cân bằng tải cho project trên VPS để có thể chịu được lượng truy cập
  lớn trong cùng một thời điểm

- Xây dựng mô hình giảng viên ảo để hướng đến một website có nội dung đa dạng
  hơn, học viên được hỗ trợ mọi lúc, mọi nơi bởi AI

- Tối ưu hóa kỹ thuật RAG để cải thiện thời gian hỏi – đáp của học viên

- Ứng dụng giao thức MCP (Model Context Protocol) để mở rộng hệ sinh thái AI
  trên website
