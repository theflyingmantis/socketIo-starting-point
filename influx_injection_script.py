import datetime
import random
import time
import os
import csv
from csv import reader
import argparse
from influxdb import client as influxdb


db = influxdb.InfluxDBClient(host='127.0.0.1',port = 8086, database = 'bigsupply')

def read_data():
    with open('supply_data.csv') as f:
        return [x.split(',') for x in f.readlines()[1:]]

a = read_data()

for metric in a:
    # print metric
    x = int(metric[0])
    y = int(metric[1])
    influx_metric = [{
        'measurement': 'supply_data',
        'time': x*100,
        'tags': {
            's2_id_level': metric[2],
            's2_id' : metric[3],
            'vehicle_type' : metric[4],
            'duration': y-x
            },
        'fields': {
            'end_time': y,
            'unique_drivers' : int(metric[5].strip())
            }
        }
        ]
   # print influx_metric
    print db.write_points(influx_metric)