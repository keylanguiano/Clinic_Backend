const { admin, bucket } = require ('../config/firebase')
const IScheduleDetails = require('../interfaces/iScheduleDetails')
const firestore = admin.firestore ()

class ScheduleDetails extends IScheduleDetails
{
    constructor (id, email_doctor, email_patient, sugar, oxygen_saturation, blood_pressure, diagnostic, diagnostic_details, degree, comments, treatment, prescription, payment, payment_completed)
    {
        super ()
        this.id = id
        this.email_doctor = email_doctor
        this.email_patient = email_patient
        this.sugar = sugar
        this.oxygen_saturation = oxygen_saturation
        this.blood_pressure = blood_pressure
        this.diagnostic = diagnostic
        this.diagnostic_details = diagnostic_details
        this.degree = degree
        this.comments = comments
        this.treatment = treatment
        this.prescription = prescription
        this.payment = payment
        this.payment_completed = payment_completed
    }

    static async createScheduleDetails (id, email_doctor, email_patient, sugar, oxygen_saturation, blood_pressure, diagnostic, diagnostic_details, degree, comments, treatment, prescription, payment, payment_completed)
    {
        try 
        {
            console.log ('Data model', id, email_doctor, email_patient, sugar, oxygen_saturation, blood_pressure, diagnostic, diagnostic_details, degree, comments, treatment, prescription, payment, payment_completed)
            
            const scheduleDetails = firestore.collection ('schedule_details').doc (id)

            await scheduleDetails.set
            ({
                id,
                email_doctor,
                email_patient,
                sugar,
                oxygen_saturation,
                blood_pressure,
                diagnostic,
                diagnostic_details,
                degree,
                comments,
                treatment,
                prescription,
                payment,
                payment_completed
            })

            return new ScheduleDetails (id, email_doctor, email_patient, sugar, oxygen_saturation, blood_pressure, diagnostic, diagnostic_details, degree, comments, treatment, prescription, payment, payment_completed)
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)

            throw new Error ('Error creating schedule details')
        }
    }

    static async findByDoctor (email_doctor)
    {
        try 
        {
            const schedulesDetails = firestore.collection('schedule_details').doc (email_doctor)
            const scheduleDetailsDoc = await schedulesDetails.get()

            if (scheduleDetailsDoc.exists)
            {
                const scheduleDetailsData = scheduleDetailsDoc.data()

                return new ScheduleDetails (scheduleDetailsData.id, scheduleDetailsData.email_doctor, scheduleDetailsData.email_patient, scheduleDetailsData.sugar, scheduleDetailsData.oxygen_saturation, scheduleDetailsData.blood_pressure, scheduleDetailsData.diagnostic, scheduleDetailsData.diagnostic_details, scheduleDetailsData.degree, scheduleDetailsData.prescription)
            }
        
            return null
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw new Error ('Error finding schedule details')
        }
    }

    static async findByDoctorAndPatient (email_doctor, email_patient)
    {
        try 
        {
            const schedulesDetails = firestore.collection('schedule_details')
            const scheduleDetailsDoc = await schedulesDetails
                .where('email_doctor', '==', email_doctor)
                .where('email_patient', '==', email_patient)
                .get()
                
            const schedulesDetailsPatient = []

            if (!scheduleDetailsDoc.empty)
            {
                scheduleDetailsDoc.forEach(doc => {
                    const scheduleDetailsData = doc.data()

                    schedulesDetailsPatient.push (new scheduleDetailsData.id, scheduleDetailsData.email_doctor, scheduleDetailsData.email_patient, scheduleDetailsData.sugar, scheduleDetailsData.oxygen_saturation, scheduleDetailsData.blood_pressure, scheduleDetailsData.diagnostic, scheduleDetailsData.diagnostic_details, scheduleDetailsData.degree, scheduleDetailsData.prescription)
                })

                console.log ('@ Keyla => schedules patient', schedulesDetailsPatient)
            }
        
            return schedulesDetailsPatient
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw new Error ('Error finding schedule details')
        }
    }

    static async getAllSchedulesDetails ()
    {
        try 
        {
            const schedulesDetails = await firestore.collection ('schedule_details').get ()
            const foundSchedulesDetails = []

            schedulesDetails.forEach (doc => 
            {
                foundSchedulesDetails.push
                ({
                    id: doc.id,
                    ...doc.data ()
                })
            })

            return foundSchedulesDetails
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error Modelo', err)
            throw err
        }
    }

    static async deleteScheduleDetails (id)
    {
        try 
        {
            await firestore.collection ('schedule_details'). doc (id).delete ()
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw err
        }
    }

    static async updateScheduleDetails (id, data)
    {
        try 
        {
            await firestore.collection ('schedule_details'). doc (id).update (data)

            const scheduleDetailsUpdated = await firestore.collection ('schedule_details'). doc (id).get ()

            return scheduleDetailsUpdated.data ()
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw err
        }
    }
}

module.exports = ScheduleDetails