const jwt = require ('jsonwebtoken')
const user = require ('../models/userModel')

const loginUser = async (req, res) =>
{
    try
    {
        const { email, password } = req.body

        const userDoc = await user.findByEmail (email)

        if (!userDoc)
        {
            console.log('User not found')

            return res.status (404).json
            ({
                message: 'User not found'
            })
        }

        const isValidPassword = await userDoc.verifyPassword (password)

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
            email: userDoc.email 
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

const registerUser = async (req, res) =>
{
    try 
    {
        const { name, paternal_surname, maternal_surname, address, phone, email, password } = req.body

        const existingUser = await user.findByEmail (email)

        if (existingUser)
        {
            console.log('User already exists')

            return res.status (400).json
            ({
                message: 'User already exists'
            })
        }

        const newuser = await user.createUser (name, paternal_surname, maternal_surname, address, phone, email, password)

        console.log('User registered successfully')

        res.status (201).json
        ({
            message: 'User registered successfully',
            user: newuser
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

const getAllUsers = async (req, res) =>
{
    try 
    {
        const users = await user.getAllUsers ()

        return res.json
        ({
            users,
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

const deleteUser = async (req, res) =>
{
    const email = req.params.email

    try 
    {
        await user.deleteUser (email)
        
        res.setHeader('x-message', 'User deleted');

        res.status(204).send();
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

const updateUser = async (req, res) =>
{
    const email = req.params.email
    const data = req.body

    try 
    {
        const userUpdated = await user.updateUser (email, data)
        
        res.json
        ({
            userUpdated,
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

module.exports = { registerUser, loginUser, getAllUsers, deleteUser, updateUser }