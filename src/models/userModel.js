const { use } = require('bcrypt/promises')
const admin = require ('../config/firebase')
const firestore = admin.firestore ()
const IUser = require (('../interfaces/iUser'))
const bcrypt = require ('bcrypt')

class User extends IUser
{
    constructor (name, paternal_surname, maternal_surname, address, phone, email, password)
    {
        super ()
        this.name = name
        this.paternal_surname = paternal_surname
        this.maternal_surname = maternal_surname
        this.address = address
        this.phone = phone
        this.email = email
        this.password = password
    }

    static async createUser (name, paternal_surname, maternal_surname, address, phone, email, password)
    {
        try 
        {
            const hash = await bcrypt.hash (password, 10)
            const user = firestore.collection ('users').doc (email)

            await user.set
            ({
                name, 
                paternal_surname, 
                maternal_surname, 
                address, 
                phone,
                email, 
                password: hash
            })

            return new User (name, paternal_surname, maternal_surname, address, phone, email, password)
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)

            throw new Error ('Error creating user')
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
            const user = firestore.collection ('users').doc (email)
            const userDoc = await user.get ()

            if (userDoc.exists)
            {
                const userData = userDoc.data ()

                return new User (userData.name, userData.paternal_surname, userData.maternal_surname, userData.address, userData.phone, userData.email, userData.password)
            }

            return null
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw new Error ('Error finding user')
        }
    }

    static async getAllUsers ()
    {
        try 
        {
            const users = await firestore.collection ('users').get ()
            const foundUsers = []

            users.forEach (doc => 
            {
                foundUsers.push
                ({
                    email: doc.email,
                    ...doc.data ()
                })
            })

            return foundUsers 
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error Modelo', err)
            throw err
        }
    }

    static async deleteUser (email)
    {
        try 
        {
            await firestore.collection ('users'). doc (email).delete ()
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw err
        }
    }

    static async updateUser (email, data)
    {
        try 
        {
            await firestore.collection ('users'). doc (email).update (data)

            const userUpdated = await firestore.collection ('users'). doc (email).get ()

            return {
                userUpdated: userUpdated.data ()
            }
        } 
        catch (err) 
        {
            console.log ('@ Keyla => Error ', err)
            throw err
        }
    }
}

module.exports = User