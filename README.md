# Lightbox PCF Component
<img src="/app1.png">

<img src="/app2.png">

<a href="https://www.youtube.com/watch?v=zIWamNosGHg">Ver video </a>


## Español

### Descripción

**Lightbox** es un componente personalizado para Power Apps (PCF) que permite mostrar una galería de imágenes interactiva con efecto lightbox. El usuario puede navegar entre imágenes, ver sus descripciones y disfrutar de una experiencia visual moderna y atractiva.

### Funcionalidades

- Visualización de imágenes en formato galería.
- Efecto lightbox: al hacer clic en una imagen, se muestra en grande con fondo atenuado.
- Navegación entre imágenes con botones "anterior" y "siguiente".
- Visualización de miniaturas (thumbnails) para acceso rápido.
- Muestra el texto descriptivo (caption) de cada imagen.
- Componente responsive, se adapta al tamaño del contenedor en Power Apps.

### Propiedades configurables

| Propiedad | Descripción | Tipo | Ejemplo |
|-----------|-------------|------|---------|
| `images`  | Lista de imágenes y descripciones en formato JSON. Cada elemento debe tener `src` (URL de la imagen) y `caption` (texto descriptivo). | Texto (JSON) | `[{"src":"https://...","caption":"Descripción"}]` |

#### Ejemplo de valor para `images`:

```json
[
  {"src":"https://picsum.photos/id/1018/400/300","caption":"Paisaje 1"},
  {"src":"https://picsum.photos/id/1015/400/300","caption":"Nieve"},
  {"src":"https://picsum.photos/id/1016/400/300","caption":"Montañas"},
  {"src":"https://picsum.photos/id/1020/400/300","caption":"Luces"}
]
```

### Beneficios para la experiencia de usuario

- Mejora la presentación visual de imágenes en tus aplicaciones.
- Permite navegar fácilmente entre varias imágenes sin salir de la pantalla.
- Proporciona contexto visual y textual con captions personalizables.
- Se integra fácilmente en cualquier formulario o vista de Power Apps.

### Instalación y Uso

1. **Compila el componente:**
   ```sh
   npm install
   npm run build
   ```

2. **Empaqueta el componente:**
   ```sh
   npm run pac
   ```

3. **Importa el archivo `.zip` generado en tu entorno de Power Apps.**

4. **Agrega el componente a tu aplicación y configura la propiedad `images` con un JSON como el ejemplo anterior.**

---

## English

### Description

**Lightbox** is a custom Power Apps (PCF) component that displays an interactive image gallery with a lightbox effect. Users can browse images, view their descriptions, and enjoy a modern, attractive visual experience.

### Features

- Gallery-style image display.
- Lightbox effect: clicking an image shows it enlarged with a dimmed background.
- Navigation between images with "previous" and "next" buttons.
- Thumbnails for quick access to any image.
- Shows descriptive text (caption) for each image.
- Responsive component, adapts to the container size in Power Apps.

### Configurable Properties

| Property | Description | Type | Example |
|----------|-------------|------|---------|
| `images` | List of images and descriptions in JSON format. Each item must have `src` (image URL) and `caption` (description text). | Text (JSON) | `[{"src":"https://...","caption":"Description"}]` |

#### Example value for `images`:

```json
[
  {"src":"https://picsum.photos/id/1018/400/300","caption":"Landscape 1"},
  {"src":"https://picsum.photos/id/1015/400/300","caption":"Snow"},
  {"src":"https://picsum.photos/id/1016/400/300","caption":"Mountains"},
  {"src":"https://picsum.photos/id/1020/400/300","caption":"Lights"}
]
```

### User Experience Benefits

- Enhances the visual presentation of images in your apps.
- Allows easy navigation between multiple images without leaving the screen.
- Provides visual and textual context with customizable captions.
- Easily integrates into any Power Apps form or view.

### Installation and Usage

1. **Build the component:**
   ```sh
   npm install
   npm run build
   ```

2. **Package the component:**
   ```sh
   npm run pac
   ```

3. **Import the generated `.zip` file into your Power Apps environment.**

4. **Add the component to your app and set the `images` property with a JSON value as shown above.**

---