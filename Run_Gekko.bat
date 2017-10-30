@echo OFF
CD %~dp0gekko-stable\gekko-stable
start cmd /k call web.bat
node gekko --ui
^c


