# - * - mode: python; coding: utf-8 - * 

# Copyright (C) 2013 Andrey Degtyarev <ad.dycost@gmail.com>

# This program is distributed licensed under the GNU General Public License v.3
# as published by the Free Software Foundation.



from django.db import models

class Data_pressure_1(models.Model):
	data = models.DateTimeField()
	pressure = models.FloatField()

class Data_pressure_2(models.Model):
	data = models.DateTimeField()
	pressure = models.FloatField()
