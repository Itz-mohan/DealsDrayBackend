const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');

const sequelize = require('./src/config/dbConfig');

const { CreateUser, UserLogin } = require('./src/services/Login');
const {
  GetEmployees,
  CreateAndUpdateEmployee,
  SearchEmployees,
  DeActiveEmployees,
  GetEmployeeById,
  DeleteEmployees,
} = require('./src/services/Employee');

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '20mb' }));
app.use('/', router);

router.get('/', (req, res) => {
  res.send('Welcome To DealsDray');
});
router.post('/create-login', CreateUser);
router.post('/login', UserLogin);
router.get('/employees', GetEmployees);
router.get('/get-employee', GetEmployeeById);
router.post('/upsert-employee', upload.single('file'), CreateAndUpdateEmployee);
router.get('/search', SearchEmployees);
router.post('/status', DeActiveEmployees);
router.post('/delete', DeleteEmployees);

app.listen(port, () => {
  console.log(`Server is running successfully in http://localhost:${port}`);
});
