const jwt = require ('jsonwebtoken')
const test = require ('../models/testModel')
const patient = require ('../models/patientModel')
const doctor = require ('../models/doctorModel')
const adm = require ('../models/adminModel')
const { DateTime } = require('luxon')

const registerTest = async (req, res) =>
{
    try 
    {
        const { email_doctor, email_patient, date, time, email_admin, status, time_taken, result } = req.body

        console.log('@ Keyla => Data controller', email_doctor, email_patient, date, time, email_admin, status, time_taken, result)

        const now = DateTime.now().setZone('America/Mexico_City')
        const id = now.toFormat('yyyyMMddHHmmss')
        
        console.log('@ Keyla => id ', id)

        const newTest = await test.createTest (id, email_doctor, email_patient, date, time, email_admin, status, time_taken, result)

        console.log ('@ Keyla => test', newTest)

        console.log('Test registered successfully')

        res.status (201).json
        ({
            message: 'Test registered successfully',
            test: newTest
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

const getAllTests = async (req, res) =>
{
    try 
    {
        const tests = await test.getAllTests ()

        const testsDetails = await Promise.all
        (
            tests.map(async (test) => 
            {
                const patientData = await patient.findByEmail (test.email_patient)
                const doctorData = await doctor.findByEmail (test.email_doctor)
                const adminData = await adm.findByEmail (test.email_admin)

                return {
                    ...test,
                    patient: patientData,
                    doctor: doctorData,
                    adm: adminData
                }
            })
        )

        console.log ('@ Keyla => Patient Test', testsDetails)

        return res.json
        ({
            tests: testsDetails,
            message: 'Success'
        })
    } 
    catch (err) 
    {
        console.log('Internal Server Error Controller tests get all', err)

        res.status (500).json
        ({
            message: 'Internal Server Error Controller'
        })
    }
}

const deleteTest = async (req, res) =>
{
    const id = req.params.id

    try 
    {
        await test.deleteTest (id)
        
        res.setHeader('x-message', 'Test deleted');

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

const updateTest = async (req, res) =>
{
    const id = req.params.id
    const data = req.body

    try 
    {
        const testUpdated = await test.updateTest(id, data)
        
        res.json
        ({
            testUpdated,
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

module.exports = { registerTest, getAllTests, deleteTest, updateTest }