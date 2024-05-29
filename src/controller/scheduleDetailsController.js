const jwt = require ('jsonwebtoken')
const scheduleDetails = require ('../models/scheduleDetailsModel')
const schedule = require ('../models/scheduleModel')
const patient = require ('../models/patientModel')
const doctor = require ('../models/doctorModel')

const registerScheduleDetails = async (req, res) =>
{
    try 
    {
        const { id, email_doctor, email_patient, sugar, oxygen_saturation, blood_pressure, diagnostic, diagnostic_details, degree, comments, treatment, prescription, payment, payment_completed } = req.body

        console.log('@ Keyla => Data controller',id, email_doctor, email_patient, sugar, oxygen_saturation, blood_pressure, diagnostic, diagnostic_details, degree, comments, treatment, prescription, payment, payment_completed)

        const newScheduleDetails = await scheduleDetails.createScheduleDetails (id, email_doctor, email_patient, sugar, oxygen_saturation, blood_pressure, diagnostic, diagnostic_details, degree, comments, treatment, prescription, payment, payment_completed)

        console.log ('@ Keyla => schedule', newScheduleDetails)

        console.log('Schedule Details registered successfully')

        res.status (201).json
        ({
            message: 'Schedule Details registered successfully',
            schedule_details: newScheduleDetails
        })
    } 
    catch (err) 
    {
        console.log('Internal Server Error')

        res.status (500).json
        ({
            message: 'Internal Server Error'
        })
    }
}

const getAllSchedulesDetails = async (req, res) =>
{
    try 
    {
        const schedulesDetails = await scheduleDetails.getAllSchedulesDetails ()

        console.log ('@ Keyla => Schedule Details', schedulesDetails)

        const schedulesDetailsMore = await Promise.all
        (
            schedulesDetails.map(async (scheduleDetail) => 
            {
                const scheduleData = await schedule.findById (scheduleDetail.id)
                const patientData = await patient.findByEmail (scheduleDetail.email_patient)
                const doctorData = await doctor.findByEmail (scheduleDetail.email_doctor)

                return {
                    ...scheduleDetail,
                    patient: patientData,
                    doctor: doctorData,
                    schedule: scheduleData
                }
            })
        )

        return res.json
        ({
            schedules_details: schedulesDetailsMore,
            message: 'Success'
        })
    } 
    catch (err) 
    {
        console.log('Internal Server Error Controller')

        res.status (500).json
        ({
            message: 'Internal Server Error Controller'
        })
    }
}

const deleteScheduleDetails = async (req, res) =>
{
    const id = req.params.id

    try 
    {
        await scheduleDetails.deleteScheduleDetails (id)
        
        res.setHeader('x-message', 'Schedule Details deleted');

        res.status(204).send();
    } 
    catch (err) 
    {
        console.log('Internal Server Error Controller')

        res.status (500).json
        ({
            message: 'Internal Server Error Controller'
        })
    }
}

const updateScheduleDetails = async (req, res) =>
{
    const id = req.params.id
    const data = req.body

    try 
    {
        const scheduleDetailsUpdated = await scheduleDetails.updateScheduleDetails (id, data)
        
        res.json
        ({
            scheduleDetailsUpdated,
            message: 'Success'
        })
    } 
    catch (err) 
    {
        console.log('Internal Server Error Controller')

        res.status (500).json
        ({
            message: 'Internal Server Error Controller'
        })
    }
}

module.exports = { registerScheduleDetails, getAllSchedulesDetails, deleteScheduleDetails, updateScheduleDetails }