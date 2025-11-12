# -*- coding: utf-8 -*-
from flask import Flask, render_template, jsonify, request
from config import Config
from mock_data import MockData
import json
from datetime import datetime

app = Flask(__name__)
app.config.from_object(Config)

# 初始化模拟数据
mock_data = MockData()

@app.route('/')
def index():
    return render_template('index.html')

# API 路由 - 获取数据
@app.route('/api/diaries')
def get_diaries():
    return jsonify({
        'success': True,
        'data': mock_data.diaries
    })

@app.route('/api/reminders')
def get_reminders():
    return jsonify({
        'success': True,
        'data': mock_data.reminders
    })

@app.route('/api/photos')
def get_photos():
    return jsonify({
        'success': True,
        'data': mock_data.photos
    })

@app.route('/api/wishes')
def get_wishes():
    return jsonify({
        'success': True,
        'data': mock_data.wishes
    })

@app.route('/api/messages')
def get_messages():
    return jsonify({
        'success': True,
        'data': mock_data.messages
    })

# API 路由 - 添加数据（模拟）
@app.route('/api/diary', methods=['POST'])
def add_diary():
    data = request.json
    new_diary = {
        'id': len(mock_data.diaries) + 1,
        'title': data.get('title'),
        'content': data.get('content'),
        'author_id': 1,  # 模拟当前用户
        'author_name': '小明',
        'mood': data.get('mood', ''),
        'is_shared': True,
        'created_at': datetime.now().strftime('%Y-%m-%d %H:%M')
    }
    mock_data.diaries.insert(0, new_diary)
    return jsonify({'success': True, 'data': new_diary})

@app.route('/api/message', methods=['POST'])
def add_message():
    data = request.json
    new_message = {
        'id': len(mock_data.messages) + 1,
        'content': data.get('content'),
        'author_id': 1,
        'author_name': '小明',
        'created_at': '刚刚'
    }
    mock_data.messages.insert(0, new_message)
    return jsonify({'success': True, 'data': new_message})

if __name__ == '__main__':
    app.run(debug=True, port=5000)