const express = require ('express')
const router = express.Router ()
const authenticateToken = require ('./../auth/authMiddleware')
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

const { registerUser, loginUser, getAllUsers, deleteUser, updateUser } = require ('./../controller/userController')
const { loginDoctor, registerDoctor, getAllDoctors, deleteDoctor, updateDoctor } = require ('./../controller/doctorController')
const { registerPatient, getAllPatients, deletePatient, updatePatient } = require ('./../controller/patientController')
const { registerMedicine, getAllMedicines, deleteMedicine, updateMedicine } = require ('./../controller/medicineController')
const { registerSchedule, getAllSchedules, deleteSchedule, updateSchedule, getAvailableDateTimeSchedules } = require ('./../controller/scheduleController')

router.post ('/register', registerUser)
router.post ('/login', loginUser)
router.get ('/get-all-users', authenticateToken, getAllUsers)
router.delete ('/users/:email', authenticateToken, deleteUser)
router.put ('/users/:email', authenticateToken, updateUser)

router.post ('/register-doctor', upload.single('photo'), registerDoctor);
router.post ('/login-doctor', loginDoctor)
router.get ('/get-all-doctors', authenticateToken, getAllDoctors)
router.delete ('/doctors/:email', authenticateToken, deleteDoctor)
router.put ('/doctors/:email', upload.single('photo'), updateDoctor)

router.post ('/register-patient', upload.single('photo'), registerPatient)
router.get ('/get-all-patients', authenticateToken, getAllPatients)
router.delete ('/patients/:email', authenticateToken, deletePatient)
router.put ('/patients/:email', upload.single('photo'), authenticateToken, updatePatient)


router.post ('/register-medicine', registerMedicine)
router.get ('/get-all-medicines', authenticateToken, getAllMedicines)
router.delete ('/medicines/:name', authenticateToken, deleteMedicine)
router.put ('/medicines/:name', authenticateToken, updateMedicine)

router.post ('/register-schedule', registerSchedule)
router.get ('/get-all-schedules', authenticateToken, getAllSchedules)
router.delete ('/schedules/:id', authenticateToken, deleteSchedule)
router.put ('/schedules/:id', authenticateToken, updateSchedule)
router.get ('/get-available-date-time-schedules', authenticateToken, getAvailableDateTimeSchedules)

module.exports = router