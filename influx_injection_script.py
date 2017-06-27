import datetime
import random
import time
import os
import csv
from csv import reader
import argparse
from influxdb import client as influxdb


db = influxdb.InfluxDBClient(host='127.0.0.1',port = 8086, database = 'supply_data')

def read_data():
    with open('extern/supply_data.csv') as f:
        return [x.split(',') for x in f.readlines()[1:]]

a = read_data()

for metric in a:
    # print metric
    x = int(metric[0])*1000000000;
    #x = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(x))
    y = int(metric[1])
    influx_metric = [{
        'measurement': 'supply_data',
        'time': x,
        'tags': {
            's2_id_level': metric[2],
            's2_id' : metric[3],
            'vehicle_type' : metric[4]
            },
        'fields': {
            'unique_drivers' : int(metric[5].strip())
            }
        }
        ]
   # print influx_metric
    print db.write_points(influx_metric)