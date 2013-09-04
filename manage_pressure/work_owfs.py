#!/usr/bin/env python
# - * - mode: python; coding: utf-8 - * -

# Copyright (C) 2013 Andrey Degtyarev <ad.dycost@gmail.com>

# This program is distributed licensed under the GNU General Public License v.3
# as published by the Free Software Foundation.

# device is dict, the keys of:
# "model" - name of the database associated with the device
# "file" - name and path of the file associated with the device


def read_data(device):
	file_device = open(device["file"], "r")
	res = file_device.read()
	file_device.close()
	return int(res);

def write_data(device, data):
	file_device = open(device["file"], "w")
	file_device.write(str(data))
	file_device.close()
