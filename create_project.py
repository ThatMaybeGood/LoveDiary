# -*- coding: utf-8 -*-
import os
import sys


def create_project_structure():
    base_dir = "lovediary"

    # 定义目录结构
    dirs = [
        base_dir,
        f"{base_dir}/models",
        f"{base_dir}/templates",
        f"{base_dir}/static/css",
        f"{base_dir}/static/js",
        f"{base_dir}/static/images",
        f"{base_dir}/migrations",
        f"{base_dir}/utils"
    ]

    # 创建目录
    for dir_path in dirs:
        os.makedirs(dir_path, exist_ok=True)
        print(f"创建目录: {dir_path}")

    # 创建空文件
    files = [
        f"{base_dir}/app.py",
        f"{base_dir}/config.py",
        f"{base_dir}/mock_data.py",
        f"{base_dir}/requirements.txt",
        f"{base_dir}/models/__init__.py",
        f"{base_dir}/models/user.py",
        f"{base_dir}/models/diary.py",
        f"{base_dir}/templates/index.html",
        f"{base_dir}/static/css/style.css",
        f"{base_dir}/static/css/animations.css",
        f"{base_dir}/static/js/main.js",
        f"{base_dir}/static/js/modules.js",
        f"{base_dir}/utils/__init__.py"
    ]

    for file_path in files:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write('')
        print(f"创建文件: {file_path}")

    print("项目结构创建完成！")


if __name__ == "__main__":
    create_project_structure()