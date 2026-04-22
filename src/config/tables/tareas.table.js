export const createTareasTable = async (conn) => {
    await conn.query(`create table if not exists tblTareas (
    id int auto_increment primary key,
    titulo varchar(50) not null,
    descripcion varchar(500),
    prioridad enum('baja', 'media', 'alta') default 'media',

    creado_por int not null,
    asignado_a int,

    hora_inicio datetime not null,
    hora_fin datetime not null,
    estado enum('pendiente','en_proceso','completada', 'no_completada','eliminada') default 'pendiente',
    razon_no_completada varchar(500),

    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    deleted_at datetime default null,

    foreign key (creado_por) references tblUsuarios(id),
    foreign key (asignado_a) references tblUsuarios(id)
    )`)
};


export const createTareaComentariosTable = async (conn) => {
    await conn.query(`create table if not exists tblTarea_comentarios(
        id int auto_increment primary key,
        tarea_id int not null,
        usuario_id int not null,
        comentario VARCHAR(500) NOT NULL,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp,
        deleted_at datetime default null,

        foreign key (tarea_id) references tblTareas(id),
        foreign key (usuario_id) references tblUsuarios(id)
        )`);
};