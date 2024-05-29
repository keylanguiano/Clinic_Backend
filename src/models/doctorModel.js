const { admin, bucket } = require ('../config/firebase')
const firestore = admin.firestore ()
const IDoctor = require (('../interfaces/iDoctor'))
const bcrypt = require ('bcrypt')

class Doctor extends IDoctor
{
    constructor (photo, name, specialist, degree, email, password)
    {
        super ()
        this.photo = photo
        this.name = name
        this.specialist = specialist
        this.degree = degree
        this.email = email
        this.password = password
    }

    static async createDoctor (photoDoctor, name, specialist, degree, email, password)
    {
        try 
        {
            console.log ('Data model', photoDoctor, name, specialist, degree, email, password)

            const hash = await bcrypt.hash (password, 10)
            const doctor = firestore.collection ('doctors').doc (email)

            await doctor.set
            ({
                photo: photoDoctor,
                name,
                specialist,
                degree,
                email,
                password: hash
            })

            return new Doctor (photoDoctor, name, specialist, degree, email, password)
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)

            throw new Error ('Error creating doctor')
        }
    }

    async verifyPassword (password)
    {
        return await bcrypt.compare (password, this.password)
    }

    static async findByEmail (email)
    {
        try 
        {
            const doctor = firestore.collection ('doctors').doc (email)
            const doctorDoc = await doctor.get ()

            if (doctorDoc.exists)
            {
                const doctorData = doctorDoc.data ()

                return new Doctor (doctorData.photo, doctorData.name, doctorData.specialist, doctorData.degree, doctorData.email, doctorData.password)
            }

            return null
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw new Error ('Error finding doctor')
        }
    }

    static async getAllDoctors ()
    {
        try 
        {
            const doctors = await firestore.collection ('doctors').get ()
            const foundDoctors = []

            doctors.forEach (doc => 
            {
                foundDoctors.push
                ({
                    email: doc.email,
                    ...doc.data ()
                })
            })

            return foundDoctors 
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error Modelo', err)
            throw err
        }
    }

    static async deleteDoctor (email)
    {
        try 
        {
            await firestore.collection ('doctors'). doc (email).delete ()
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw err
        }
    }

    static async updateDoctor (email, data)
    {
        try 
        {
            await firestore.collection ('doctors'). doc (email).update (data)

            const doctorUpdated = await firestore.collection ('doctors'). doc (email).get ()

            return doctorUpdated.data ()
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw err
        }
    }
}

module.exports = Doctor