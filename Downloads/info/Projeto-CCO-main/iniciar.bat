@echo off
REM Script para iniciar Frontend e Backend do Sistema CCO
REM Este script abre duas janelas de terminal

echo.
echo ========================================
echo   INICIANDO SISTEMA CCO
echo ========================================
echo.

REM Aguardar um pouco
timeout /t 2 /nobreak

REM Abrir terminal para Backend
echo Iniciando Backend (Node.js)...
start cmd /k "cd /d c:\Users\Sofia\Desktop\minhaBranch\Projeto-CCO\Downloads\Projeto-CCO-main (2)\Projeto-CCO-main\backend && npm run dev"

REM Aguardar backend iniciar
timeout /t 3 /nobreak

REM Abrir terminal para Frontend
echo Iniciando Frontend (React/Vite)...
start cmd /k "cd /d c:\Users\Sofia\Desktop\minhaBranch\Projeto-CCO\Downloads\Projeto-CCO-main (2)\Projeto-CCO-main && npm run dev"

echo.
echo ========================================
echo   SISTEMA INICIADO!
echo ========================================
echo.
echo Aguarde alguns segundos para ambos carregarem...
echo.
echo URLs:
echo   - Frontend: http://localhost:5173
echo   - Backend:  http://localhost:5000
echo.
echo Pressione Ctrl+C em cada terminal para parar
echo.
pause
