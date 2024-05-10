class IUser 
{
    /*  Crea el nuevo usuario 
        @param {string} email: Correo del usuario
        @param {string} password: Password del usuario

        @returns {Promise <User>}

        @throws {error}: Si hay error en la creación
    */
    static async createUser (name, paternal_surname, maternal_surname, address, phone, email, password) {}

    /*  Verifica que la contraseña coincida
        @param {string} password: Password del usuario

        @returns {boolean}
    */
    async verifyPassword (password) {}

    /*  Busca si el usuario existe mediante el email
        @param {string} email: Correo del usuario

        @returns {Promise <User>}

        @throws {error}: Si hay error al encontrar el usuario
    */
    static async findByEmail (email) {}

    static async getAllUsers () {}

    static async deleteUser (email) {}

    static async updateUser (email, data) {}
}

module.exports = IUser