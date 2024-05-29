const jwt = require ('jsonwebtoken')
const doctor = require ('../models/doctorModel')
const { admin, bucket } = require('../config/firebase')
const { Storage } = require ('@google-cloud/storage')

const storage = new Storage ()

const loginDoctor = async (req, res) =>
{
    try
    {
        const { email, password } = req.body

        const doctorDoc = await doctor.findByEmail (email)

        if (!doctorDoc)
        {
            console.log('Doctor not found')

            return res.status (404).json
            ({
                message: 'Doctor not found'
            })
        }

        const isValidPassword = await doctorDoc.verifyPassword (password)

        if (!isValidPassword)
        {
            console.log('Invalid Credentials')
            
            return res.status (401).json
            ({
                message: 'Invalid Credentials'
            })
        }

        // Token
        const token = jwt.sign 
        ({ 
            email: doctorDoc.email 
        }, process.env.SECRET, { expiresIn: '1h' })

        console.log('Success')

        res.status (200).json ({ 
            message: 'Success',
            token 
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

const registerDoctor = async (req, res) =>
{
    try 
    {
        const { name, email, password } = req.body
        const photo = req.file;
        specialist = req.body.specialist.split (',')
        degree = req.body.degree.split (',')

        console.log ('Data controller', req.body)
        console.log ('Data controller foto', req.file)

        if (!photo) 
        {
            return res.status(400).json
            ({ 
                message: 'Photo is required' 
            })
        }

        const existingDoctor = await doctor.findByEmail (email)

        if (existingDoctor)
        {
            console.log('Doctor already exists')

            return res.status (400).json
            ({
                message: 'Doctor already exists'
            })
        }

        const photoDoctor = await uploadPhoto (photo, 'CLINIC/DOCTORS')

        console.log ('photoDoctor controller', photoDoctor)

        const newDoctor = await doctor.createDoctor(photoDoctor, name, specialist, degree, email, password)

        console.log ('newDoctor controller', newDoctor)

        console.log('Doctor registered successfully')

        res.status (201).json
        ({
            message: 'Doctor registered successfully',
            doctor: newDoctor
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

const getAllDoctors = async (req, res) =>
{
    try 
    {
        const doctors = await doctor.getAllDoctors ()

        return res.json
        ({
            doctors,
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

const deleteDoctor = async (req, res) =>
{
    const email = req.params.email

    try 
    {
        const existingDoctor = await doctor.findByEmail (email)

        if (!existingDoctor) 
        {
            return res.status (404).json
            ({
                message: 'Doctor not found'
            })
        }

        if (existingDoctor.photo) 
        {
            await deletePhoto (existingDoctor.photo)
        }

        await doctor.deleteDoctor (email)
        
        res.setHeader('x-message', 'Doctor deleted');

        return res.status(200).json
        ({
            message: 'Doctor deleted successfully'
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

const updateDoctor = async (req, res) =>
{
    const email = req.params.email
    const data = req.body
    const photo = req.file;

    try 
    {
        const existingDoctor = await doctor.findByEmail (email)

        if (!existingDoctor)
        {
            return res.status (404).json
            ({ 
                message: 'Doctor not found' 
            })
        }

        if (photo) 
        {
            if (existingDoctor.photo) 
            {
                await deletePhoto (existingDoctor.photo, 'CLINIC/DOCTORS')
            }

            const photoDoctor = await uploadPhoto (photo, 'CLINIC/DOCTORS')
            data.photo = photoDoctor
        }

        const doctorUpdated = await doctor.updateDoctor (email, data)

        console.log ('Updating successfully doctor')

        res.json
        ({ 
            doctor: doctorUpdated, 
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

module.exports = { uploadPhoto, loginDoctor, registerDoctor, getAllDoctors, deleteDoctor, updateDoctor }