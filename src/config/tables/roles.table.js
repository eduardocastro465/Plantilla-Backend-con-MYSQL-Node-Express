export const createRolesTable = async (conn) => {
    await conn.query(`create table if not exists tblRoles (
        id int auto_increment primary key,
        rol varchar(30) not null unique,
        descripcion varchar(250) null,
        activo boolean default true,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )`)

};