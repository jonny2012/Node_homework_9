'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,

      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    mustChangePassword:{
      type:Sequelize.BOOLEAN,
      defaultValue:false
  },
  role:{ 
    type:Sequelize.STRING,
    defaultValue: "USER"
}
  
    })
  },
  async down(queryInterface, Sequelize) {
 
await queryInterface.dropTable('users');
    
  }
};
