@echo off
echo 创建情侣日记项目结构...

mkdir lovediary
cd lovediary

mkdir models templates static static\css static\js static\images migrations

type nul > app.py
type nul > config.py
type nul > requirements.txt
type nul > .env

cd models
type nul > __init__.py
type nul > user.py
type nul > diary.py
cd ..

cd templates
type nul > base.html
type nul > login.html
type nul > register.html
type nul > dashboard.html
type nul > diary.html
cd ..

cd static\css
type nul > style.css
cd ..\js
type nul > main.js
cd ..\..

echo 项目结构创建完成！
pause