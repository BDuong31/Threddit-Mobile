// --- 1. DỮ LIỆU NGƯỜI DÙNG GIẢ ĐỊNH (Input Check) ---
export const MOCK_USER_DATA = [
    {
        email: "success@threddit.com",
        password: "SuccessPass123", // Mật khẩu cho kịch bản thành công
        username: "thanhconguser",
        status: "active",
        userId: "u12345",
        name: "Người Dùng Thành Công"
    },
    {
        email: "locked@threddit.com",
        password: "LockedPass789", // Mật khẩu cho kịch bản bị khóa
        username: "lockeduser",
        status: "locked",
        userId: "u54321",
        name: "Người Dùng Bị Khóa"
    },
    {
        email: "pending@threddit.com",
        password: "PendingPass000", // Mật khẩu cho kịch bản chưa kích hoạt
        username: "pendinguser",
        status: "pending",
        userId: "u00000",
        name: "Người Dùng Chờ Kích Hoạt"
    },
    // Lưu ý: Nếu email/password không có trong danh sách này, nó sẽ được coi là LỖI SAI TÀI KHOẢN/MẬT KHẨU
];

// --- 2. RESPONSE MOCK CHO CÁC KỊCH BẢN API (Output Data) ---

// 2a. Đăng nhập THÀNH CÔNG (HTTP 200 OK)
export const MOCK_LOGIN_SUCCESS = {
    statusCode: 200,
    response: {
        success: true,
        message: "Đăng nhập thành công! Chuyển hướng đến Xem Bản Tin...",
        data: {
            user: {
                id: "u12345",
                username: "thanhconguser",
                email: "success@threddit.com",
                firstName: "Thanh",
                lastName: "Cong"
            },
            // Token JWT giả định
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1MTIzNDUiLCJlbWFpbCI6InN1Y2Nlc3NAdGhyZWRkaXQuY29tIiwiaWF0IjoxNjYzMDc3MjAwLCJleHAiOjE2NjMwODA4MDB9.EXAMPLE_MOCK_TOKEN",
            // Lưu token này vào cookie/local storage
            expiresIn: 3600 // Thời gian hết hạn tính bằng giây (1 giờ)
        }
    }
};

// 2b. Đăng nhập THẤT BẠI (Sai email/mật khẩu) (HTTP 401 Unauthorized)
export const MOCK_LOGIN_FAIL_CREDENTIALS = {
    statusCode: 401,
    response: {
        success: false,
        errorCode: "AUTH001",
        message: "Sai email hoặc mật khẩu. Vui lòng kiểm tra lại.",
        displayToast: true
    }
};

// 2c. Đăng nhập THẤT BẠI (Tài khoản bị khóa) (HTTP 403 Forbidden)
export const MOCK_LOGIN_FAIL_LOCKED = {
    statusCode: 403,
    response: {
        success: false,
        errorCode: "AUTH002",
        message: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ bộ phận hỗ trợ.",
        displayToast: true
    }
};

// 2d. Quên Mật khẩu THÀNH CÔNG (Sau khi nhấn 'Nhấn nút xác nhận') (HTTP 200 OK)
export const MOCK_FORGOT_PASSWORD_SUCCESS = {
    statusCode: 200,
    response: {
        success: true,
        message: "Link đặt lại mật khẩu đã được gửi đến email của bạn.",
        displayToast: true
    }
};

// 2e. Quên Mật khẩu THẤT BẠI (Email không tồn tại) (HTTP 404 Not Found)
export const MOCK_FORGOT_PASSWORD_FAIL_NOT_FOUND = {
    statusCode: 404,
    response: {
        success: false,
        errorCode: "USER404",
        message: "Không tìm thấy người dùng với email này trong hệ thống.",
        displayToast: true
    }
};

// 3a Đăng ký THÀNH CÔNG (HTTP 201 Created)
export const MOCK_REGISTER_SUCCESS = {
    statusCode: 200,
    response: {
        success: true,
        message: "Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.",
    }
};

// 3b Đăng ký THẤT BẠI (Email đã tồn tại) (HTTP 409 Conflict)
export const MOCK_REGISTER_FAIL_EMAIL_EXISTS = {
    statusCode: 409,
    response: {
        success: false,
        errorCode: "AUTH003",
        message: "Email này đã được sử dụng. Vui lòng sử dụng email khác.",
        displayToast: true
    }
};
