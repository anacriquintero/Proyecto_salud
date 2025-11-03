// backend/probar_login.js
const fetch = require('node-fetch');

async function probarLogin() {
  console.log('🔐 PROBANDO LOGIN DEL DR. CARLOS MENDOZA');
  
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'medico1@saludigital.edu.co',
        password: '1000000001'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login exitoso:');
      console.log(`   Usuario: ${data.user.name}`);
      console.log(`   Email: ${data.user.email}`);
      console.log(`   Rol: ${data.user.role}`);
      console.log(`   ID: ${data.user.id}`);
    } else {
      console.log('❌ Error en login:');
      console.log(`   ${data.error}`);
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
}

probarLogin();
