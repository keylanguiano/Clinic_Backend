const { admin, bucket } = require ('../config/firebase')
const firestore = admin.firestore ()
const IMedicine= require (('../interfaces/IMedicine'))

class Medicine extends IMedicine
{
    constructor (photo, name, description, price)
    {
        super ()
        this.photo = photo
        this.name = name
        this.description = description
        this.price = price
    }

    static async createMedicine (photo, name, description, price)
    {
        try 
        {
            const medicine = firestore.collection ('medicines').doc (name)

            await medicine.set
            ({
                photo, 
                name, 
                description,
                price
            })

            return new Medicine (photo, name, description, price)
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)

            throw new Error ('Error creating medicine')
        }
    }

    static async findByName (name)
    {
        try 
        {
            const medicine = firestore.collection ('medicines').doc (name)
            const medicineDoc = await medicine.get ()

            if (medicineDoc.exists)
            {
                const medicineData = medicineDoc.data ()

                return new Medicine (medicineData.photo, medicineData.name, medicineData.description, medicineData.price)
            }

            return null
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw new Error ('Error finding medicine')
        }
    }

    static async getAllMedicines ()
    {
        try 
        {
            const medicines = await firestore.collection ('medicines').get ()
            const foundMedicines = []

            medicines.forEach (doc => 
            {
                foundMedicines.push
                ({
                    name: doc.name,
                    ...doc.data ()
                })
            })

            return foundMedicines
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error Modelo Medicine', err)
            throw err
        }
    }

    static async deleteMedicine (name)
    {
        try 
        {
            await firestore.collection ('medicines'). doc (name).delete ()
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error deleting medicine', err)
            throw err
        }
    }

    static async updateMedicine (name, data)
    {
        try 
        {
            await firestore.collection ('medicines'). doc (name).update (data)

            const medicineUpdated = await firestore.collection ('medicines'). doc (name).get ()

            return
            {
                medicineUpdated: medicineUpdated.data ()
            }
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error updating medicine', err)
            throw err
        }
    }
}

module.exports = Medicine