@echo off

echo Parando API de serviço
cd ../
SC STOP servicelog-api

pause
exit
