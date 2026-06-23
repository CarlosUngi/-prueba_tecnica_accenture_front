#!/bin/bash

echo "🚀 Creando estructura Clean Architecture en el directorio actual..."

# 1. Crear directorios base
mkdir -p src/app/core/models
mkdir -p src/app/core/repositories
mkdir -p src/app/data/services
mkdir -p src/app/data/providers
mkdir -p src/app/presentation/shared
mkdir -p src/app/presentation/tasks
mkdir -p src/app/presentation/categories
mkdir -p src/theme

echo "📁 Estructura de carpetas creada con éxito."

# 2. Crear archivo config.xml de Cordova en la raíz [cite: 23]
cat << 'EOF' > config.xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.accenture.todolist" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>Accenture ToDo Front</name>
    <description>Prueba Técnica Frontend - Ionic Angular Cordova</description>
    <author email="carlos.ungi@gmail.com" href="https://github.com/CarlosUngi">
        Carlos Garzón
    </author>
    <content src="index.html" />
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="sms:*" />
    <allow-intent href="mailto:*" />
    <allow-intent href="geo:*" />
    
    <preference name="ScrollEnabled" value="false" />
    <preference name="BackupWebStorage" value="local" />
    <preference name="FadeSplashScreenDuration" value="300" />
    <preference name="SplashShowOnlyFirstTime" value="false" />
    <preference name="SplashScreen" value="screen" />
    <preference name="SplashScreenDelay" value="3000" />
    
    <platform name="android">
        <allow-intent href="market:*" />
        <preference name="AndroidXEnabled" value="true" />
    </platform>
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
        <preference name="WKWebViewOnly" value="true" />
    </platform>
</widget>
EOF

# 3. Crear Modelos en la capa de Core (Dominio) [cite: 7, 12]
cat << 'EOF' > src/app/core/models/category.model.ts
export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}
EOF

cat << 'EOF' > src/app/core/models/task.model.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  categoryId?: string;
  createdAt: Date;
}
EOF

# 4. Crear Contrato de Repositorio (Abstracción) 
cat << 'EOF' > src/app/core/repositories/storage.repository.ts
import { Observable } from 'rxjs';

export interface StorageRepository {
  get<T>(key: string): Observable<T | null>;
  set<T>(key: string, value: T): Observable<boolean>;
  remove(key: string): Observable<boolean>;
  clear(): Observable<boolean>;
}
EOF

# 5. Archivos marcadores vacíos para control visual [cite: 27]
touch src/app/data/services/local-storage.service.ts
touch src/app/data/services/firebase-remote.service.ts
touch src/theme/variables.css

echo "📄 Archivos de configuración y modelos iniciales generados."
echo "✅ ¡Listo! Estructura montada limpiamente."