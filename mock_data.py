# -*- coding: utf-8 -*-
from datetime import datetime, timedelta


class MockData:
    users = [
        {
            'id': 1,
            'username': '小明',
            'email': 'xiaoming@example.com',
            'avatar': '👦'
        },
        {
            'id': 2,
            'username': '小美',
            'email': 'xiaomei@example.com',
            'avatar': '👧'
        }
    ]

    diaries = [
        {
            'id': 1,
            'title': '在一起的第300天',
            'content': '今天是我们在一起的第300天！他偷偷准备了惊喜晚餐，还送了我一直想要的那条项链。虽然工作很忙，但他总是能记得这些重要的日子，让我感到特别幸福。',
            'author_id': 2,
            'author_name': '小美',
            'mood': '幸福',
            'is_shared': True,
            'created_at': (datetime.now() - timedelta(days=5)).strftime('%Y-%m-%d %H:%M')
        },
        {
            'id': 2,
            'title': '爬山的美好回忆',
            'content': '今天和她一起去爬山了，虽然很累，但山顶的风景真的太美了。她累得走不动的时候，我背了她一段路，她在我耳边轻轻说"有你真好"，那一刻感觉所有的疲惫都值得了。',
            'author_id': 1,
            'author_name': '小明',
            'mood': '甜蜜',
            'is_shared': True,
            'created_at': (datetime.now() - timedelta(days=10)).strftime('%Y-%m-%d %H:%M')
        }
    ]

    reminders = [
        {
            'id': 1,
            'title': '相识纪念日',
            # 'date': (datetime.now() + timedelta(days=15)).strftime('%Y-%m-%d'),
            'date': '2024-03-15',
            'days_left': 30,
            'type': 'anniversary'
        },
        {
            'id': 2,
            'title': '她的生日',
            'date': '2024-08-06',
            'days_left': 60,
            'type': 'birthday'
        }
    ]

    photos = [
        {
            'id': 1,
            'url': 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46',
            'caption': '第一次旅行 - 2023年5月',
            'uploaded_by': 1
        },
        {
            'id': 2,
            'url': 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46',
            'caption': '生日惊喜 - 2023年3月',
            'uploaded_by': 2
        }
    ]

    wishes = [
        {
            'id': 1,
            'title': '无线耳机',
            'description': '运动时使用，希望是降噪的',
            'price_range': '500-1000元',
            'priority': '高',
            'author_id': 1
        },
        {
            'id': 2,
            'title': '情侣手链',
            'description': '简约风格，可以刻字的那种',
            'price_range': '200-500元',
            'priority': '中',
            'author_id': 2
        }
    ]

    messages = [
        {
            'id': 1,
            'content': '早安！今天天气真好，晚上一起去新开的那家餐厅试试吗？',
            'author_id': 1,
            'author_name': '小明',
            'created_at': '今天 09:15'
        },
        {
            'id': 2,
            'content': '好呀！我下班比较早，可以先去占位置。记得多穿点，晚上可能会凉。',
            'author_id': 2,
            'author_name': '小美',
            'created_at': '今天 09:20'
        }
    ]