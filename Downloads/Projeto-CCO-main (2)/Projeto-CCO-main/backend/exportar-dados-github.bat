@echo off
REM Script para exportar dados atuais do banco para versionar no GitHub
set PGPASSWORD=sandra1907
set POSTGRES_USER=postgres
set DATABASE_NAME=sistema_cco
set OUTPUT_FILE=database\dados-iniciais.sql

echo ========================================
echo EXPORTAR DADOS PARA GITHUB
echo ========================================
echo.
echo Este script exporta os dados atuais do banco
echo para o arquivo que sera versionado no GitHub.
echo.
echo Banco: %DATABASE_NAME%
echo Destino: %OUTPUT_FILE%
echo.

"C:\Program Files\PostgreSQL\18\bin\pg_dump.exe" -U %POSTGRES_USER% -d %DATABASE_NAME% --data-only --inserts -f "%OUTPUT_FILE%"

if %errorlevel% equ 0 (
    echo.
    echo ✓ Dados exportados com sucesso!
    echo.
    echo Arquivo criado: %OUTPUT_FILE%
    echo.
    echo Proximo passo:
    echo 1. git add backend/database/dados-iniciais.sql
    echo 2. git commit -m "Atualizar dados do sistema"
    echo 3. git push
    echo.
) else (
    echo.
    echo ✗ Erro ao exportar dados!
    echo.
)

pause
