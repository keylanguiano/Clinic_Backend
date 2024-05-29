class ISchedule
{
    /*  Crea la nueva cita
        @param {int} id: Id de la cita
        @param {string} email_doctor: Email del doctor
        @param {string} name_patient: Nombre del paciente
        @param {string} email_patient: Email del paciente
        @param {string} phone_patient: Numero de teléfono del paciente
        @param {string} address_patient: Dirección del paciente
        @param {string} date: Fecha y hora de la cita
        @param {string} room: Habitación de la cita

        @returns {Promise <Schedule>}

        @throws {error}: Si hay error en la creación
    */
    static async createSchedule (id, email_doctor, name_patient, email_patient, phone_patient, address_patient, date, time, room) {}

    /*  Busca las citas por su id
    @param {string} id: Id de la cita

    @returns {Promise <Schedule>}

    @throws {error}: Si hay error al encontrar la cita
    */
    static async findById (id) {}

    /*  Busca las citas de una fecha determinada
    @param {string} email: Correo del doctor
    @param {string} date: Fecha de la cita

    @returns {Promise <Schedule>}

    @throws {error}: Si hay error al encontrar la cita
    */
    static async findByDoctorAndDate (email_doctor, date) {}

    /*  Busca si existe una cita ya registrada con el doctor, en una fecha y hora determinados
    @param {string} email: Correo del doctor
    @param {string} date: Fecha de la cita
    @param {string} time: Horario de la cita

    @returns {Promise <Schedule>}

    @throws {error}: Si hay error al encontrar la cita
    */
    static async findByDoctorAndDateTime (email_doctor, date, time) {}

    /*  Busca si existe una cita ya registrada con el paciente, en una fecha y hora determinados
    @param {string} email: Correo del paciente
    @param {string} date: Fecha de la cita
    @param {string} time: Horario de la cita

    @returns {Promise <Schedule>}

    @throws {error}: Si hay error al encontrar la cita
    */
    static async findByPatientAndDateTime (email_patient, date, time) {}

    static async getAllSchedules () {}

    static async deleteSchedule (id) {}

    static async updateSchedule (id, data) {}
}

module.exports = ISchedule