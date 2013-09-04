#!/usr/bin/env python
# - * - mode: python; coding: utf-8 - * -

# Copyright (C) 2013 Andrey Degtyarev <ad.dycost@gmail.com>

# This program is distributed licensed under the GNU General Public License v.3
# as published by the Free Software Foundation.

import manage_pressure.constants, manage_pressure.work_device, time

def control(motor_id, pressure_1_id,  pressure_2_id):
	devices = manage_pressure.work_device.WorkDevice(motor_id, pressure_1_id,  pressure_2_id)
	while 1:
		devices.check()
		devices.action()
		time.sleep(manage_pressure.constants.TIME_REQUEST_DEVICE)
