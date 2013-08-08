# - * - mode: python; coding: utf-8 - * 

# Copyright (C) 2013 Andrey Degtyarev <ad.dycost@gmail.com>

# This program is distributed licensed under the GNU General Public License v.3
# as published by the Free Software Foundation.



# var range_data is the time in second at which the data is sampled

from django.http import HttpResponse
from manage_pressure.models import Data_pressure_1, Data_pressure_2
import datetime, json, traceback, sys

def index(request):
	return HttpResponse("Hello, world. You're at the poll index.")

def data_pressure_1(request):
	range_data = request.POST.keys()[0]
	try:
		numder_data_range = float(range_data)
		min_data = datetime.datetime.now() - datetime.timedelta(seconds = numder_data_range)
		list_pressure = Data_pressure_1.objects.filter(data__gte = min_data)
		form_data = "%Y-%m-%dT%H:%M:%S"
		output = [[obj.data.strftime(form_data), obj.pressure] for obj in list_pressure]
		return HttpResponse(json.dumps(output))
	except:
		return HttpResponse("Wassu-u-u-up!!!!!")
