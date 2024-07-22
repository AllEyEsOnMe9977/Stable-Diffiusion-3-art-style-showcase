@echo off
:: Start the Node.js server
start /B node server.js

:: Wait a few seconds to ensure the server starts
timeout /t 1 /nobreak >nul

:: Open the browser to the specified URL
start http://localhost:3000/

:: Optional: You can use `exit` to close the command prompt window if it's not needed
:: exit