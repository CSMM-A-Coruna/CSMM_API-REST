import requests
import time

while True:
  time.sleep(0.001)
  res = requests.get('https://csmm-api.herokuapp.com/cluster')
  print(res.text)