class IPatient
{
    /*  Crea el nuevo paciente 
        @param {string} email: Correo del paciente

        @returns {Promise <Patient>}

        @throws {error}: Si hay error en la creación
    */
    static async createPatient (photo, name, age, sex, phone, email, address) {}

    /*  Busca si el paciente existe mediante el email
        @param {string} email: Correo del paciente

        @returns {Promise <Patient>}

        @throws {error}: Si hay error al encontrar el usuario
    */
    static async findByEmail (email) {}

    static async getAllPatients () {}

    static async deletePatient (email) {}

    static async updatePatient (email, data) {}
}

module.exports = IPatient