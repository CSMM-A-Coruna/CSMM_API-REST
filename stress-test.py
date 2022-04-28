import requests
import time

while True:
  time.sleep(0.001)
  res = requests.get('https://csmm-api.herokuapp.com/v1/comms/received?user_id=3')
  print(res)