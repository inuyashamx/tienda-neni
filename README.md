# Tienda Neni

## Descripción
Tienda Neni es una aplicación web para gestionar una tienda en línea, enfocada en proporcionar una experiencia amigable para dispositivos móviles. Incluye funcionalidades como gestión de pedidos, productos, clientes y estadísticas.

## Tecnologías Utilizadas
- **React**
- **Vite**
- **TailwindCSS**
- **TypeScript**
- **React Router**

## Estructura del Proyecto
- `/src`
  - `/components`: Componentes reutilizables como `MobileMenu`, `Toolbar`, etc.
  - `/pages`: Páginas principales de la aplicación como `Orders`, `Products`, `Clients`, etc.
  - `/services`: Servicios para la lógica de negocio, como autenticación.

## Rutas y Módulos
- `/`: Página de inicio
- `/login`: Página de inicio de sesión
- `/registro`: Página de registro
- `/pedidos`: Página de pedidos
- `/productos`: Página de productos
- `/clientes`: Página de clientes
- `/estadisticas`: Página de estadísticas
- `/configuracion`: Página de configuración
- `/configuracion-tienda`: Configuración de la tienda
- `/tienda/:slug/`: Índice de la tienda
- `/tienda/:slug/productos`: Productos de la tienda con filtros
- `/tienda/:slug/categorias`: Categorías de la tienda
- `/tienda/:slug/producto/:id`: Detalle del producto
- `/tienda/:slug/carrito`: Carrito de compras
- `/tienda/:slug/checkout`: Página de pago
- `/tienda/:slug/confirmacion`: Confirmación de compra

## Instalación
1. Clona el repositorio:
   ```bash
   git clone <URL del repositorio>
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd tienda-neni
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución
Para ejecutar la aplicación en modo desarrollo:
```bash
npm run dev
```

## Contribución
1. Haz un fork del proyecto.
2. Crea una nueva rama:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m 'Añadir nueva funcionalidad'
   ```
4. Sube tus cambios:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request.

## Licencia
Este proyecto está bajo la Licencia MIT.
