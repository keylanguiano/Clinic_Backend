const jwt = require ('jsonwebtoken')
const schedule = require ('../models/scheduleModel')
const patient = require ('../models/patientModel')
const doctor = require ('../models/doctorModel')
const { DateTime } = require('luxon')

const getAvailableDateTimeSchedules = async (req, res) =>
{
    try
    {
        const { email_doctor, date } = req.query

        console.log('@ Keyla => Doctor and Date Available ', email_doctor, date)

        const doctorSchedulesDate = await schedule.findByDoctorAndDate (email_doctor, date)

        console.log('@ Keyla => Doctor Schedules Date ', doctorSchedulesDate)

        const startTime = 9 * 60;
        const endTime = 24 * 60;
        const interval = 30;

        const bookedTimes = []

        doctorSchedulesDate.forEach (schedule => 
        {
            const [startHour, startMinute] = schedule.time.split(':').map(Number)
            const duration = 30
            const endTime = startHour * 60 + startMinute + duration

            for (let time = startHour * 60 + startMinute; time < endTime; time += interval) 
            {
                bookedTimes.push(time)
            }
        })

        const availableTimes = []

        for (let time = startTime; time <= endTime; time += interval) 
        {
            if (!bookedTimes.includes(time)) 
            {
                const hour = Math.floor(time / 60).toString().padStart(2, '0')
                const minute = (time % 60).toString().padStart(2, '0')

                availableTimes.push(`${hour}:${minute}`) 
            }
        }
        
        console.log('@ Keyla => Doctor Available Times', availableTimes)

        res.status(200).json
        ({ 
            availableTimes
        })
    } 
    catch (err) 
    {
        console.log('Internal Server Error', err)

        res.status(500).json
        ({ 
            message: 'Internal Server Error' 
        })
    }
}

const registerSchedule = async (req, res) =>
{
    try 
    {
        const { email_doctor, name_patient, email_patient, phone_patient, address_patient, date, time, room } = req.body

        console.log('@ Keyla => Data controller', email_doctor, name_patient, email_patient, phone_patient, address_patient, date, time, room)

        const doctorSchedule = await schedule.findByDoctorAndDateTime (email_doctor, date, time)
        
        if (doctorSchedule) 
        {
            return res.status(400).json
            ({ 
                message: 'Doctor already has a schedule at the specified date and time'
            })
        }

        const patientSchedule = await schedule.findByPatientAndDateTime (email_patient, date, time)

        if (patientSchedule) 
        {
            return res.status(400).json
            ({ 
                message: 'Patient already has a schedule at the specified date and time'
            })
        }

        const now = DateTime.now().setZone('America/Mexico_City')
        const id = now.toFormat('yyyyMMddHHmmss')
        
        console.log('@ Keyla => id ', id)

        const newSchedule = await schedule.createSchedule (id, email_doctor, name_patient, email_patient, phone_patient, address_patient, date, time, room)

        console.log ('@ Keyla => schedule', newSchedule)

        console.log('Schedule registered successfully')

        res.status (201).json
        ({
            message: 'Schedule registered successfully',
            schedule: newSchedule
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

const getAllSchedules = async (req, res) =>
{
    try 
    {
        const schedules = await schedule.getAllSchedules ()

        const schedulesDetails = await Promise.all
        (
            schedules.map(async (schedule) => 
            {
                const patientData = await patient.findByEmail (schedule.email_patient)
                const doctorData = await doctor.findByEmail (schedule.email_doctor)

                return {
                    ...schedule,
                    patient: patientData,
                    doctor: doctorData
                }
            })
        )

        console.log ('@ Keyla => Patient Schedule', schedulesDetails)

        return res.json
        ({
            schedules: schedulesDetails,
            message: 'Success'
        })
    } 
    catch (err) 
    {
        console.log('Internal Server Error Controller schedule get all', err)

        res.status (500).json
        ({
            message: 'Internal Server Error Controller'
        })
    }
}

const deleteSchedule = async (req, res) =>
{
    const id = req.params.id

    try 
    {
        await schedule.deleteSchedule (id)
        
        res.setHeader('x-message', 'Schedule deleted');

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

const updateSchedule = async (req, res) =>
{
    const id = req.params.id
    const data = req.body

    try 
    {
        const scheduleUpdated = await schedule.updateSchedule (id, data)
        
        res.json
        ({
            scheduleUpdated,
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

module.exports = { getAvailableDateTimeSchedules, registerSchedule, getAllSchedules, deleteSchedule, updateSchedule }