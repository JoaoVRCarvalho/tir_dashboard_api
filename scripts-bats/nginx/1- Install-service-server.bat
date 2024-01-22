@ECHO OFF

echo Instalando NGINX no servidor 


SET SERVICE_NAME= NGINX
SET NSSM= %~dp0\..\nssm\nssm.exe


%NSSM% install %SERVICE_NAME% 

echo NGINX instalado como serviço com sucesso


pause
exit
