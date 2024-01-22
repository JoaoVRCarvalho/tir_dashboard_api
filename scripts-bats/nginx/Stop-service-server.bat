@echo off

echo Parando NGINX como serviço...
SET SERVICENAME=NGINX
SET NSSM= %~dp0\..\nssm\nssm.exe


%NSSM% stop %SERVICENAME%


pause
exit
