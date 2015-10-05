@ECHO OFF
call check.bat
set /p ask=Upload to S3 (y/n)? 
if %ask% == y (
	call doPush.bat
)