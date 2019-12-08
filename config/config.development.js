module.exports = {
    sequelize: {
        database: 'kwquant',
        username: 'kwquant',
        password: 'kwquant',

        dialect: 'sqlite',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        storage: `${__dirname}/../database.sqlite.nosync`,
        operatorsAliases: false,
    }    
}