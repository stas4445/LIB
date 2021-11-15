const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   email: {type: DataTypes.STRING, unique: true,},
   password: {type: DataTypes.STRING},
   role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Bookshelf = sequelize.define('bookshelf', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BookOnTheShelf = sequelize.define('book_on_the_shelf', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Book = sequelize.define('book', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   title: {type: DataTypes.STRING, allowNull: false},
   author: {type: DataTypes.STRING, unique: true, allowNull: false},
   publisher: {type: DataTypes.STRING, unique: false, allowNull: false},
   ISBN: {type: DataTypes.INTEGER, unique: true, allowNull: false},
   year_of_publication: {type: DataTypes.INTEGER, allowNull: false},   
})

const Role = sequelize.define('role', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   role_name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const UserRole = sequelize.define('user_role', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Bookshelf)
Bookshelf.belongsTo(User)

Bookshelf.hasMany(BookOnTheShelf)
BookOnTheShelf.belongsTo(Bookshelf)

BookOnTheShelf.hasOne(Book)
Book.belongsTo(BookOnTheShelf)

User.belongsToMany(Role , {through: UserRole})
Role.belongsToMany(User, {through: UserRole})


module.exports = {
   User,
   Bookshelf,
   BookOnTheShelf,
   Book,
   Role,
   UserRole
}
