@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  采购智能工具 - 本地服务启动中...
echo  目录: %CD%
echo.

where python >nul 2>&1
if errorlevel 1 (
  echo [错误] 未找到 Python，请先安装 Python 3
  echo 下载: https://www.python.org/downloads/
  pause
  exit /b 1
)

echo  服务地址: http://localhost:8080/index.html
echo  按 Ctrl+C 可停止服务
echo.

start "" "http://localhost:8080/index.html"
python -m http.server 8080
