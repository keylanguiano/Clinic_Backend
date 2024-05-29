const { admin, bucket } = require ('../config/firebase')
const firestore = admin.firestore ()
const ISchedule = require (('../interfaces/iSchedule'))

class Schedule extends ISchedule
{
    constructor (id, email_doctor, name_patient, email_patient, phone_patient, address_patient, date, time, room)
    {
        super ()
        this.id = id
        this.email_doctor = email_doctor
        this.name_patient = name_patient
        this.email_patient = email_patient
        this.phone_patient = phone_patient
        this.address_patient = address_patient
        this.date = date
        this.time = time
        this.room = room
    }

    static async createSchedule (id, email_doctor, name_patient, email_patient, phone_patient, address_patient, date, time, room)
    {
        try 
        {
            console.log ('Data model', id, email_doctor, name_patient, email_patient, phone_patient, address_patient, date, time, room)
            
            const schedule = firestore.collection ('schedules').doc (id)

            await schedule.set
            ({
                id,
                email_doctor,
                name_patient,
                email_patient,
                phone_patient,
                address_patient,
                date,
                time,
                room
            })

            return new Schedule (id, email_doctor, name_patient, email_patient, phone_patient, address_patient, date, time, room)
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)

            throw new Error ('Error creating schedule')
        }
    }

    static async findById (id)
    {
        try 
        {
            const schedule = firestore.collection ('schedules').doc (id)
            const scheduleDoc = await schedule.get ()

            if (scheduleDoc.exists)
            {
                const scheduleData = scheduleDoc.data ()

                return new Schedule (scheduleData.id, scheduleData.email_doctor, scheduleData.name_patient, scheduleData.email_patient, scheduleData.phone_patient, scheduleData.address_patient, scheduleData.date, scheduleData.time, scheduleData.room)
            }

            return null
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw new Error ('Error finding schedule by id')
        }
    }

    static async findByDoctorAndDate (email_doctor, date)
    {
        try 
        {
            const schedules = firestore.collection('schedules')
            const scheduleDoc = await schedules
                .where('email_doctor', '==', email_doctor)
                .where('date', '==', date)
                .get()
                
            const schedulesDay = []

            if (!scheduleDoc.empty)
            {
                scheduleDoc.forEach(doc => {
                    const scheduleData = doc.data()

                    schedulesDay.push (new Schedule (scheduleData.id, scheduleData.email_doctor, scheduleData.name_patient, scheduleData.email_patient, scheduleData.phone_patient, scheduleData.address_patient, scheduleData.date, scheduleData.time, scheduleData.room));
                })

                console.log ('@ Keyla => schedules of the day', schedulesDay)
            }
        
            return schedulesDay
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw new Error ('Error finding doctor')
        }
    }

    static async findByDoctorAndDateTime (email_doctor, date, time)
    {
        try 
        {
            const schedules = firestore.collection('schedules')
            const scheduleDoc = await schedules
                .where('email_doctor', '==', email_doctor)
                .where('date', '==', date)
                .where('time', '==', time)
                .get()
            
            if (!scheduleDoc.empty)
            {
                const schedule = []
                
                scheduleDoc.forEach(doc => {
                    const scheduleData = doc.data()

                    schedule.push (new Schedule (scheduleData.id, scheduleData.email_doctor, scheduleData.name_patient, scheduleData.email_patient, scheduleData.phone_patient, scheduleData.address_patient, scheduleData.date, scheduleData.room));
                })
                
                return schedule
            }

            return null
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw new Error ('Error finding doctor')
        }
    }

    static async findByPatientAndDateTime (email_patient, date, time)
    {
        try 
        {
            const schedules = firestore.collection('schedules')
            const scheduleDoc = await schedules
                .where('email_patient', '==', email_patient)
                .where('date', '==', date)
                .where('time', '==', time)
                .get()
            
            if (!scheduleDoc.empty)
            {
                const schedule = []
                
                scheduleDoc.forEach(doc => {
                    const scheduleData = doc.data()

                    schedule.push (new Schedule (scheduleData.id, scheduleData.email_doctor, scheduleData.name_patient, scheduleData.email_patient, scheduleData.phone_patient, scheduleData.address_patient, scheduleData.date, scheduleData.room));
                })
                
                return schedule
            }

            return null
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw new Error ('Error finding doctor')
        }
    }

    static async getAllSchedules ()
    {
        try 
        {
            const schedules = await firestore.collection ('schedules').get ()
            const foundSchedules = []

            schedules.forEach (doc => 
            {
                foundSchedules.push
                ({
                    id: doc.id,
                    ...doc.data ()
                })
            })

            return foundSchedules
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error Modelo', err)
            throw err
        }
    }

    static async deleteSchedule (id)
    {
        try 
        {
            await firestore.collection ('schedules'). doc (id).delete ()
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw err
        }
    }

    static async updateSchedule (id, data)
    {
        try 
        {
            await firestore.collection ('schedules'). doc (id).update (data)

            const scheduleUpdated = await firestore.collection ('schedules'). doc (id).get ()

            return scheduleUpdated.data ()
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw err
        }
    }
}

module.exports = Schedule