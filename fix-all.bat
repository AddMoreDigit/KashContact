@echo off
echo ========================================
echo  COMPLETE FIX FOR ADDMORE
echo ========================================

echo 1. Installing packages...
call npm install next-themes class-variance-authority react-day-picker

echo 2. Creating imports directory...
if not exist imports\figma\asset mkdir imports\figma\asset

echo 3. Creating placeholder images...
echo Creating 30 placeholder images...
for /l %%i in (1,1,30) do (
  echo placeholder > imports\figma\asset\image%%i.png
)

echo 4. Starting dev server...
call npm run dev

pause