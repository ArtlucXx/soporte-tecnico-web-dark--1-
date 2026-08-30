# Soporte Técnico Informático — Sitio Web

## ▶ COMANDOS PARA CORRER EL SITIO

### 1. Instalar dependencias (solo la primera vez)
```
npm install
```

### 2. Crear archivo de configuración (solo la primera vez)
```
copy .env.example .env.local
```
Luego abre `.env.local` con el Bloc de notas y edita:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu-contrasena-segura
SESSION_SECRET=cualquier-texto-largo-de-mas-de-32-caracteres

NEXT_PUBLIC_INSTAGRAM_USER=tu_usuario_ig_sin_arroba

OWNER_EMAIL=aropcip@gmail.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=aropcip@gmail.com
SMTP_PASS=aqui-va-la-contrasena-de-aplicacion-gmail
SMTP_FROM=aropcip@gmail.com
```

### 3. Correr en modo desarrollo
```
npm run dev
```
Abre http://localhost:3000

### 4. Correr en modo producción
```
npm run build
npm run start
```

---

## 🔐 ACCESO ADMIN

El panel admin NO aparece en el sitio público.

**Desde el navegador** (para ver mensajes y editar Sobre Mí):
```
http://localhost:3000/admin/login
```

**Desde el CMD** (sin necesidad de navegador):
```
node admin-cli.mjs
```
Te pedirá usuario y contraseña (los que pusiste en .env.local).
Desde ahí puedes ver todos los mensajes recibidos y editar la sección Sobre Mí.

---

## 📧 ACTIVAR EMAILS (Gmail)

Para recibir un email cada vez que alguien llene el formulario:

1. Ve a https://myaccount.google.com/security
2. Activa "Verificación en 2 pasos" si no está activa
3. Busca "Contraseñas de aplicaciones" en el buscador de la página
4. Crea una con el nombre "Soporte Web"
5. Copia la contraseña de 16 caracteres que te da Google
6. Pégala en SMTP_PASS dentro de .env.local
7. Reinicia el servidor: Ctrl+C → npm run dev

---

## 💰 PRECIOS CONFIGURADOS

| Servicio | Precio |
|---|---|
| Limpieza y Liberación de Espacio | $10.000 – $18.000 |
| Eliminación de Virus y Protección | $15.000 – $25.000 |
| Optimización y Aceleración | $18.000 – $30.000 |
| Instalación de Windows y Programas | $20.000 – $35.000 |
| Diagnóstico | $4.000 (se descuentan $2.000 si contrata) |
| Garantía | 2 semanas incluida |

Para cambiar cualquier precio, edita el archivo:
app/page.tsx → busca la sección "services" o "process_steps"
