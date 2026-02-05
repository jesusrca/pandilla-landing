# 🥪 Pandilla - Landing Page

Una landing page moderna con scroll horizontal para **Pandilla - Taller de Sanguchitos del Barrio**.

## 🎨 Características

- **Scroll Horizontal Full-Screen**: Navegación fluida entre secciones con transiciones suaves
- **Diseño Premium**: Paleta de colores cálida inspirada en la identidad de marca
- **Animaciones Elegantes**: Efectos de entrada y transiciones que mejoran la experiencia
- **Navegación Intuitiva**: 
  - Puntos de navegación lateral
  - Scroll con rueda del ratón
  - Gestos táctiles (swipe) en móviles
  - Navegación por teclado (flechas)
- **Totalmente Responsive**: Optimizado para todos los dispositivos
- **Efectos Parallax**: Movimiento sutil de elementos con el cursor

## 📂 Estructura del Proyecto

```
pandilla-landing/
├── index.html          # Estructura HTML principal
├── style.css           # Estilos y animaciones
├── script.js           # Lógica de navegación e interacciones
├── Brand/              # Recursos de marca (logos, SVGs)
│   ├── logo-pandilla.svg
│   ├── slogan-pandilla.svg
│   ├── age-pandilla.svg
│   └── Animación Personajes Pandill 2.svg
├── Fonts-2/            # Tipografías personalizadas
│   ├── DentonCondensedTest-Light.otf
│   ├── MyriadPro-Regular.otf
│   └── PPFraktionMono-Regular.otf
└── content/            # Imágenes y contenido
    ├── 1 6.jpg
    ├── Group 1.png
    └── Trama.svg
```

## 🎯 Secciones

1. **Hero** - Logo principal y slogan
2. **Personajes** - Animación de los personajes de Pandilla
3. **Menú** - Presentación de productos
4. **The Power of Love** - Tarjeta destacada
5. **Equipo** - Foto del equipo con overlay interactivo
6. **Los Deliciosos** - Título destacado de sanguchitos
7. **Contacto** - Información final y logo

## 🚀 Cómo Usar

### Abrir Localmente

Simplemente abre el archivo `index.html` en tu navegador:

```bash
open index.html
```

O arrastra el archivo a tu navegador favorito.

### Navegación

- **Ratón**: Scroll horizontal con la rueda del ratón
- **Teclado**: 
  - `→` / `↓` - Siguiente sección
  - `←` / `↑` - Sección anterior
  - `Home` - Primera sección
  - `End` - Última sección
- **Táctil**: Desliza horizontalmente (swipe)
- **Puntos**: Click en los puntos de navegación lateral

## 🎨 Paleta de Colores

- **Crema**: `#F5E6D3` - Color base
- **Beige**: `#E8D5B7` - Tonos secundarios
- **Naranja**: `#E85D3C` - Acentos principales
- **Marrón**: `#75391C` - Textos y elementos principales
- **Marrón Oscuro**: `#4A2410` - Contraste fuerte

## 🔤 Tipografías

- **Denton** - Títulos display
- **Myriad Pro** - Textos principales
- **PP Fraktion Mono** - Detalles y acentos

## ✨ Características Técnicas

- CSS Grid y Flexbox para layouts
- CSS Custom Properties (variables)
- Animaciones CSS con keyframes
- JavaScript vanilla (sin dependencias)
- Intersection Observer para animaciones
- Touch events para móviles
- Optimizado para rendimiento

## 🎭 Easter Egg

Prueba el código Konami: `↑ ↑ ↓ ↓ ← → ← → B A`

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Dispositivos móviles iOS/Android

## 🛠️ Personalización

### Cambiar Colores

Edita las variables CSS en `style.css`:

```css
:root {
    --color-cream: #F5E6D3;
    --color-orange: #E85D3C;
    /* ... más colores */
}
```

### Ajustar Velocidad de Transiciones

Modifica el timeout en `script.js`:

```javascript
setTimeout(() => {
    this.isScrolling = false;
}, 800); // Cambia este valor (en ms)
```

## 📄 Licencia

© 2024 Pandilla - Taller de Sanguchitos del Barrio

---

**Hecho con ❤️ para Pandilla**
