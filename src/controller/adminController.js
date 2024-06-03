const jwt = require ('jsonwebtoken')
const adm = require ('../models/adminModel')
const { admin, bucket } = require('../config/firebase')

const registerAdmin = async (req, res) =>
{
    try 
    {
        const { name,  email } = req.body

        console.log ('Data controller', name,  email)

        const existingAdmin = await adm.findByEmail (email)

        if (existingAdmin)
        {
            console.log('Admin already exists')

            return res.status (400).json
            ({
                message: 'Admin already exists'
            })
        }

        const newAdmin = await adm.createAdmin (name, email)

        console.log ('@ Keyla => newAdmin controller', newAdmin)

        console.log('Admin registered successfully')

        res.status (201).json
        ({
            message: 'Admin registered successfully',
            adm: newAdmin
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

const getAllAdmins = async (req, res) =>
{
    try 
    {
        const admins = await adm.getAllAdmins ()

        return res.json
        ({
            admins,
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

const deleteAdmin = async (req, res) =>
{
    const email = req.params.email

    try 
    {
        await adm.deleteAdmin (email)
        
        res.setHeader('x-message', 'Admin deleted');

        return res.status(200).json
        ({
            message: 'Admin deleted successfully'
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

const updateAdmin = async (req, res) =>
{
    const email = req.params.email
    const data = req.body

    try 
    {
        const existingAdmin = await adm.findByEmail (email)

        if (!existingAdmin)
        {
            return res.status (404).json
            ({ 
                message: 'Admin not found' 
            })
        }

        const adminUpdated = await adm.updateAdmin (email, data)
        
        console.log ('Updating successfully admin')

        res.json
        ({
            adminUpdated,
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

module.exports = { registerAdmin, getAllAdmins, deleteAdmin, updateAdmin }