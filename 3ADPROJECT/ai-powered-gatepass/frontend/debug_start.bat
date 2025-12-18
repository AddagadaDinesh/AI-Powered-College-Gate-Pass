@echo off
echo STARTING DEBUG > debug_status.txt
node -v >> debug_status.txt
npm start > debug_output.txt 2>&1
echo DONE >> debug_status.txt
