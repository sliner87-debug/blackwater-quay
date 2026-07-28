@echo off
echo Starting Wake-AI-Server...
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Wake-AI-Server.ps1"
if %errorlevel% neq 0 (
    echo.
    echo PowerShell script exited with an error.
)
pause
