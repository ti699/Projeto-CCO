@echo off
REM Script para backup do banco de dados PostgreSQL
REM Configurações
set PGPASSWORD=sandra1907
set POSTGRES_USER=postgres
set DATABASE_NAME=sistema_cco
set BACKUP_DIR=backup
set TIMESTAMP=%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set BACKUP_FILE=%BACKUP_DIR%\backup_%TIMESTAMP%.sql

REM Criar diretório de backup se não existir
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo ========================================
echo BACKUP DO BANCO DE DADOS SISTEMA CCO
echo ========================================
echo.
echo Iniciando backup...
echo Banco: %DATABASE_NAME%
echo Arquivo: %BACKUP_FILE%
echo.

REM Executar backup
"C:\Program Files\PostgreSQL\18\bin\pg_dump.exe" -U %POSTGRES_USER% -d %DATABASE_NAME% -f "%BACKUP_FILE%"

if %errorlevel% equ 0 (
    echo.
    echo ✓ Backup concluído com sucesso!
    echo Arquivo salvo em: %BACKUP_FILE%
    echo.
) else (
    echo.
    echo ✗ Erro ao criar backup!
    echo.
)

pause
