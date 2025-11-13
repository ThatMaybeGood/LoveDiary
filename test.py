"""
 # @Author  : Mine
 # @Date    : 2025/11/13 11:21
 # @File    : test.py
 # @Version : 1.0
 # @Description : 
"""""
from datetime import datetime, timedelta

print(type(datetime.now() + timedelta(days=15)), type(datetime.strptime('2023-09-15', '%Y-%m-%d')))

print((datetime.now() + timedelta(days=15)).strftime('%Y-%m-%d'),type((datetime.now() + timedelta(days=15)).strftime('%Y-%m-%d')))