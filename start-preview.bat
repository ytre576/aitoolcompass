@echo off
cd /d "%~dp0"
echo AI Tool Compass local preview
echo.
echo Open this URL in your browser:
echo http://127.0.0.1:8088/index.html
echo.
echo Keep this window open while previewing the website.
echo Press Ctrl+C to stop the server.
echo.
python -m http.server 8088 --bind 127.0.0.1
