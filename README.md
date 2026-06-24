# Prueba Técnica Accenture - Frontend Híbrido (Ionic/Cordova)

Este repositorio contiene la solución a la prueba técnica para el desarrollo de una aplicación móvil híbrida de gestión de tareas (To-Do List) con categorización dinámica, persistencia local reactiva y control de características mediante la nube (Feature Flagging).

La aplicación ha sido diseñada bajo estrictos estándares de ingeniería de software, priorizando la separación de responsabilidades, la optimización de recursos en dispositivos móviles y la mantenibilidad a largo plazo.

---

## 📌 Tabla de Contenido
- [🚀 Arquitectura y Decisiones Tecnológicas](#-arquitectura-y-decisiones-tecnológicas)
  - [1. Patrón Arquitectónico (Clean Architecture)](#1-patrón-arquitectónico-clean-architecture)
  - [2. Stack de Tecnología Base](#2-stack-de-tecnología-base)
- [💻 Configuración del Ambiente de Desarrollo (Windows & Linux)](#-configuración-del-ambiente-de-desarrollo-windows--linux)
  - [En Linux (Fedora / Ubuntu / Debian)](#-en-linux-fedora--ubuntu--debian)
  - [En Windows](#-en-windows)
- [🛠️ Configuración Inicial y Seguridad de Credenciales](#%EF%B8%8F-configuración-inicial-y-seguridad-de-credenciales)
- [📲 Guía de Compilación para Android (Entorno Fedora Linux)](#-guía-de-compilación-para-android-entorno-fedora-linux)
  - [Requisitos Previos del Sistema](#requisitos-previos-del-sistema)
- [🏗️ Comandos de Construcción y Ejecución](#%EF%B8%8F-comandos-de-construcción-y-ejecución)
  - [1. Inicialización e instalación de dependencias](#1-inicialización-e-instalación-de-dependencias)
  - [2. Ejecutar el Servidor de Desarrollo (Web)](#2-ejecutar-el-servidor-de-desarrollo-web)
  - [3. Compilación nativa en Android (Automática)](#3-compilación-nativa-en-android-automática)
  - [4. Compilación nativa manual (Si tienes todo en tu PATH global)](#4-compilación-nativa-manual-si-tienes-todo-en-tu-path-global)
- [🤖 Metodología de Cocreación con IA](#-metodología-de-cocreación-con-ia)

---

## 🚀 Arquitectura y Decisiones Tecnológicas

### 1. Patrón Arquitectónico (Clean Architecture)
Para asegurar un código desacoplado y altamente testeable, el proyecto se estructuró siguiendo los principios de **Arquitectura Limpia** distribuidos en tres capas independientes:
* **Core (Dominio):** Contiene las entidades puras del negocio (`Task`, `Category`) y las interfaces abstractas de los repositorios (`StorageRepository`). No depende de ningún framework ni de librerías externas (Principio de Inversión de Dependencias).
* **Data (Servicios / Infraestructura):** Implementa la persistencia real a través de `LocalStorageService` (implementación de la abstracción del Core), encapsula el estado de la aplicación de forma reactiva (`TodoStateService`) y gestiona las configuraciones remotas (`FirebaseRemoteService`).
* **Presentation (UI / Vista):** Controladores y vistas móviles de Ionic (`TasksPage`), encargadas estrictamente de renderizar la interfaz y capturar las interacciones del usuario basándose en flujos asíncronos de datos.

### 2. Stack de Tecnología Base
* **Framework:** Ionic 7 + Angular 18 (Module-based). Se seleccionó estratégicamente esta combinación para garantizar estabilidad, rendimiento móvil y compatibilidad con el ecosistema de Cordova y Gradle.
* **Manejo de Estado:** Patrón reactivo utilizando **RxJS** y `BehaviorSubject` para centralizar el flujo de datos y evitar lecturas redundantes en disco.
* **Persistencia Local:** `@ionic/storage-angular` (orquestado por `localforage`), utilizando **IndexedDB** como motor de base de datos asíncrono en el dispositivo.
* **Feature Flagging:** Integración nativa con **Firebase Remote Config** para controlar la visualización de la gestión de categorías en tiempo real sin desplegar nuevas versiones.

---

## 💻 Configuración del Ambiente de Desarrollo (Windows & Linux)

Para poder desarrollar, probar o extender esta aplicación móvil híbrida, debes contar con las siguientes herramientas instaladas en tu sistema según tu sistema operativo.

### 🐧 En Linux (Fedora / Ubuntu / Debian)

1. **Instalar Node.js y npm:**
   * **Fedora/RHEL:**
     ```bash
     sudo dnf install -y nodejs npm
     ```
   * **Ubuntu/Debian:**
     ```bash
     sudo apt update && sudo apt install -y nodejs npm
     ```

2. **Instalar los CLI globales de Ionic y Cordova:**
   ```bash
   sudo npm install -g @ionic/cli cordova
   ```

3. **Instalar Java Development Kit (JDK 21):**
   * **Fedora:**
     ```bash
     sudo dnf install -y java-21-openjdk-devel
     ```
   * **Ubuntu:**
     ```bash
     sudo apt install -y openjdk-21-jdk
     ```

4. **Variables de entorno (en `~/.bashrc` o `~/.zshrc`):**
   ```bash
   export JAVA_HOME=/usr/lib/jvm/java-21-openjdk # Ajusta según el path real de tu distribución
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin
   ```
   *Aplica los cambios ejecutando `source ~/.bashrc`.*

---

### 🪟 En Windows

1. **Instalar Node.js (Recomendado LTS):**
   * Descarga e instala el instalador `.msi` desde el sitio oficial de [Node.js](https://nodejs.org/).
   * Asegúrate de marcar la casilla de verificación *"Automatically install the necessary tools..."* (esto instalará Chocolatey y herramientas de compilación necesarias).

2. **Instalar los CLI globales de Ionic y Cordova:**
   * Abre la terminal de **PowerShell** o **Símbolo del sistema (cmd)** como Administrador y ejecuta:
     ```powershell
     npm install -g @ionic/cli cordova
     ```

3. **Instalar Java Development Kit (JDK 21):**
   * Descarga el instalador del JDK desde [Oracle Technology Network](https://www.oracle.com/java/technologies/downloads/) o usa un gestor de paquetes como `winget` en PowerShell:
     ```powershell
     winget install Oracle.JDK.21
     ```

4. **Instalar Android Studio y el SDK:**
   * Descarga e instala [Android Studio](https://developer.android.com/studio).
   * Al iniciar, sigue el asistente para descargar el **Android SDK**, las **Android SDK Platform-Tools** y un emulador (opcional).

5. **Variables de entorno en Windows:**
   * Presiona la tecla Windows, busca **"Editar las variables de entorno del sistema"** y pulsa enter.
   * Crea las siguientes **Variables de usuario**:
     * Nombre: `JAVA_HOME` | Valor: `C:\Program Files\Java\jdk-21` (o la ruta donde se instaló el JDK).
     * Nombre: `ANDROID_HOME` | Valor: `%USERPROFILE%\AppData\Local\Android\Sdk` (ruta predeterminada del SDK).
   * Edita la variable `Path` del sistema o de usuario y añade las siguientes líneas al final:
     ```text
     %JAVA_HOME%\bin
     %ANDROID_HOME%\platform-tools
     %ANDROID_HOME%\cmdline-tools\latest\bin
     %ANDROID_HOME%\emulator
     ```

---

## 🛠️ Configuración Inicial y Seguridad de Credenciales

Por motivos de seguridad y siguiendo las mejores prácticas de la industria, **las llaves y credenciales reales de Firebase no se encuentran publicadas en este repositorio**.

Para ejecutar o compilar el proyecto localmente con soporte en la nube:

1. Dirígete al archivo [environment.ts](src/enviroments/environment.ts).
2. Reemplaza los placeholders del objeto `firebase` con los parámetros provistos por tu propia consola de Firebase Web Config:
   ```typescript
   export const environment = {
     production: false,
     firebase: {
       apiKey: "TU_API_KEY_REAL",
       authDomain: "TU_PROYECTO.firebaseapp.com",
       projectId: "TU_PROYECTO",
       storageBucket: "TU_PROYECTO.appspot.com",
       messagingSenderId: "TU_SENDER_ID",
       appId: "TU_APP_ID",
       measurementId: "TU_MEASUREMENT_ID"
     }
   };
   ```
3. En tu consola web de Firebase, configura el parámetro en **Remote Config** siguiendo estos pasos:
   * Ve a la **[Consola de Firebase](https://console.firebase.google.com/)** e ingresa a tu proyecto.
   * En la barra de navegación lateral izquierda, despliega la sección **Compilación (Build)** y selecciona **Remote Config**.
   * Haz clic en **Crear configuración** (o **Agregar parámetro** si ya tienes otros existentes).
   * Define los siguientes campos para el nuevo parámetro:
     * **Nombre del parámetro (Parameter key):** `show_categories_feature`
     * **Tipo de datos (Data type):** `Boolean`
     * **Valor predeterminado (Default value):** `true` (para habilitar categorías) o `false` (para deshabilitarlas).
   * Haz clic en **Guardar (Save)**.
   * **IMPORTANTE:** Haz clic en el botón **Publicar cambios (Publish changes)** en la parte superior derecha de la consola para aplicar y propagar los cambios en vivo a la aplicación móvil.

---

## 📲 Guía de Compilación para Android (Entorno Fedora Linux)

### Requisitos Previos del Sistema
Asegúrate de contar con el entorno de desarrollo móvil configurado en tu terminal Fedora:

1. **Java Development Kit:** OpenJDK 21. Se instala con:
   ```bash
   sudo dnf install -y java-21-openjdk-devel
   ```
2. **Android SDK Tools:** Command-line tools, Build-Tools y Platform-Tools instalados.
3. **Variables de entorno:** Asegúrate de que las variables estén estructuradas en tu archivo `~/.bashrc` (o el equivalente de tu consola):
   ```bash
   export JAVA_HOME=/usr/lib/jvm/java-21-openjdk
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin
   ```

---

## 🏗️ Comandos de Construcción y Ejecución

Hemos configurado accesos directos automatizados en los scripts de `package.json` para compilar sin necesidad de configurar variables de entorno en cada sesión y utilizando un Gradle portable (versión 8.14.2) integrado localmente en el proyecto.

### 1. Inicialización e instalación de dependencias
```bash
npm install
```

### 2. Ejecutar el Servidor de Desarrollo (Web)
```bash
npm start
```
*Esto levantará el servidor local de Ionic en `http://localhost:8100` con recarga rápida (Live Reload).*

### 3. Compilación nativa en Android (Automática)
Para construir de forma automática inyectando las rutas correctas del SDK de Android y Gradle local:

* **Compilar archivo APK de depuración / prueba (`.apk`):**
  ```bash
  npm run android:build:apk
  ```
  *El archivo APK generado se ubicará en:*
  `platforms/android/app/build/outputs/apk/debug/app-debug.apk`

* **Compilar archivo App Bundle de producción (`.aab`):**
  ```bash
  npm run android:build
  ```

* **Ejecutar la app en un dispositivo o emulador físico conectado:**
  ```bash
  npm run android:dev
  ```

### 4. Compilación nativa manual (Si tienes todo en tu PATH global)
Si ya tienes Gradle y el Android SDK configurados globalmente en tu terminal (`~/.bashrc`), puedes ejecutar los comandos estándar de Cordova:
```bash
# Sincronizar y estructurar los recursos híbridos
ionic cordova prepare android

# Compilar mediante Gradle y exportar el APK
ionic cordova build android -- --apk
```

---

## 🤖 Metodología de Cocreación con IA

El desarrollo de esta solución integró Inteligencia Artificial como copiloto bajo el siguiente esquema:

* **Diseño y Parámetros:** Como arquitecto principal, definí el diseño conceptual, las reglas de negocio y los parámetros de construcción.
* **Automatización Estructural:** Uso de scripts y automatización para la creación rápida de archivos y el boilerplate inicial.
* **Documentación:** Apoyo de la IA únicamente en la redacción de este README (la estructuración de las secciones y su validación se realizaron manualmente).
* **Auditoría y Validación:** Todo el código generado fue auditado, corregido y validado de manera manual para asegurar la calidad y cumplimiento de las reglas de negocio.