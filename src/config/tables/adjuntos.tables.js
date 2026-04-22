export const createAdjuntosTable = async (conn) => {
    await conn.query(`create table if not exists tblAdjuntos(
        id int auto_increment primary key,
        tarea_id int,
        comentario_id int,
        subido_por int not null,

        categoria ENUM('evidencia', 'documentacion', 'correccion', 'otro') DEFAULT NULL,

        url varchar(300) not null,
        nombre varchar(255) not null,
        tipo varchar(50) not null,
        tamanio int not null,

        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp,
        deleted_at datetime DEFAULT NULL,

        foreign key (subido_por) references tblUsuarios(id),
        foreign key (tarea_id) references tblTareas(id),
        foreign key (comentario_id) references tblTarea_comentarios(id)
        )`);
}