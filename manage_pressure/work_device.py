#!/usr/bin/env python
# - * - mode: python; coding: utf-8 - * -

# Copyright (C) 2013 Andrey Degtyarev <ad.dycost@gmail.com>

# This program is distributed licensed under the GNU General Public License v.3
# as published by the Free Software Foundation.

import manage_pressure.constants, manage_pressure.work_owfs


class WorkDevice:

	def __init__(self, motor_id, pressure_1_id,  pressure_2_id):
		'''Initialization of device.
		All device has the following attributes:
		"model" - name of the database associated with the device
		"file" - name and path of the file associated with the device'''
		self.motor = manage_pressure.constants.DEVICE_ID_CONFORMITY[motor_id]
		self.pressure_1 = manage_pressure.constants.DEVICE_ID_CONFORMITY[pressure_1_id]
		self.pressure_2 = manage_pressure.constants.DEVICE_ID_CONFORMITY[pressure_2_id]

	def check(self):
		self.motor_stat = manage_pressure.work_owfs.read_data(self.motor)
		self.pressure_1_stat = int(manage_pressure.work_owfs.read_data(self.pressure_1) >= manage_pressure.constants.P_CRIT)
		self.pressure_2_stat = int(manage_pressure.work_owfs.read_data(self.pressure_2) >= manage_pressure.constants.P_MIN and manage_pressure.work_owfs.read_data(self.pressure_2) <= manage_pressure.constants.P_MAX)
		if self.pressure_2_stat == 0:
			if manage_pressure.work_owfs.read_data(self.pressure_2) > manage_pressure.constants.P_MAX:
			self.pressure_2_stat = 2

	def start(self):
		manage_pressure.work_owfs.write_data(self.motor, 1)

	def stop(self):
		manage_pressure.work_owfs.write_data(self.motor, 0)

	def action(self):
		if self.pressure_2_stat == 1 and self.motor_stat == 0:
			pass
		elif self.pressure_2_stat == 0 and self.pressure_1_stat == 0:
			pass
		elif self.pressure_2_stat == 0 and self.pressure_1_stat == 1:
			self.start():
		elif self.pressure_2_stat == 2:
			self.stop():
