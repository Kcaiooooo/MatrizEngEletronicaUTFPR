import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=chrome_options)
driver.get("file://" + os.path.abspath("Skill tree Eletrica.html"))

# wait a bit for any initial console errors
time.sleep(2)

logs = driver.get_log('browser')
for log in logs:
    print(f"[{log['level']}] {log['message']}")

driver.quit()
