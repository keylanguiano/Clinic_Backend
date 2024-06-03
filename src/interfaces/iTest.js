class ITest
{
    /*  Crea la nueva prueba
        @param {int} id: Id de la prueba
        @param {string} email_doctor: Email del doctor
        @param {string} email_patient: Email del paciente
        @param {string} date: Fecha y hora de la prueba
        @param {string} room: Habitación de la prueba
        @param {string} email_admin: Email del administrador
        @param {string} status: Estatus de la prueba
        @param {string} time_taken: Tiempo que tomará la prueba
        @param {string} result: Resultado de la prueb

        @returns {Promise <Test>}

        @throws {error}: Si hay error en la creación
    */
    static async createTest (id, email_doctor, email_patient, date, time, email_admin, status, time_taken, result) {}

    /*  Busca las pruebas por su id
    @param {string} id: Id de la prueba

    @returns {Promise <Test>}

    @throws {error}: Si hay error al encontrar la prueba
    */
    static async findById (id) {}

    static async getAllTests () {}

    static async deleteTest (id) {}

    static async updateTest (id, data) {}
}

module.exports = ITest