@ECHO OFF
call check.bat
set /p ask=Upload to S3 (y/n)? 
if %ask% == y (
	call doPush.bat
)
set /p gitdo=Push to git (y/n)? 
if %gitdo% == y (
	git add .
	set /p msg=Git commit message : 
	git commit -m "%msg%"
	git push
)