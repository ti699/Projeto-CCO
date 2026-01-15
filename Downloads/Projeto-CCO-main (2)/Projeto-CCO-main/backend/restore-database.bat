@echo off
REM Script para restaurar backup do banco de dados PostgreSQL
REM Configurações
set PGPASSWORD=sandra1907
set POSTGRES_USER=postgres
set DATABASE_NAME=sistema_cco

echo ========================================
echo RESTAURAR BACKUP DO BANCO DE DADOS
echo ========================================
echo.
echo Selecione o arquivo de backup (.sql) que deseja restaurar
echo ou arraste o arquivo para esta janela e pressione ENTER:
echo.

set /p BACKUP_FILE="Caminho do arquivo: "

if not exist "%BACKUP_FILE%" (
    echo.
    echo ✗ Arquivo não encontrado!
    echo.
    pause
    exit
)

echo.
echo ATENÇÃO: Esta operação irá SUBSTITUIR todos os dados atuais!
echo.
set /p CONFIRM="Deseja continuar? (S/N): "

if /i not "%CONFIRM%"=="S" (
    echo Operação cancelada.
    pause
    exit
)

echo.
echo Restaurando backup...
echo.

"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U %POSTGRES_USER% -d %DATABASE_NAME% -f "%BACKUP_FILE%"

if %errorlevel% equ 0 (
    echo.
    echo ✓ Backup restaurado com sucesso!
    echo.
) else (
    echo.
    echo ✗ Erro ao restaurar backup!
    echo.
)

pause
