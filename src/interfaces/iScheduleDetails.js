class IScheduleDetails
{
    /*  Crea nuevos detalles de la cita
        @param {int} id: Id de la cita
        @param {string} email_doctor: Email del doctor
        @param {string} email_patient: Email del paciente
        @param {string} sugar: Nivel de azucar del paciente
        @param {string} oxygen_saturation: Nivel de saturacion de oxigeno del paciente
        @param {string} blood_pressure: Nivel de presion arterial del paciente
        @param {string} diagnostic: Diagnostico para el paciente
        @param {string} diagnostic_details: Detalles del diagnostico del paciente
        @param {string} degree: Grado del diagnostico del paciente
        @param {string} comments: Comentarios del diagnostico del paciente
        @param {string} treatment: Tratamiento del diagnostico del paciente
        @param {string} prescription: Prescripción para el diagnostico del paciente
        @param {string} payment: Pago del paciente
        @param {string} payment: Verificación del pago del paciente

        @returns {Promise <Schedule>}

        @throws {error}: Si hay error en la creación
    */
    static async createScheduleDetails (id, email_doctor, email_patient, sugar, oxygen_saturation, blood_pressure, diagnostic, diagnostic_details, degree, comments, treatment, medication, prescription, payment, payment_completed) {}

    /*  Busca los detalles de la cita por doctor
    @param {string} email: Correo del doctor

    @returns {Promise <Schedule>}

    @throws {error}: Si hay error al encontrar la cita
    */
    static async findByDoctor (email_doctor) {}

    /*  Busca los detalles de la cita por doctor y paciente
    @param {string} email_doctor: Correo del doctor
    @param {string} email_patient: Correo del paciente

    @returns {Promise <Schedule>}

    @throws {error}: Si hay error al encontrar la cita
    */
    static async findByDoctorAndPatient (email_doctor, email_patient) {}

    static async getAllSchedulesDetails () {}

    static async deleteScheduleDetails (id) {}

    static async updateScheduleDetails (id, data) {}
}

module.exports = IScheduleDetails