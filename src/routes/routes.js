const express = require ('express')
const router = express.Router ()
const authenticateToken = require ('./../auth/authMiddleware')
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

const { loginDoctor, registerDoctor, getAllDoctors, deleteDoctor, updateDoctor } = require ('./../controller/doctorController')
const { registerPatient, getAllPatients, deletePatient, updatePatient } = require ('./../controller/patientController')
const { registerMedicine, getAllMedicines, deleteMedicine, updateMedicine } = require ('./../controller/medicineController')
const { registerSchedule, getAllSchedules, deleteSchedule, updateSchedule, getAvailableDateTimeSchedules } = require ('./../controller/scheduleController')
const { registerScheduleDetails, getAllSchedulesDetails, deleteScheduleDetails, updateScheduleDetails} = require ('./../controller/scheduleDetailsController')
const { registerAdmin, getAllAdmins, deleteAdmin, updateAdmin } = require ('./../controller/adminController')
const { registerTest, getAllTests, deleteTest, updateTest } = require ('./../controller/testController')

router.post ('/register-doctor', upload.single('photo'), registerDoctor);
router.post ('/login-doctor', loginDoctor)
router.get ('/get-all-doctors', authenticateToken, getAllDoctors)
router.delete ('/doctors/:email', authenticateToken, deleteDoctor)
router.put ('/doctors/:email', upload.single('photo'), authenticateToken, updateDoctor)

router.post ('/register-patient', upload.single('photo'), authenticateToken, registerPatient)
router.get ('/get-all-patients', authenticateToken, getAllPatients)
router.delete ('/patients/:email', authenticateToken, deletePatient)
router.put ('/patients/:email', upload.single('photo'), authenticateToken, updatePatient)

router.post ('/register-medicine', authenticateToken, registerMedicine)
router.get ('/get-all-medicines', authenticateToken, getAllMedicines)
router.delete ('/medicines/:name', authenticateToken, deleteMedicine)
router.put ('/medicines/:name', authenticateToken, updateMedicine)

router.post ('/register-schedule', authenticateToken, registerSchedule)
router.get ('/get-all-schedules', authenticateToken, getAllSchedules)
router.delete ('/schedules/:id', authenticateToken, deleteSchedule)
router.put ('/schedules/:id', authenticateToken, updateSchedule)
router.get ('/get-available-date-time-schedules', authenticateToken, getAvailableDateTimeSchedules)

router.post ('/register-schedule-details', authenticateToken, registerScheduleDetails)
router.get ('/get-all-schedules-details', authenticateToken, getAllSchedulesDetails)
router.delete ('/schedules-details/:id', authenticateToken, deleteScheduleDetails)
router.put ('/schedules-details/:id', authenticateToken, updateScheduleDetails)

router.post ('/register-admin', authenticateToken, registerAdmin)
router.get ('/get-all-admins', authenticateToken, getAllAdmins)
router.delete ('/admins/:email', authenticateToken, deleteAdmin)
router.put ('/admins/:email', authenticateToken, updateAdmin)

router.post ('/register-test', registerTest)
router.get ('/get-all-tests', getAllTests)
router.delete ('/tests/:email', authenticateToken, deleteTest)
router.put ('/tests/:email', authenticateToken, updateTest)

module.exports = router