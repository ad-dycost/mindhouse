# - * - mode: python; coding: utf-8 - * 

# Copyright (C) 2013 Andrey Degtyarev <ad.dycost@gmail.com>

# This program is distributed licensed under the GNU General Public License v.3
# as published by the Free Software Foundation.



# var range_data is the time in second at which the data is sampled

from django.http import HttpResponse
import datetime, json, traceback, sys, manage_pressure.constants

def index(request):
	return HttpResponse("Hello, world. You're at the poll index.")

def data_send(request):
	range_data = json.loads(request.POST.keys()[0])[0]
	type_data = json.loads(request.POST.keys()[0])[1]
	obj_data = manage_pressure.constants.DEVICE_ID_MODELS_CONFORMITY[type_data]
	try:
		numder_data_range = float(range_data)
		min_data = datetime.datetime.now() - datetime.timedelta(seconds = numder_data_range)
		list_pressure = obj_data.objects.filter(data__gte = min_data)
		form_data = "%Y-%m-%dT%H:%M:%S"
		output = [[obj.data.strftime(form_data), obj.pressure] for obj in list_pressure]
		return HttpResponse(json.dumps(output))
	except:
		return HttpResponse("Wassu-u-u-up!!!!!")
		#return HttpResponse(request.POST.keys())
