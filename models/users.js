module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("users", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    profilePic: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    }
  });

  //there are no assosiations yet so i commented this out

  // Users.associate = function (models) {
  //   // We're saying that a Users should belong to an Author
  //   // A Users can't be created without an Author due to the foreign key constraint
  //   Users.belongsTo(models.<YOUR MODEL NAME>, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Users;
};