class IDoctor
{
    /*  Crea el nuevo doctor 
        @param {string} photo: Foto del doctor
        @param {string} name: Nombre del doctor
        @param {string} specialist: Especialidad del doctor
        @param {string} degree: Grado de estudios del doctor
        @param {string} email: Email del doctor
        @param {string} password: Contraseña del doctor

        @returns {Promise <Doctor>}

        @throws {error}: Si hay error en la creación
    */
    static async createDoctor (photo, name, specialist, degree,  email, password) {}

    /*  Verifica que la contraseña coincida
        @param {string} password: Password del doctor

        @returns {boolean}
    */
    async verifyPassword (password) {}
    
    /*  Busca si el doctor existe mediante el email
    @param {string} email: Correo del doctor

    @returns {Promise <Doctor>}

    @throws {error}: Si hay error al encontrar el usuario
    */
    static async findByEmail (email) {}

    static async getAllDoctors () {}

    static async deleteDoctor (email) {}

    static async updateDoctor (email, data) {}
}

module.exports = IDoctor