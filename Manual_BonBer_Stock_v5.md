# BonBër Stock v5 — Manual de uso

**Cocina de Helados · Sistema de gestión de stock y producción**

---

## Índice

1. [Primeros pasos](#1-primeros-pasos)
2. [Dashboard](#2-dashboard)
3. [Módulo Helados](#3-módulo-helados)
   - [Stock](#31-stock)
   - [Mantecar](#32-mantecar)
   - [Producción](#33-producción)
   - [Ventas](#34-ventas)
   - [Clientes](#35-clientes)
   - [Check de stock](#36-check-de-stock)
   - [Movimientos](#37-movimientos)
   - [Recetas](#38-recetas)
   - [Planificar](#39-planificar)
   - [Sabores](#310-sabores)
4. [Módulo Materia Prima](#4-módulo-materia-prima)
   - [Stock MP](#41-stock-mp)
   - [Entrada](#42-entrada)
   - [Uso / Salida](#43-uso--salida)
   - [Movimientos MP](#44-movimientos-mp)
   - [Insumos](#45-insumos)
   - [Proveedores](#46-proveedores)
   - [Compras](#47-compras)
5. [Rentabilidad](#5-rentabilidad)
6. [Reportes](#6-reportes)
7. [Admin](#7-admin)
8. [Roles y permisos](#8-roles-y-permisos)
9. [Flujos operativos recomendados](#9-flujos-operativos-recomendados)
10. [Datos y backup](#10-datos-y-backup)
11. [Instalación como app](#11-instalación-como-app)

---

## 1. Primeros pasos

### Acceso

**Primer uso en un dispositivo:** la app no trae ninguna cuenta ni contraseña por defecto. Al abrirla por primera vez aparece la pantalla **Crear administrador**: elegí tu usuario y una contraseña de al menos 6 caracteres. Guardala bien: no se puede recuperar. Si la perdés, la única salida es restaurar un backup en un dispositivo nuevo o empezar de cero.

**Siguientes ingresos:** usuario y contraseña. Marcá *Recordar sesión* para no tener que ingresarlas cada vez. Tras 5 intentos fallidos el ingreso se bloquea 30 segundos.

**Contraseñas:** se guardan cifradas (nunca en texto plano), también dentro de los backups.

**Usuarios nuevos o restablecidos:** cuando un administrador crea un usuario o le restablece la contraseña, esa contraseña es temporal. La persona debe elegir una propia la primera vez que ingresa.

> **Si venías usando una versión anterior:** tus usuarios se conservan y sus contraseñas se cifran automáticamente al abrir la nueva versión. Si tu cuenta todavía usaba la contraseña inicial que venía por defecto, el sistema te obliga a cambiarla antes de entrar.

### Puesta en marcha inicial

El orden recomendado al comenzar desde cero:

1. **Admin → Datos → N° WhatsApp** — guardar el número del grupo para alertas
2. **Helados → Sabores** — revisar la lista de sabores, ajustar mínimos, precio de venta, costo y factor kg→L de cada uno
3. **Mat. Prima → Insumos** — revisar unidades y mínimos de alerta
4. **Mat. Prima → Proveedores** — cargar tus proveedores habituales
5. **Mat. Prima → Insumos** — asignar proveedor a cada insumo y cargar precio de referencia
6. **Helados → Recetas** — cargar la receta de cada sabor (insumos por kg de base)
7. **Mat. Prima → Entrada** — cargar el stock inicial real de cada insumo
8. **Helados → Producción** → *Registrar Producción* — cargar el stock inicial real de helados

---

## 2. Dashboard

Pantalla principal. Muestra el estado general de la operación de un vistazo.

### KPIs

| Indicador | Descripción |
|-----------|-------------|
| **Stock Helados** | Litros totales activos en stock |
| **Alertas Stock** | Sabores con stock ≤ mínimo o en cero |
| **Próx. Vencer** | Sabores con vencimiento en ≤ 10 días |
| **MP Bajo Mín.** | Insumos con stock ≤ su mínimo de alerta |

### Alertas

Aparecen debajo de los KPIs cuando hay situaciones críticas. Cada alerta muestra el sabor o insumo afectado. Al tocar **Ver compras** en el KPI de MP se va directo a la lista de compras agrupada por proveedor.

### Acciones rápidas *(solo admin)*

- **Backup:** muestra la fecha y tamaño del último respaldo. El botón *Exportar ahora* descarga un JSON con todos los datos del sistema.
- **WhatsApp:** genera un mensaje con todas las alertas activas y lo manda por WhatsApp. Si configuraste un número en Admin, va directo a ese contacto o grupo.

### Actividad reciente

Últimos 8 movimientos del sistema (producciones, ventas, ajustes).

---

## 3. Módulo Helados

### 3.1 Stock

Vista principal del inventario de helados. Muestra una grilla con cada sabor activo.

**Colores de cada tarjeta:**

- 🟢 Verde — stock OK
- 🔴 Rojo — stock en cero o bajo el mínimo
- 🟠 Naranja — próximo a vencer (≤ 10 días)

**Cada tarjeta muestra:**
- Nombre del sabor y tamaño del envase
- Litros disponibles y cantidad de envases
- Fecha de vencimiento del lote más antiguo con stock
- Precio de venta y margen % *(solo admin)*

**Filtros:** buscador por nombre en tiempo real.

**Exportar:** descarga una hoja HTML con el inventario completo, lista para imprimir.

---

### 3.2 Mantecar

Módulo de producción operativa. Registra las mantecaciones del día.

#### Sub-tab: Orden

Para mantecar un sabor a la vez.

1. Seleccioná el **sabor/envase**
2. El sistema carga automáticamente el **factor kg→L** del sabor
3. Ingresá los **kg de base** — los litros y envases se calculan solos
4. También podés ingresar los litros directamente y se calculan los kg inversos
5. Ajustá el **factor** si en esta corrida fue distinto — el sistema lo guarda para próximas veces
6. La **fecha de vencimiento** se calcula automáticamente según los días configurados en el sabor
7. El sistema muestra en verde/rojo la **MP disponible** para esa producción
8. Al confirmar:
   - Se genera el código `ORD-YYYYMMDD-XXXX`
   - Se descuenta la MP automáticamente (por kg de base, usando la receta)
   - Se suma el stock de helados
   - Aparece la **etiqueta del lote** lista para imprimir

#### Sub-tab: Lote del día

Para mantecar varios sabores juntos.

1. Ingresá la **fecha** del lote
2. Agregá filas con **+ Sabor** — una por cada sabor a producir
3. Completá kg de base y factor para cada uno
4. El resultado (litros y envases) se calcula en tiempo real
5. El **resumen de MP** abajo muestra la MP total acumulada vs. disponible
6. Al confirmar:
   - Se valida toda la MP antes de commitear nada
   - Si algo falta, el sistema avisa sin descontar nada
   - Si todo está OK, descuenta MP y suma stock de todos los sabores de una vez
   - Aparecen todas las etiquetas del lote para imprimir juntas

#### Sub-tab: Historial

Todas las mantecaciones registradas, filtrable por sabor o código de orden. Cada fila tiene el botón 🖨️ para reimprimir la etiqueta individual. El botón *Imprimir todo hoy* reúne las etiquetas del día en una hoja.

#### Etiquetas

Cada etiqueta muestra: código de orden, nombre del sabor, kg de base, litros, envases, fecha de producción, fecha de vencimiento y operario. Al imprimir abre una ventana nueva con diseño limpio para impresora de etiquetas o papel A4.

---

### 3.3 Producción

Registro alternativo de producción — sirve para cargar el stock inicial o correcciones manuales que no pasan por Mantecación.

#### Manual

1. Seleccioná el **sabor/envase**
2. Ingresá **envases** — los litros se calculan solos
3. Ingresá **fecha de producción** — el vencimiento se calcula automáticamente
4. Campo **Lote** libre (opcional)
5. Si el sabor tiene receta, muestra la **MP necesaria** en verde/rojo
6. Al confirmar descuenta MP y suma stock

#### Cargar PDF *(IA)*

1. Tocá la zona de carga y subí el reporte de producción (PDF o foto)
2. La IA extrae: fecha, productor, lote e ítems con producto y envases
3. Revisá y corregí si hace falta
4. Confirmá — suma al stock y descuenta MP

---

### 3.4 Ventas

Registro de salidas por ventas.

#### Manual

1. N° de factura y cliente (opcionales pero recomendados)
2. Seleccioná el sabor — muestra el **stock disponible** y precio de venta *(admin)*
3. Ingresá envases — los litros se calculan solos
4. Al confirmar, descuenta del stock

#### Leer Factura PDF *(IA)*

1. Subí la factura en PDF o foto
2. La IA extrae: número de factura, fecha, cliente e ítems
3. Si algún producto no tiene stock suficiente, la tarjeta se marca en rojo
4. Revisá y confirmá — descuenta del stock

---

### 3.5 Clientes

Vista de todos los clientes con historial de compras. Solo visible para admin.

Muestra por cliente: litros comprados, envases, cantidad de facturas, fecha del último pedido y el sabor más pedido.

Filtro de búsqueda por nombre.

---

### 3.6 Check de stock

Conteo físico para detectar diferencias entre el stock teórico y el real.

1. Para cada sabor, el sistema muestra el stock **teórico** (calculado)
2. Ingresás los **envases físicos** que contás
3. La diferencia aparece en verde (sobrante) o rojo (faltante)
4. **Aplicar Ajuste** registra los movimientos de corrección y actualiza el stock

El historial de checks anteriores aparece debajo.

---

### 3.7 Movimientos

Registro completo de todos los movimientos de stock de helados.

**Filtros:**
- Por sabor/envase
- Por tipo: Inicial / Producción / Venta / Ajuste

Útil para auditar, rastrear un lote o entender por qué cambió el stock de un sabor.

---

### 3.8 Recetas

Define los insumos necesarios para producir cada sabor. Las cantidades están **en base a 1 kg de mezcla base**.

#### Cargar una receta

1. Seleccioná el **sabor** arriba
2. Tocá **+ Agregar ingrediente** por cada insumo
3. Para cada ingrediente: seleccioná el insumo y la cantidad por kg de base
4. El sistema muestra en tiempo real el **precio de cada ingrediente** y el subtotal por kg base
5. El panel inferior calcula automáticamente:
   - **Costo/kg base**
   - **Costo/litro** (usando el factor kg→L del sabor)
   - **Costo/envase**
   - **Margen %** (si tiene precio de venta cargado)
6. Si algún insumo no tiene precio, aparece una advertencia en naranja
7. **Guardar receta** — al guardar, actualiza automáticamente el campo *costo* del sabor

#### Lista de recetas

Muestra todos los sabores con receta, con su costo/envase calculado y margen. El botón *Editar* lleva al editor. El botón *✕* elimina la receta (y resetea el costo del sabor si venía de la receta).

> **Nota:** El costo de receta se recalcula automáticamente cada vez que cambia el precio de algún insumo usado en ella.

---

### 3.9 Planificar

Dos herramientas para planificar la producción.

#### Orden del día

Para armar la producción del día con varios sabores y verificar la MP antes de producir.

1. Ingresá la **fecha**
2. Agregá sabores con **+ Sabor**
3. Para cada sabor, ingresá los **envases a producir**
4. El semáforo por fila indica si hay MP:
   - 🟢 Verde — MP disponible
   - 🔴 Rojo — MP insuficiente
   - 🟠 Sin receta — no se descontará MP
5. El **resumen de MP** abajo muestra la MP acumulada total vs. stock actual
6. Al confirmar:
   - Valida toda la MP en conjunto antes de commitear
   - Descuenta MP y suma al stock de helados
   - Genera código `ODI-YYYYMMDD-NNN`

#### Planificación semanal

Tabla de 7 días (lunes a domingo) con todos los sabores que planificás producir.

- Navegás entre semanas con ◀ ▶ o el botón *Hoy*
- Agregás sabores con **+ Sabor**
- Completás los envases de cada día
- El semáforo por celda indica disponibilidad de MP
- El resumen de MP de la semana aparece debajo
- **Confirmar día** (botón ✓ en el footer de cada columna): descuenta MP y registra producción para ese día. El día queda bloqueado con ✓
- **Exportar HTML**: descarga la planificación semanal con tabla de MP necesaria, lista para imprimir o compartir

#### Verificar sabor

Herramienta rápida para chequear si hay MP suficiente para producir N envases de un sabor específico. Muestra el máximo posible con el stock actual, expresado en envases, litros y kg de base.

---

### 3.10 Sabores

Configuración del catálogo de sabores. Solo visible para admin.

**Campos por sabor:**

| Campo | Descripción |
|-------|-------------|
| Nombre | Nombre del sabor |
| Tamaño (L) | Litros por envase |
| Mín. (env) | Mínimo de envases para alerta |
| Precio venta | UYU por envase |
| Costo | UYU por envase (se puede ingresar manual o se calcula desde la receta) |
| Días vencimiento | 0 = sin vencimiento |
| Factor kg→L | Cuántos litros salen de 1 kg de base (ej: 1.2) |

**Acciones por sabor:**

- **Editar** — cambia precios, mínimo, días de vencimiento y factor
- **↺ Costo** — recalcula el costo desde la receta con los precios de insumos actuales (aparece solo en sabores con receta)
- **Desactivar / Activar** — los sabores inactivos desaparecen del stock, alertas y selects operativos, pero se conservan sus movimientos. Útil para sabores de temporada.
- **✕** — elimina el sabor y sus movimientos (pide confirmación)

**Filtros:** buscador + botones Todos / Activos / Inactivos.

---

## 4. Módulo Materia Prima

### 4.1 Stock MP

Vista del inventario de todos los insumos.

**Colores:**
- 🟢 Verde — stock OK
- 🔴 Rojo — sin stock o bajo mínimo

Cada fila muestra: nombre, mínimo, estado, proveedor asignado y último precio registrado *(solo admin)*.

---

### 4.2 Entrada

Registro de compras e ingresos de MP.

#### Manual

1. Seleccioná el **insumo** — se autocompleta el último precio y proveedor
2. Ingresá **cantidad** y **fecha**
3. *(Admin)* Ingresá **precio pagado** y **proveedor** si corresponde
4. Al confirmar:
   - Suma al stock
   - Guarda el precio en el historial
   - Recalcula el costo de todos los sabores cuyas recetas usen ese insumo

#### Leer Factura PDF *(IA)*

1. Subí la factura de compra en PDF o foto
2. La IA extrae: número de factura, fecha, proveedor e ítems con cantidad y precio
3. El campo de precio muestra el anterior para comparar, con indicador de variación % en rojo/verde
4. Revisá y confirmá:
   - Suma stock
   - Actualiza historial de precios
   - Si detecta un proveedor nuevo en el PDF, lo crea automáticamente
   - Recalcula costos de recetas afectadas

---

### 4.3 Uso / Salida

Registro de salidas de MP no asociadas a una producción (mermas, pruebas, etc.).

#### Manual

El selector muestra el stock disponible actualizado. Al confirmar, descuenta del stock.

#### Texto libre / Documento *(IA)*

Escribí en texto libre (ej: "3 kg mora, 2 kg frambuesa") o subí un documento. La IA identifica los insumos del catálogo. Podés revisar cada ítem antes de confirmar, y desmarcar los que no querés descontar.

---

### 4.4 Movimientos MP

Historial completo de todos los movimientos de MP. Filtrable por insumo y por tipo (Inicial / Entrada / Uso).

---

### 4.5 Insumos

Configuración del catálogo de insumos. Solo admin.

**Campos:** Nombre, Unidad, Mínimo de alerta, Precio de referencia, Proveedor principal.

---

### 4.6 Proveedores

CRUD de proveedores. Solo admin.

Cada proveedor tiene: nombre y nota de contacto (teléfono, email, observaciones).

Al leer facturas PDF, si la IA detecta un proveedor que no existe en el sistema, lo crea automáticamente con la nota "Agregado automáticamente desde PDF".

El historial de precios por proveedor e insumo está disponible en esta sección.

---

### 4.7 Compras

Lista automática de insumos bajo mínimo, agrupados por proveedor. Solo admin.

Aparece automáticamente al abrir la sección — no hay que configurar nada.

**Por cada insumo muestra:**
- Stock actual y mínimo
- **Cantidad sugerida** de compra (≈ 2× el déficit, o 2× el mínimo si está en cero)
- **Costo estimado** (cantidad sugerida × último precio registrado)
- Botón **+ Entrada** que lleva directo a registrar la compra con ese insumo preseleccionado

**Por proveedor muestra:** nombre, contacto y costo total estimado del pedido.

**Exportar lista:** descarga una hoja HTML imprimible con las cantidades a pedir, columna de tilde manual para ir tachando mientras comprás, y total estimado por proveedor y global.

---

## 5. Rentabilidad

Solo visible para admin. Análisis de rentabilidad por período.

### Selector de período

Botones rápidos: 7d / 30d / 90d / Todo. O fechas manuales con los inputs. Todo recalcula en tiempo real.

### KPIs del período

- Ingreso estimado y litros vendidos
- Margen bruto en $ y % (verde ≥40%, naranja ≥20%, rojo <20%)
- Litros producidos
- Sabor con mejor margen

### Sub-tab: Sabores

- **Gráfico de barras** coloreado por margen (ordenable por margen %, ingreso o volumen)
- **Tabla ranking** con litros vendidos, ingreso, costo MP, margen $ y margen %

### Sub-tab: Clientes

Ranking de clientes por ingreso del período: facturas, litros, ingreso, fecha del último pedido.

### Sub-tab: Costos MP

- **Evolución de precios** de los insumos con más de un precio registrado: muestra la variación % desde el primer precio al actual
- **Costo de recetas** actuales: cada sabor con receta muestra el costo/envase, precio de venta y margen con los precios vigentes

### Gráfico de ingresos semanales

Barras por semana del período seleccionado. La semana actual aparece en dorado.

---

## 6. Reportes

Solo visible para admin. Genera un reporte descargable en HTML.

1. Seleccioná el **período** (desde / hasta)
2. Marcá las **secciones** a incluir: Producción, Ventas, Margen por Sabor, Clientes, Entradas MP, Salidas MP
3. **Generar y Descargar** — abre el reporte en una hoja HTML con tablas y resumen de KPIs

---

## 7. Admin

Gestión del sistema. Solo visible para admin.

### Mi Contraseña

Cambiá tu propia contraseña (requiere ingresar la actual; mínimo 6 caracteres).

### Gestión de Usuarios

Crear nuevos usuarios con rol Operario o Administrador.

Por cada usuario existente: cambiar contraseña, habilitar/deshabilitar, eliminar.

### Datos

- **Exportar JSON:** descarga todos los datos del sistema (sabores, insumos, movimientos, recetas, usuarios, configuración)
- **Importar JSON:** reemplaza todos los datos con un archivo exportado previamente
- **N° WhatsApp:** número de destino para el botón de alertas del Dashboard (formato internacional, sin espacios ni `+`: ej. `59899123456`)
- **Resetear datos iniciales:** borra todos los movimientos, recetas y precios y vuelve al estado inicial del catálogo. Conserva las cuentas de usuario y la configuración.

---

## 8. Roles y permisos

| Función | Admin ★ | Operario |
|---------|---------|----------|
| Dashboard | Completo + Backup + WhatsApp | Sin ingresos |
| Stock helados | Con precio y margen | Sin precio ni margen |
| Mantecar | ✅ | ✅ |
| Producción | ✅ | ✅ |
| Ventas | Con columna Ingreso | Sin Ingreso |
| Clientes | ✅ | ❌ |
| Check | ✅ | ✅ |
| Movimientos | ✅ | ✅ |
| Recetas | ✅ | ❌ |
| Planificar | ✅ | ✅ |
| Sabores | ✅ | ❌ |
| Stock MP | Con precio y proveedor | Solo cantidades |
| Entrada MP | Con precio y proveedor | Sin precio ni proveedor |
| Uso/Salida MP | ✅ | ✅ |
| Movimientos MP | ✅ | ✅ |
| Insumos | ✅ | ❌ |
| Proveedores | ✅ | ❌ |
| Compras | ✅ | ❌ |
| Rentabilidad | ✅ | ❌ |
| Reportes | ✅ | ❌ |
| Admin | ✅ | Solo Perfil |

---

## 9. Flujos operativos recomendados

### Jornada de producción típica

1. **Dashboard** — revisar alertas al entrar
2. **Helados → Planificar → Orden del día** — armar la producción del día, verificar MP
3. Ir a producir
4. **Helados → Mantecar → Lote del día** — registrar lo producido, imprimir etiquetas
5. Si llegó mercadería: **Mat. Prima → Entrada** — registrar con precio (manual o PDF)

### Registro de ventas

- Para ventas con factura en papel: **Helados → Ventas → Leer Factura** — subir foto o PDF
- Para ventas manuales rápidas: **Helados → Ventas → Manual**

### Conteo semanal de stock

1. **Helados → Check** — ingresar lo que se cuenta físicamente
2. **Aplicar Ajuste** — el sistema registra las diferencias

### Planificación de semana

1. **Helados → Planificar → Semana** — completar la grilla día a día
2. Exportar HTML para tener la semana impresa o en el celular
3. Cada día al producir: confirmar la columna del día → descuenta MP y suma stock

### Reposición de MP

1. **Dashboard** — el KPI *MP Bajo Mín.* muestra cuántos insumos hay que comprar. Tocar *Ver compras*
2. **Mat. Prima → Compras** — lista por proveedor con cantidades sugeridas. Exportar o usar el botón + para ir directo a registrar la entrada

---

## 10. Datos y backup

### Dónde se guardan los datos

Los datos viven en el **localStorage del navegador** del dispositivo. No van a ningún servidor externo.

Cada dispositivo tiene su propio storage. Para pasar datos de un dispositivo a otro hay que exportar e importar el JSON.

### Backup

Hacé backup periódicamente desde **Dashboard → Exportar ahora** o desde **Admin → Datos → Exportar**.

El archivo se descarga con la fecha y hora en el nombre: `BonBer_Backup_2026-05-10_09h30.json`.

Para restaurar: **Admin → Datos → Importar** y seleccioná el archivo JSON.

### Qué incluye el backup

- Todos los sabores con configuración (precios, factores, mínimos)
- Todos los insumos con precios y proveedores asignados
- Historial completo de movimientos (producción, ventas, entradas MP, salidas)
- Recetas cargadas
- Historial de precios de insumos
- Proveedores
- Mantecaciones registradas
- Usuarios y configuración

---

## 11. Instalación como app

La app se puede instalar como aplicación nativa en cualquier dispositivo. Requiere que esté publicada en GitHub Pages o similar.

### Android (Chrome)
1. Abrí la URL en Chrome
2. Menú ⋮ → *Agregar a pantalla de inicio*
3. O tocar el botón **⬇ Instalar app** que aparece en el header

### iOS (Safari)
1. Abrí la URL en Safari
2. Botón compartir □↑
3. *Agregar a pantalla de inicio*

### Escritorio (Chrome/Edge)
1. Aparece un ícono ⊕ en la barra de direcciones
2. Click → *Instalar*

### Modo offline

Una vez instalada, la app funciona **sin conexión a internet**. Los datos quedan en el dispositivo. Las funciones de IA (lectura de PDF e imágenes) requieren conexión — el resto de la app funciona offline completo.

---

*BonBër Stock v5 — Cocina de Helados*
