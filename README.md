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

# BÁO CÁO TIỂU LUẬN CHUYÊN NGÀNH CÔNG NGHỆ PHẦN MỀM

## *Đề tài*: Xây dựng hệ thống website E-learning cung cấp khóa học CNTT dùng React.js và Node.js

### Nhóm sinh viên thực hiện:

- Đặng Quang Trường: 21110705
- Lê Thành Vinh: 21110940

### Giảng viên hướng dẫn: TS. Lê Vĩnh Thịnh
### Giảng viên phản biện: TS. Huỳnh Xuân Phụng

## Lý thuyết:

### 1. Đặt vấn đề:

- Sự phát triển nhanh của CNTT cùng yêu cầu khắt khe từ thị trường lao động đòi hỏi người học phải nâng cao kiến thức và kỹ năng.
- Đặc biệt là sau đại dịch Covid-19, mô hình học trực tuyến được thúc đẩy mạnh mẽ, giúp tiết kiệm chi phí, thời gian và tạo sự linh hoạt trong việc học tập mọi lúc, mọi nơi.

### 2. Giải pháp đề xuất:

Nhóm sinh viên chúng em đã chọn đề tài "Xây dựng website cung cấp các khóa học CNTT dùng ReactJS và NodeJS". Nền tảng tập trung:

- Cung cấp khóa học CNTT từ cơ bản đến nâng cao, phù hợp nhiều đối tượng.
- Tích hợp tính năng quản lý khóa học, đánh giá chất lượng, tương tác học viên - giảng viên.
- Tối ưu trải nghiệm với công nghệ ReactJS và NodeJS.

### 3. Kiến trúc hệ thống:

![Kiến trúc hệ thống](/src/assets/readme/kt.png)

### 4. Sơ đồ usecase

Admin

![admin](/src/assets/readme/admin.png)
![admin](/src/assets/readme/admin2.png)

Giảng viên
![gv](/src/assets/readme/gv.png)

Học viên
![hv](/src/assets/readme/hv.png)
![hv](/src/assets/readme/hv2.png)

## Thực hành:

### 1. Cài đặt chương trình

Bước 1: Clone project về máy tính

Bước 2:

- Đầu tiên, mở cmd và tiến hành truy cập vào thư mục server bằng lệnh: `cd server`.
- Sau đó, dùng lệnh `npm i` để tiến hành cài đặt các thư viện.
- Dùng lệnh `npm run dev` để chạy server, và mở một cmd khác nhập lệnh `npm run socket` để chạy socket server.

Bước 3:

- Sau đó dùng lệnh `npm i` để tiến hành cài đặt các thư viện
- Dùng lệnh `npm run dev` để chạy client
- Nhập đường dẫn: `http://localhost:5173/` trên trình duyệt

### 2. Một số giao diện

Đăng nhập
![Đăng nhập](/src/assets/readme/dangnhap.png)

Trang chủ
![Trang chủ](/src/assets/readme/trangchu.png)

Trang tìm kiếm khóa học
![Trang tìm kiếm khóa học](/src/assets/readme/timkiem.png)

Trang My Learning (Khóa học của tôi)
![Trang My Learning](/src/assets/readme/mylearning.png)

Trang chi tiết khóa học
![Trang chi tiết khóa học](/src/assets/readme/chitiet.png)

Trang truy cập khóa học
![Trang truy cập khóa học](/src/assets/readme/truycap.png)

Tài nguyên Video của khóa học
![Tài nguyên Video của khóa học](/src/assets/readme/video.png)

Tài nguyên File của khóa học
![Tài nguyên File của khóa học](/src/assets/readme/file.png)

Tài nguyên Quizz của khóa học
![Tài nguyên Quizz của khóa học](/src/assets/readme/quizz.png)

Tài nguyên Assignment của khóa học
![Tài nguyên Assignment của khóa học](/src/assets/readme/asign.png)

Giao diện trang Manage Courses (Quản lý khóa học)
![Giao diện trang Manage Courses](/src/assets/readme/quanlikhoa.png)

## Kết luận
### 1. Kiến thức đã tìm hiểu
- Công nghệ MERN Stack
- Kiến trúc Restful API.
- Tiêu chuẩn JSON Web Token (JWT) để xác thực người dùng.
- Giao thức Socket. 
- Phương pháp tích hợp dịch vụ Azure Open AI và Google Cloud Storeage vào đồ án.

### 2. Kiến thức đã áp dụng
- Xây dựng API bằng Node.js và Express Framework.
- Lưu trữ dữ liệu hệ thống kết hợp MongoDB và MySQL.
- Ứng dụng JWT để đảm bảo tính bảo mật và hiệu quả của hệ thống API.
- Tích hợp giao thức WebSocket để tạo kết nối runtime giữa những người dùng trong hệ thống.
- Phát triển giao diện website bằng thư viện ReactJS.
- Sử dụng dịch vụ Azure OpenAI để tích hợp Chatbot assistant vào website nhằm nâng cao trải nghiệm người dùng.
- Sử dụng dịch vụ Google Cloud Storage để lưu trữ các file đa phương tiện của người dùng, khóa học

### 3. Hướng mong muốn nghiên cứu
- Xây dựng thêm tác nhân Admin để quản lý toàn bộ tài nguyên của website. 
- Deploy website và xây dựng cơ chế cân bằng tải.
- Training mô hình LLM để Chatbot có thể hiểu được ngữ cảnh cụ thể của người dùng website.
- Tích hợp mô hình gợi ý sản phẩm.
- Tích hợp Chatbot hướng dẫn sử dụng website.
- Xây dựng mô hình giảng viên ảo. 
- Xây dựng mô hình eye tracking để theo dõi độ tập trung của học viên.