export const createUsuariosTable = async (conn) => {
  await conn.query(`
    CREATE TABLE IF NOT EXISTS tblUsuarios (
      id        INT AUTO_INCREMENT PRIMARY KEY,
      foto      VARCHAR(200),
      usuario   VARCHAR(30) NOT NULL ,
      email     VARCHAR(100) NOT NULL UNIQUE,
      password  VARCHAR(255) NOT NULL,
      activo    BOOLEAN DEFAULT TRUE,

      rol_id    INT NOT NULL,

      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at datetime default null,

      FOREIGN KEY (rol_id) REFERENCES tblRoles(id)
    )
  `);
};

export const createPerfilUsuarioTable = async (conn) => {
  await conn.query(`create table if not exists tblPerfil_usuarios (
      id int auto_increment primary key,
      usuario_id INT NOT NULL,
      nombre    VARCHAR(30) NOT NULL,
      apellido  VARCHAR(50) NOT NULL,
      edad      INT NOT NULL,
      telefono  VARCHAR(15) NOT NULL,

      created_at timestamp default current_timestamp,
      updated_at timestamp default current_timestamp on update current_timestamp,

      FOREIGN KEY (usuario_id) REFERENCES tblUsuarios(id) ON DELETE CASCADE
    )`);
};

export const createDispositivosTable = async (conn) => {
  await conn.query(`create table if not exists tblDispositivos (
      id int auto_increment primary key,
      usuario_id INT NOT NULL,
      dispositivo    VARCHAR(30) NOT NULL,
      tipo_dispositivo VARCHAR(30) NOT NULL,
      navegador TEXT NOT NULL,
      ip_address VARCHAR(45),
      created_at timestamp default current_timestamp,

      FOREIGN KEY (usuario_id) REFERENCES tblUsuarios(id) ON DELETE CASCADE,

      INDEX idx_usuario_id (usuario_id),
      INDEX idx_tipo_dispositivo (tipo_dispositivo)
    )`);
};