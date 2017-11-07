@echo OFF
::start /wait msiexec.exe /i %~dp0node-v6.11.5-x64.msi /L*V "%Temp%\nodejsv6.log
CD %~dp0
copy GekkoTU.lnk %USERPROFILE%\Desktop
CD %~dp0gekko-stable
CD gekko-stable
npm install --only=production
pause