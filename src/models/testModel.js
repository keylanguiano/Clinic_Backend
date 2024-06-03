const { admin, bucket } = require ('../config/firebase')
const firestore = admin.firestore ()
const ITest= require (('../interfaces/iTest'))

class Test extends ITest
{
    constructor (id, email_doctor, email_patient, date, time, email_admin, status, time_taken, result)
    {
        super ()
        this.id = id
        this.email_doctor = email_doctor
        this.email_patient = email_patient
        this.date = date
        this.time = time
        this.email_admin = email_admin
        this.status = status
        this.time_taken = time_taken
        this.result = result
    }

    static async createTest (id, email_doctor, email_patient, date, time, email_admin, status, time_taken, result)
    {
        try 
        {
            console.log ('Data model', id, email_doctor, email_patient, date, time, email_admin, status, time_taken, result)
            
            const test = firestore.collection ('tests').doc (id)

            await test.set
            ({
                id,
                email_doctor,
                email_patient,
                date,
                time,
                email_admin,
                status,
                time_taken,
                result
            })

            return new Test (id, email_doctor, email_patient, date, time, email_admin, status, time_taken, result)
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)

            throw new Error ('Error creating test')
        }
    }

    static async findById (id)
    {
        try 
        {
            const test = firestore.collection ('tests').doc (id)
            const testDoc = await test.get ()

            if (testDoc.exists)
            {
                const testData = testDoc.data ()

                return new Test (testData.id, testData.email_doctor, testData.email_patient, testData.date, testData.time, testData.email_admin, testData.status, testData.time_taken, testData.result)
            }

            return null
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw new Error ('Error finding test by id')
        }
    }

    static async getAllTests ()
    {
        try 
        {
            const tests = await firestore.collection ('tests').get ()
            const foundTests = []

            tests.forEach (doc => 
            {
                foundTests.push
                ({
                    id: doc.id,
                    ...doc.data ()
                })
            })

            return foundTests
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error Modelo', err)
            throw err
        }
    }

    static async deleteTest (id)
    {
        try 
        {
            await firestore.collection ('tests'). doc (id).delete ()
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw err
        }
    }

    static async updateTest (id, data)
    {
        try 
        {
            await firestore.collection ('tests'). doc (id).update (data)

            const testUpdated = await firestore.collection ('tests'). doc (id).get ()

            return
            {
                testUpdated: testUpdated.data ()
            }
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error updating test', err)
            throw err
        }
    }
}

module.exports = Test