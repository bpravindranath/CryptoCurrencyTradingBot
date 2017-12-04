@echo OFF
echo CD %~dp0gekko-stable\gekko-stable
start cmd /k call web.bat
node gekko --ui


