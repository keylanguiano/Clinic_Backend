class IAdmin
{
    /*  Crea el nuevo administrador 
        @param {string} name: Nombre del administrador
        @param {string} email: Email del administrador

        @returns {Promise <Admin>}

        @throws {error}: Si hay error en la creación
    */
    static async createAdmin (c) {}

    /*  Busca si el administrador existe mediante el email
    @param {string} email: Correo del administrador

    @returns {Promise <Admin>}

    @throws {error}: Si hay error al encontrar el administrador
    */
    static async findByEmail (email) {}

    static async getAllAdmins () {}

    static async deleteAdmin (id) {}

    static async updateAdmin(id, data) {}
}

module.exports = IAdmin