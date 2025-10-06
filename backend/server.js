// backend/server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a SQLite (usa la ruta correcta de tu BD)
const dbPath = path.join(__dirname, 'database', 'salud_digital_aps.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error conectando a SQLite:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos SQLite');
  }
});

// ==================== ENDPOINTS DE AUTENTICACIÓN ====================

// Login de usuarios
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);
  
  const query = `
    SELECT 
      u.usuario_id, u.nombre_completo, u.email, u.numero_documento,
      r.nombre_rol, r.rol_id,
      e.nombre_equipo, e.equipo_id
    FROM Usuarios u 
    JOIN Roles r ON u.rol_id = r.rol_id 
    LEFT JOIN Equipos_Basicos e ON u.equipo_id = e.equipo_id 
    WHERE u.email = ? AND u.numero_documento = ?
  `;
  
  db.get(query, [email, password], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    if (!row) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
    
    console.log('Login successful for:', row.nombre_completo);
    res.json({ 
      success: true, 
      user: {
        id: row.usuario_id,
        name: row.nombre_completo,
        email: row.email,
        role: row.nombre_rol,
        roleId: row.rol_id,
        team: row.nombre_equipo,
        document: row.numero_documento
      }
    });
  });
});

// ==================== ENDPOINTS DE DATOS ====================

// Obtener todas las familias (con conteo de integrantes)
app.get('/api/familias', (req, res) => {
  const query = `
    SELECT 
      f.familia_id, f.apellido_principal, f.direccion, 
      f.barrio_vereda, f.municipio, f.telefono_contacto,
      u.nombre_completo as creado_por,
      (
        SELECT COUNT(1) FROM Pacientes p
        WHERE p.familia_id = f.familia_id AND p.activo = 1
      ) AS integrantes_count
    FROM Familias f 
    JOIN Usuarios u ON f.creado_por_uid = u.usuario_id
    ORDER BY f.apellido_principal
  `;
  
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Obtener pacientes por familia
app.get('/api/familias/:id/pacientes', (req, res) => {
  const { id } = req.params;
  
  const query = `
    SELECT 
      paciente_id, numero_documento, tipo_documento,
      primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
      fecha_nacimiento, genero, telefono, email
    FROM Pacientes 
    WHERE familia_id = ? AND activo = 1
  `;
  
  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Crear un nuevo paciente vinculado a una familia
app.post('/api/pacientes', (req, res) => {
  const {
    familia_id,
    numero_documento,
    tipo_documento,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento,
    genero,
    telefono,
    email
  } = req.body || {};

  if (!familia_id || !primer_nombre || !primer_apellido || !tipo_documento || !numero_documento) {
    return res.status(400).json({
      error: 'Faltan campos obligatorios: familia_id, tipo_documento, numero_documento, primer_nombre, primer_apellido'
    });
  }

  const insert = `
    INSERT INTO Pacientes (
      familia_id, numero_documento, tipo_documento,
      primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
      fecha_nacimiento, genero, telefono, email, activo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `;

  const params = [
    familia_id, numero_documento, tipo_documento,
    primer_nombre, segundo_nombre || null, primer_apellido, segundo_apellido || null,
    fecha_nacimiento || null, genero || null, telefono || null, email || null
  ];

  db.run(insert, params, function(err) {
    if (err) {
      console.error('Error insertando paciente:', err);
      return res.status(500).json({ error: 'No se pudo crear el paciente' });
    }
    const createdId = this.lastID;
    db.get(
      `SELECT paciente_id, familia_id, numero_documento, tipo_documento,
              primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
              fecha_nacimiento, genero, telefono, email
       FROM Pacientes WHERE paciente_id = ?`,
      [createdId],
      (err2, row) => {
        if (err2) return res.status(201).json({ paciente_id: createdId, familia_id });
        res.status(201).json(row);
      }
    );
  });
});

// Crear una nueva familia
app.post('/api/familias', (req, res) => {
  const {
    apellido_principal,
    direccion,
    barrio_vereda,
    municipio,
    telefono_contacto,
    creado_por_uid
  } = req.body || {};

  if (!apellido_principal || !direccion || !municipio || !creado_por_uid) {
    return res.status(400).json({
      error: 'Faltan campos obligatorios: apellido_principal, direccion, municipio, creado_por_uid'
    });
  }

  const insert = `
    INSERT INTO Familias (apellido_principal, direccion, barrio_vereda, municipio, telefono_contacto, creado_por_uid)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    insert,
    [apellido_principal, direccion, barrio_vereda || null, municipio, telefono_contacto || null, creado_por_uid],
    function (err) {
      if (err) {
        console.error('Error insertando familia:', err);
        return res.status(500).json({ error: 'No se pudo crear la familia' });
      }
      const createdId = this.lastID;
      db.get(
        `SELECT f.*, (
            SELECT COUNT(1) FROM Pacientes p WHERE p.familia_id = f.familia_id AND p.activo = 1
          ) AS integrantes_count
         FROM Familias f WHERE f.familia_id = ?`,
        [createdId],
        (err2, row) => {
          if (err2) {
            return res.status(201).json({ familia_id: createdId });
          }
          res.status(201).json(row);
        }
      );
    }
  );
});

// Obtener usuarios por rol
app.get('/api/usuarios/rol/:rol', (req, res) => {
  const { rol } = req.params;
  
  const query = `
    SELECT u.usuario_id, u.nombre_completo, u.email, u.telefono,
           e.nombre_equipo, e.zona_cobertura
    FROM Usuarios u
    JOIN Roles r ON u.rol_id = r.rol_id
    LEFT JOIN Equipos_Basicos e ON u.equipo_id = e.equipo_id
    WHERE r.nombre_rol = ? AND u.activo = 1
  `;
  
  db.all(query, [rol], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor de Salud Digital APS funcionando',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`📊 Base de datos: ${dbPath}`);
});