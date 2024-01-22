@ECHO OFF

SET SERVICENAME=servicelog-api
SET NSSM="%~dp0\nssm\nssm.exe"


ECHO INSTALLING SERVICE %SERVICENAME%

%NSSM% stop %SERVICENAME%
%NSSM% remove %SERVICENAME% confirm
%NSSM% install %SERVICENAME% %SERVICENAME%
%NSSM% set %SERVICENAME% Application %~dp0\nssm\run-console.bat
%NSSM% set %SERVICENAME% AppDirectory %~dp0\nssm\
%NSSM% set %SERVICENAME% Description "Servi‡o utilizado para gravar os logs dos testes realizados pelo AdvPR e TIR."
%NSSM% set %SERVICENAME% Start SERVICE_AUTO_START
%NSSM% set %SERVICENAME% AppStopMethodSkip 0
%NSSM% set %SERVICENAME% AppStopMethodConsole 0
%NSSM% set %SERVICENAME% AppStopMethodWindow 0
%NSSM% set %SERVICENAME% AppStopMethodThreads 0
%NSSM% set %SERVICENAME% AppThrottle 0
%NSSM% set %SERVICENAME% AppExit Default Ignore
%NSSM% set %SERVICENAME% AppRestartDelay 0
%NSSM% set %SERVICENAME% AppStdout %~dp0\..\logs\%SERVICENAME%.log
%NSSM% set %SERVICENAME% AppStderr %~dp0\..\logs\%SERVICENAME%.log
%NSSM% set %SERVICENAME% AppStdoutCreationDisposition 4
%NSSM% set %SERVICENAME% AppStderrCreationDisposition 4
%NSSM% set %SERVICENAME% AppRotateFiles 1
%NSSM% set %SERVICENAME% AppRotateOnline 0
%NSSM% set %SERVICENAME% AppRotateSeconds 3600
%NSSM% set %SERVICENAME% AppRotateBytes 524288

echo Servi‡o instalado com sucesso

pause
exit
