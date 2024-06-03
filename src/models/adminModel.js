const { admin, bucket } = require ('../config/firebase')
const firestore = admin.firestore ()
const IAdmin= require (('../interfaces/iAdmin'))

class Admin extends IAdmin
{
    constructor (name,  email)
    {
        super ()
        this.name = name
        this.email = email
    }

    static async createAdmin (name,  email)
    {
        try 
        {
            console.log ('Data model', name,  email)

            const adm = firestore.collection ('admins').doc (email)

            await adm.set
            ({
                name,
                email
            })

            return new Admin (name,  email)
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)

            throw new Error ('Error creating admin')
        }
    }

    static async findByEmail (email)
    {
        try 
        {
            console.log('email find by email model ', email)
            
            const adm = firestore.collection ('admins').doc (email)
            const adminDoc = await adm.get ()

            if (adminDoc.exists)
            {
                const adminData = adminDoc.data ()

                return new Admin (adminData.name, adminData.email)
            }

            return null
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw new Error ('Error finding admin')
        }
    }

    static async getAllAdmins ()
    {
        try 
        {
            const admins = await firestore.collection ('admins').get ()
            const foundAdmins= []

            admins.forEach (doc => 
            {
                foundAdmins.push
                ({
                    email: doc.email,
                    ...doc.data ()
                })
            })

            return foundAdmins
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error Modelo', err)
            throw err
        }
    }

    static async deleteAdmin (email)
    {
        try 
        {
            await firestore.collection ('admins'). doc (email).delete ()
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw err
        }
    }

    static async updateAdmin (email, data)
    {
        try 
        {
            await firestore.collection ('admins'). doc (email).update (data)

            const adminUpdated = await firestore.collection ('admins'). doc (email).get ()

            return adminUpdated.data ()
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw err
        }
    }
}

module.exports = Admin