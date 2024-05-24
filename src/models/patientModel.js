const { admin, bucket } = require ('../config/firebase')
const firestore = admin.firestore ()
const IPatient = require (('../interfaces/IPatient'))

class Patient extends IPatient
{
    constructor (photo, name, age, sex, phone, email, address)
    {
        super ()
        this.photo = photo
        this.name = name
        this.age = age
        this.sex = sex
        this.phone = phone
        this.email = email
        this.address = address
    }

    static async createPatient (photoPatient, name, age, sex, phone, email, address)
    {
        try 
        {
            console.log ('Data model', photoPatient, name, age, sex, phone, email, address)

            const patient = firestore.collection ('patients').doc (email)

            await patient.set
            ({
                photo: photoPatient,
                name, 
                age, 
                sex, 
                phone,
                email, 
                address
            })

            return new Patient (photoPatient, name, age, sex, phone, email, address)
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)

            throw new Error ('Error creating patient')
        }
    }

    static async findByEmail (email)
    {
        try 
        {
            const patient = firestore.collection ('patients').doc (email)
            const patientDoc = await patient.get ()

            if (patientDoc.exists)
            {
                const patientData = patientDoc.data ()

                return new Patient (patientData.photo, patientData.name, patientData.age, patientData.sex, patientData.phone, patientData.email, patientData.address)
            }

            return null
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw new Error ('Error finding patient')
        }
    }

    static async getAllPatients ()
    {
        try 
        {
            const patients = await firestore.collection ('patients').get ()
            const foundPatients = []

            patients.forEach (doc => 
            {
                foundPatients.push
                ({
                    email: doc.email,
                    ...doc.data ()
                })
            })

            return foundPatients
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error Modelo Patient', err)
            throw err
        }
    }

    static async deletePatient (email)
    {
        try 
        {
            await firestore.collection ('patients'). doc (email).delete ()
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error deleting patient', err)
            throw err
        }
    }

    static async updatePatient (email, data)
    {
        try 
        {
            await firestore.collection ('patients'). doc (email).update (data)

            const patientUpdated = await firestore.collection ('patients'). doc (email).get ()

            return
            {
                patientUpdated: patientUpdated.data ()
            }
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error updating patient', err)
            throw err
        }
    }
}

module.exports = Patient