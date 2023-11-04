import Sequelize, { Model } from "sequelize";
import bcryptjs from 'bcryptjs';

export default class SchoolModel extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: "You need to type the school name",
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        unique: {
          msg: "Email already exist",
        },
        validate: {
          notEmpty: {
            msg: "You need to type the email",
          },
          isEmail: {
            msg: "Type a valid email",
          },
        },
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        unique: {
          msg: "Cnpj already exist",
        },
        validate: {
          notEmpty: {
            msg: "Enter a valid cnpj",
          },
        },
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ' ',
        unique: true,
        validate: {
          notEmpty: {
            msg: "Cannot be empty",
          },
        },
      },
      accepting_accounts: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      agree_with_terms_and_privacy_policy: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
          isBoolean: {
            msg: "The 'agree_with_terms_and_privacy_policy' field must be a boolean value.",
          },
        },
      },

      is_public: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
          isBoolean: {
            msg: "The 'is_public' field must be a boolean value.",
          },
        },
      },

      school_modality: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "You need to input the school modality.",
          },
          len: {
            args: [1, 255],
            msg: "The school modality must have between 1 and 255 characters.",
          },
        },
      },

      forms_of_education: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "You need to input the types of education.",
          },
          len: {
            args: [1, 255],
            msg: "The types of education must have between 1 and 255 characters.",
          },
        },
      },

      cep: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "You need to input the ZIP code (CEP).",
          },
          len: {
            args: [9, 9],
            msg: "The ZIP code (CEP) must contain 9 digits.",
          },
        },
      },

      state: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "You need to input the state.",
          },
          len: {
            args: [1, 255],
            msg: "The state must have between 1 and 255 characters.",
          },
        },
      },

      city: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "You need to input the city.",
          },
          len: {
            args: [1, 255],
            msg: "The city must have between 1 and 255 characters.",
          },
        },
      },

      address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "You need to input the address.",
          },
          len: {
            args: [1, 255],
            msg: "The address must have between 1 and 255 characters.",
          },
        },
      },

      neighborhood: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "You need to input the neighborhood.",
          },
          len: {
            args: [1, 255],
            msg: "The neighborhood must have between 1 and 255 characters.",
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 26],
            msg: "Sua senha deve conter de 6 à 26 caracteres",
          },
        },
      },

    }, { sequelize, tableName: 'Schools' });
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }

  passwordValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'school_id' });
    this.hasMany(models.Frequencia, { foreignKey: 'school_id' });
    this.hasMany(models.Cardapios, { foreignKey: 'school_id' });
    this.hasMany(models.RequestsModel, { foreignKey: 'school_id' });
  }
}
