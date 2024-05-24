const jwt = require ('jsonwebtoken')
const patient = require ('../models/patientModel')
const { admin, bucket } = require('../config/firebase')
const { Storage } = require ('@google-cloud/storage')

const storage = new Storage ()

const uploadPhoto = async (photo, folder) => {
    try 
    {
        const blob = bucket.file(`${folder}/${photo.originalname}`)

        const blobStream = blob.createWriteStream
        ({
            resumable: false
        })

        await new Promise ((resolve, reject) => 
        {
            blobStream.on ( 'error', err => reject
            (
                new Error ('Error uploading photo ' + err.message)
            ))

            blobStream.on ('finish', resolve)

            blobStream.end(photo.buffer)
        })

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${folder}/${photo.originalname}`

        return publicUrl
    } 
    catch (err) 
    {
        console.error('Error uploading photo', err)

        throw err
    }
}

const deletePhoto = async (photo, folder) => 
{
    try 
    {
        const name = photo.split ('/').pop ()
        const ref = bucket.file(`${folder}/${name}`)
        
        await ref.delete ()

        console.log ('Photo deleted successfully')
    } 
    catch (err) 
    {
        console.error ('Error deleting photo:', err)
        throw new Error ('Error deleting photo')
    }
}

const registerPatient = async (req, res) =>
{
    try 
    {
        const { name, age, sex, phone, email, address } = req.body
        const photo = req.file;

        console.log ('Data controller', req.body)
        console.log ('Data controller foto', req.file)

        if (!photo) 
        {
            return res.status(400).json
            ({ 
                message: 'Photo is required' 
            })
        }

        const existingPatient = await patient.findByEmail (email)

        if (existingPatient)
        {
            console.log('Patient already exists')

            return res.status (400).json
            ({
                message: 'Patient already exists'
            })
        }

        const photoPatient = await uploadPhoto (photo, 'CLINIC/PATIENTS')

        console.log ('@ Keyla => photo patient controller', photoPatient)

        const newPatient = await patient.createPatient (photoPatient, name, age, sex, phone, email, address)

        console.log ('@ Keyla => newPatient controller', newPatient)

        console.log('Patient registered successfully')

        res.status (201).json
        ({
            message: 'Patient registered successfully',
            patient: newPatient
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

const getAllPatients = async (req, res) =>
{
    try 
    {
        const patients = await patient.getAllPatients ()

        return res.json
        ({
            patients,
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

const deletePatient = async (req, res) =>
{
    const email = req.params.email

    try 
    {
        await patient.deletePatient (email)
        
        res.setHeader('x-message', 'Patient deleted');

        return res.status(200).json
        ({
            message: 'Patient deleted successfully'
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

const updatePatient = async (req, res) =>
{
    const email = req.params.email
    const data = req.body
    const photo = req.file;

    try 
    {
        const existingPatient = await patient.findByEmail (email)

        if (!existingPatient)
        {
            return res.status (404).json
            ({ 
                message: 'Patient not found' 
            })
        }

        if (photo) 
        {
            if (existingPatient.photo) 
            {
                await deletePhoto (existingPatient.photo, 'CLINIC/PATIENTS')
            }

            const photoPatient = await uploadPhoto (photo, 'CLINIC/V')
            data.photo = photoPatient
        }

        const patientUpdated = await patient.updatePatient (email, data)
        
        console.log ('Updating successfully patient')

        res.json
        ({
            patientUpdated,
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

module.exports = { registerPatient, uploadPhoto, deletePhoto, getAllPatients, deletePatient, updatePatient }