#/usr/bin/python
# -*- coding: utf-8 -*-

# Copyright (C) 2013 Andrey Degtyarev <ad.dycost@gmail.com>

# This program is distributed licensed under the GNU General Public License v.3
# as published by the Free Software Foundation.



import os, sys

# В python path добавляется директория проекта
dn = os.path.dirname
PROJECT_ROOT = os.path.abspath( dn(dn(__file__)) )

DJANGO_PROJECT_ROOT = os.path.join(PROJECT_ROOT, '')
sys.path.append(DJANGO_PROJECT_ROOT)

# Установка файла настроек
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

#import admin
# Запуск wsgi-обработчика
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
