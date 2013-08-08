#!/usr/bin/env python
# - * - mode: python; coding: utf-8 - * -

from manage_pressure.models import Data_pressure_1
import datetime, time, math

for i in xrange(20):
    ob = Data_pressure_1(data = datetime.datetime.now(), pressure = math.cos(i / math.pi))
    ob.save()
    time.sleep(1200)
