# Aplicación de Gestor de Productos 🚀

Aplicación web desarrollada en **Angular 19** (Standalone Components) para la gestión completa de un inventario de productos.

## ✨ Características Principales

*   **Arquitectura Moderna:** Construida 100% con Standalone Components (sin `NgModule`) y Lazy Loading para optimizar el rendimiento.
*   **Diseño Premium (Dark UI):** Interfaz estilizada de alto contraste usando Angular Material, con un panel de control avanzado, tablas reactivas con efectos de hover y diseño *Dark Cards*.
*   **Buscador en Tiempo Real:** Filtrado instantáneo de productos en la tabla mediante `MatTableDataSource`.
*   **Integración de API Externa (DolarAPI):** Consumo de API pública para obtener la cotización actual del dólar y calcular el precio convertido en tiempo real desde el frontend.
*   **Custom Pipe Avanzado:** Implementación de un `CustomCurrencyPipe` parametrizable que da formato a los precios en Pesos (`ARS`) y Dólares (`USD`) utilizando `Intl.NumberFormat`.
*   **CRUD Completo:** Sistema para listar, crear, editar y eliminar productos conectado a una API simulada (MockAPI).
*   **Seguridad y Autenticación:** Sistema de Login protegido mediante Guards Funcionales (`CanActivateFn`) y persistencia de sesión segura en `sessionStorage`.
*   **Roles de Usuario (RBAC):** Sistema de roles (Administrador / Cliente) que adapta la interfaz y las rutas disponibles según el perfil del usuario logueado.
*   **Carrito de Compras:** Panel lateral reactivo con gestión de cantidades, cálculo de total y simulación de checkout, disponible para el rol Cliente.
*   **Estados de Carga y Error:** Indicadores visuales de carga (spinner), estado vacío, y manejo de errores con opción de reintento.
*   **Validación de Formularios:** Mensajes de error contextuales en los formularios con prevención de envío duplicado.

## 🛠️ Tecnologías Utilizadas

*   **Framework:** Angular 19
*   **UI / Estilos:** Angular Material (MDC) + Vanilla CSS
*   **Peticiones HTTP:** HttpClient (RxJS)
*   **Formularios:** Reactive Forms (`FormBuilder`, `Validators`)
*   **Backend / Base de Datos:** MockAPI (REST API)
*   **Despliegue / Hosting:** Vercel

## ⚙️ Instalación y Ejecución Local

1.  Clona este repositorio.
2.  Navega al directorio del proyecto: `cd gestor-productos`
3.  Instala las dependencias: `npm install`
4.  Ejecuta el servidor de desarrollo: `npm start` (o `ng serve`)
5.  Abre tu navegador en `http://localhost:4200/`