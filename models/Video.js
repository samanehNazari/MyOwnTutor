'use strict';

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('video', {
            id:{
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            user_id:{
                //fk from the user table
                type: Datatypes.UUID,
                required:true,
                allowNull:false
            },
            title: {
                type:Datatypes.STRING,
                required: true,
                allowNull: false,
            },
            host_id: {
                type:Datatypes.STRING,
                required: true,
                allowNull: false,
            },
            icon: {
                type: Datatypes.STRING,
                required: false,
                allowNull: true,
            },
            updated_at:{ type: Datatypes.DATE},
            deleted_at:{ type: Datatypes.DATE}
        },
        {
            underscored:true,
            paranoid:true
        });
};