class IMedicine
{
    /*  Crea la nueva medicina
        @param {string} photo: Url de la imagen de la medicina
        @param {string} name: Nombre de la medicina
        @param {string} description: Descripción de la medicina
        @param {string} price: Precio de la medicina

        @returns {Promise <Medicine>}

        @throws {error}: Si hay error en la creación
    */
    static async createPatient (photo, name, description, price) {}

    /*  Busca si la medicina existe mediante el name
        @param {string} name: Nombre de la medicina

        @returns {Promise <Medicine>}

        @throws {error}: Si hay error al encontrar el usuario
    */
    static async findByName (name) {}

    static async getAllMedicines () {}

    static async deleteMedicine (name) {}

    static async updateMedicine (photo, name, description, price) {}
}

module.exports = IMedicine