@echo off

setlocal

REM Obtiene la ruta del directorio actual del proyecto
set "proyecto_path=%cd%"

REM Define la ruta del directorio "Documentos"
set "documentos_path=%USERPROFILE%\Documents"

REM Define la ruta del destino en "Documentos"
set "destino_path=%documentos_path%\MiProyecto"

REM Verifica si Node.js ya está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js ya está instalado.
) else (
    echo Instalando Node.js...
    winget install -e OpenJS.NodeJS

    echo Esperando a que termine la instalación de Node.js...
    timeout /t 5 /nobreak
)

echo Copiando archivos del proyecto a %destino_path%...
xcopy /s /y "%proyecto_path%\*" "%destino_path%\"

echo Navegando al directorio de destino...
cd "%destino_path%\"

echo Proceso completado, ve a la carpeta Documentos/MiProyecto.
@pause
endlocal

