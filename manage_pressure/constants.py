# - * - mode: python; coding: utf-8 - * 

# Copyright (C) 2013 Andrey Degtyarev <ad.dycost@gmail.com>

# This program is distributed licensed under the GNU General Public License v.3
# as published by the Free Software Foundation.

from manage_pressure.models import *

FILE_DEVICE_P1 = ""
FILE_DEVICE_P2 = ""
FILE_DEVICE_M1 = ""

P_CRIT = 0.1
P_MIN = 2
P_MAX = 5

TIME_REQUEST_DEVICE = 5.

DEVICE_ID_CONFORMITY = {
"p1": {"model": Data_pressure_1, "file": FILE_DEVICE_P1}, \
"p2": {"model": Data_pressure_2, "file": FILE_DEVICE_P2}, \
"m1": {"model": Data_motor, "file": FILE_DEVICE_M1}
}
