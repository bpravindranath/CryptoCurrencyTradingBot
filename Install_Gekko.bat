@echo OFF

SET PRODUCTKEY=HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall
REG QUERY %PRODUCTKEY%\{A6606125-61E2-43C3-BFCF-0E571EC56656}
if errorlevel 1 goto :doit
if errorlevel 0 goto :exit
 
:doit
    start /wait msiexec.exe /i %~dp0node-v6.11.5-x64.msi /L*V "%Temp%\nodejsv6.log
    goto :exit

:exit
set SCRIPT="%TEMP%\%RANDOM%-%RANDOM%-%RANDOM%-%RANDOM%.vbs"

echo Set oWS = WScript.CreateObject("WScript.Shell") >> %SCRIPT%
echo sLinkFile = "%USERPROFILE%\Desktop\GekkoTU.lnk" >> %SCRIPT%
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%
echo oLink.TargetPath = "%~dp0Run_Gekko.bat" >> %SCRIPT%
echo oLink.WorkingDirectory = "%~dp0gekko-stable\gekko-stable\" >> %SCRIPT%
echo oLink.IconLocation = "%~dp0gekko-stable\gekko-stable\GekkoTU_Icon.ico" >> %SCRIPT%
echo oLink.Save >> %SCRIPT%

cscript /nologo %SCRIPT%
del %SCRIPT%

CD %~dp0gekko-stable\gekko-stable
npm install --only=production
pause