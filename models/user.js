const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice', { logging: false });

const User = db.define('user', {
    first: {
        type: Sequelize.STRING,
    },
    last: {
        type: Sequelize.STRING,
    },
    age: {
        type: Sequelize.INTEGER,
        validate: {
            // is18: age => {
            //     if (age < 18) throw new Error('Validation min on age failed')
            min: 18
            }
        },
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false
    },
    bio: {
        type: Sequelize.TEXT,
    }


}, {
    getterMethods: {
        fullName: function() {
            return this.first + ' ' + this.last
        }
    }
});


//instance method
User.prototype.haveBirthday = function() {
    return this.increment('age')
}

module.exports = User;