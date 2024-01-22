@echo off

echo Removendo NGINX...
SET SERVICENAME=NGINX
SET NSSM= %~dp0\..\nssm\nssm.exe


%NSSM% stop %SERVICENAME%
%NSSM% remove %SERVICENAME% confirm

pause
exit
