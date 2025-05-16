# HTTP Request Data Types

# Body (Request body)

- Định nghĩa: Là phần dữ liệu được gửi trong thân của HTTP request, thường ở định dạng JSON, XML hoặc form-data.
- Cách sử dụng: Thường dùng với các phương thức POST, PUT, PATCH. Dữ liệu được gửi trong phần thân của request, không hiển thị trong URL.
- Lưu ý: Cần sử dụng middleware như express.json() để phân tích dữ liệu JSON. Thích hợp để gửi dữ liệu phức tạp.

# Params (Path parameters)

- Định nghĩa: Là các tham số được nhúng trực tiếp vào đường dẫn URL, dùng để xác định tài nguyên cụ thể.
- Cách sử dụng: Được định nghĩa trong URL với dấu hai chấm : (trong Express.js) hoặc trong {} (trong Swagger/OpenAPI). Thường dùng với các phương thức HTTP như GET, PUT, DELETE.
- Lưu ý: params là bắt buộc và không nên để trống. Thích hợp để xác định tài nguyên cụ thể (ví dụ: người dùng, bài viết).

# Query (Query parameters)

- Định nghĩa: Là các cặp key-value được thêm vào sau dấu ? trong URL, dùng để truyền thông tin bổ sung như lọc, sắp xếp, phân trang.
- Cách sử dụng: Thường dùng với phương thức GET. Có thể có nhiều tham số, phân tách bằng dấu &.
- Lưu ý: query là tùy chọn và có thể có giá trị mặc định. Thích hợp cho các thao tác lọc, tìm kiếm, phân trang.
