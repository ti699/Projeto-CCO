@echo off
REM Script para importar dados do GitHub para o banco local
set PGPASSWORD=sandra1907
set POSTGRES_USER=postgres
set DATABASE_NAME=sistema_cco
set SCHEMA_FILE=database\schema.sql
set DATA_FILE=database\dados-iniciais.sql

echo ========================================
echo CONFIGURAR BANCO COM DADOS DO GITHUB
echo ========================================
echo.
echo Este script ira:
echo 1. Criar as tabelas (se nao existirem)
echo 2. Importar todos os dados do GitHub
echo.
echo ATENCAO: Isso ira SUBSTITUIR os dados atuais!
echo.
set /p CONFIRM="Deseja continuar? (S/N): "

if /i not "%CONFIRM%"=="S" (
    echo Operacao cancelada.
    pause
    exit
)

echo.
echo Passo 1: Verificando tabelas...
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U %POSTGRES_USER% -d %DATABASE_NAME% -c "\dt" >nul 2>&1

if %errorlevel% neq 0 (
    echo Criando tabelas...
    "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U %POSTGRES_USER% -d %DATABASE_NAME% -f "%SCHEMA_FILE%"
)

echo.
echo Passo 2: Limpando dados existentes...
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U %POSTGRES_USER% -d %DATABASE_NAME% -c "TRUNCATE TABLE ocorrencia_anexos, ocorrencia_logs, ocorrencias, veiculos, tipos_quebra, clientes, usuarios RESTART IDENTITY CASCADE;"

echo.
echo Passo 3: Importando dados do GitHub...
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U %POSTGRES_USER% -d %DATABASE_NAME% -f "%DATA_FILE%"

if %errorlevel% equ 0 (
    echo.
    echo ✓ Dados importados com sucesso!
    echo.
    echo Seu banco esta sincronizado com o GitHub!
    echo.
) else (
    echo.
    echo ✗ Erro ao importar dados!
    echo.
)

pause
