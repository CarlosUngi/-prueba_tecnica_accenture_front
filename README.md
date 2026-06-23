# -prueba_tecnica_accenture_front
# 1. Instalar Node.js y npm (si no los tienes en tu Fedora)
sudo dnf install -y nodejs npm

# 2. Instalar el CLI de Ionic globalmente
sudo npm install -g @ionic/cli

# 3. Instalar Cordova globalmente (Requerido por la prueba)
sudo npm install -g cordova


# Asegúrate de estar en la raíz de tu proyecto
# cd prueba_tecnica_accenture_front

# 1. Inicializar el package.json si no existe (si es un proyecto desde cero)
npm init -y

# 2. Instalar el núcleo de Angular e Ionic localmente
npm install @angular/core @angular/common @angular/compiler @angular/platform-browser @angular/router
npm install @ionic/angular@latest

# 3. Instalar Ionic Storage para la persistencia local de tareas y categorías
npm install @ionic/storage-angular
npm install localforage # Dependencia requerida por Ionic Storage

# 4. Instalar el SDK de Firebase y AngularFire (para el Remote Config / Feature Flags)
npm install firebase @angular/fire
npm install firebase @angular/fire --legacy-peer-deps


# Agregar soporte para Android de forma local a través de Cordova
cordova platform add android

# Agregar soporte para iOS (recuerda que para compilar requerirás un entorno Mac o Cloud Build más adelante)
cordova platform add android


ionic info