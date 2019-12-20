import schedule
import time

from listing import collect


print('Scraping data from tvguide.com')
collect()
schedule.every(20).minutes.do(collect)

while True:
    schedule.run_pending()
    time.sleep(1)
