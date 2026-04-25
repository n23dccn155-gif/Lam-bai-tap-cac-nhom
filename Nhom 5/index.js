const express = require('express');
const path = require('path');

// Khởi tạo app
const app = express();
const PORT = process.env.PORT || 3000;

// MW: Logger — ghi [time] METHOD /path ra console cho mọi request
const logger = (req, res, next) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    console.log(`[${time}] ${req.method} ${req.url}`);
    next();
};
app.use(logger);

// Middleware để parse body (cho POST request)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STATIC: serve file HTML cho trình duyệt từ thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// MW: checkAge — age < 18 hoặc không có -> trả 400 + message lỗi, ngược lại next()
const checkAge = (req, res, next) => {
    const age = req.query.age || req.body.age;
    if (!age || Number(age) < 18) {
        return res.status(400).json({ error: 'Tuổi không hợp lệ (phải >= 18)' });
    }
    next();
};

// GET /api/info?name=&age=
// Gắn checkAge. Trả JSON: name, age, lời chào mừng
app.get('/api/info', checkAge, (req, res) => {
    const { name, age } = req.query;
    res.json({
        name: name,
        age: age,
        message: `Xin chào ${name || 'bạn'}!`
    });
});

// POST /api/register — body: name, age, email
// Validate không bỏ trống. Trả lại thông tin + id tự tăng
let autoIncrementId = 1;
app.post('/api/register', (req, res) => {
    const { name, age, email } = req.body;
    
    // Validate không bỏ trống
    if (!name || !age || !email) {
        return res.status(400).json({ error: 'Vui lòng nhập đầy đủ tên, tuổi, email' });
    }

    const newUser = {
        id: autoIncrementId++,
        name,
        age,
        email,
        message: 'Đăng ký thành công!'
    };

    res.json(newUser);
});

// Bắt đầu server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
