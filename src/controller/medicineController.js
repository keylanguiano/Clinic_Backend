const jwt = require ('jsonwebtoken')
const medicine = require ('../models/medicineModel')


const registerMedicine = async (req, res) =>
{
    try 
    {
        const { photo, name, description, price } = req.body

        const existingMedicine = await medicine.findByName (name)

        if (existingMedicine)
        {
            console.log('Medicine already exists')

            return res.status (400).json
            ({
                message: 'Medicine already exists'
            })
        }

        const newMedicine = await medicine.createMedicine (photo, name, description, price)

        console.log('Medicine registered successfully')

        res.status (201).json
        ({
            message: 'Medicine registered successfully',
            medicine: newMedicine
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

const getAllMedicines = async (req, res) =>
{
    try 
    {
        const medicines = await medicine.getAllMedicines ()

        return res.json
        ({
            medicines,
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

const deleteMedicine = async (req, res) =>
{
    const name = req.params.name

    try 
    {
        await medicine.deleteMedicine (name)
        
        res.setHeader('x-message', 'Medicine deleted');

        return res.status(200).json
        ({
            message: 'Medicine deleted successfully'
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

const updateMedicine = async (req, res) =>
{
    const name = req.params.name
    const data = req.body

    try 
    {
        const medicineUpdated = await medicine.updateMedicine (name, data)
        
        res.json
        ({
            medicineUpdated,
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

module.exports = { registerMedicine, getAllMedicines, deleteMedicine, updateMedicine }