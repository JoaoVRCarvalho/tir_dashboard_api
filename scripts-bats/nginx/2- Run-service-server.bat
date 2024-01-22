@echo off

echo Iniciando NGINX com sucesso...
SET SERVICENAME=NGINX
SET NSSM= %~dp0\..\nssm\nssm.exe

SC START %SERVICENAME%


pause
exit
