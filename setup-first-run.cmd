@echo off
rem One-time setup: git init, GitHub repo, Pages, watcher.
cd /d "%~dp0"
if not exist .git git init -b main
git remote get-url origin >nul 2>&1 || git remote add origin https://github.com/JacobDSiler/irish-studies.git
where gh >nul 2>&1 && gh repo view JacobDSiler/irish-studies >nul 2>&1 || (where gh >nul 2>&1 && gh repo create JacobDSiler/irish-studies --public --source . --remote origin)
call push.cmd
where gh >nul 2>&1 && gh api -X POST repos/JacobDSiler/irish-studies/pages -f "source[branch]=main" -f "source[path]=/" >nul 2>&1
where gh >nul 2>&1 && gh api -X PUT repos/JacobDSiler/irish-studies/pages -f cname=irish.jacobsiler.com >nul 2>&1
call scripts\ir-start-watcher.cmd
echo Done. Add DNS: CNAME irish -^> jacobdsiler.github.io (DNS only).
pause
