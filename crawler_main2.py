import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import re
import sqlite3
from datetime import datetime, timedelta
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
from selenium.webdriver.common.keys import Keys
from chrome_driver import slider_window, sleep_random_time, get_chrome_driver
import sys
import re

if __name__ == "__main__":
    url = "https://www.mnd.gov.tw/news/plaactlist"
    log_message, driver = get_chrome_driver(show=False)

    # Connecting to sqlite
    conn = sqlite3.connect('mydb.db')
    cursor = conn.cursor()

    # Creating table
    table = """CREATE TABLE IF NOT EXISTS "INFO" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "date" DATE NOT NULL,
    "day" INTEGER NOT NULL,
    "url" VARCHAR(255),
    "military_aircraft" INTEGER DEFAULT 0,
    "warship" INTEGER DEFAULT 0,
    "offical_ship" INTEGER DEFAULT 0,
    "balloon" INTEGER DEFAULT 0,
    "missile" INTEGER DEFAULT 0,
    "enter_warn" INTEGER DEFAULT 0,
    "preview_missile" VARCH(45),
    "content" TEXT
    );"""
    cursor.execute(table)
    driver.get(url)
    driver.implicitly_wait(10)
    sleep_random_time(t1=1, t2=2)
    slider_window(driver)
    class_elements = driver.find_elements(By.CLASS_NAME, 'news_list')
    urls = []
    for class_element in class_elements:
        try:
            url = class_element.get_attribute('href')
            urls.append(url)
        except:
            pass

    for url in urls:
        driver.delete_all_cookies()
        driver.get(url)
        driver.implicitly_wait(10)
        sleep_random_time(t1=1, t2=2)
        slider_window(driver)
        content = driver.find_element(By.CLASS_NAME, 'pagewrap1')
        text = content.text
        match = re.search(r"(\d{1,3}).(\d{1,2}).(\d{1,2})", text)
        if match:
            year, month, day = match.groups()
            year = int(year) + 1911
            date_string = f"{year}-{month}-{day}"
            date_object = datetime.strptime(date_string, "%Y-%m-%d")

            aircraft_pattern = re.findall(r'共機(\d+)架次', text)
            warship_pattern = re.findall(r'共艦(\d+)艘', text)
            official_ship_pattern = re.findall(r'公務船(\d+)艘', text)
            balloon_pattern = re.findall(r'中共空飄氣球計偵獲(\d+)顆', text)
            enter_warn_pattern = re.findall(r'空域(\d+)架', text)

            enter_warn_pattern2 = re.findall(r'逾越海峽中線(\d+)架', text)
            enter_warn_pattern3 = re.findall(r'逾越中線.*?(\d+)架', text)
            preview_missile_pattern = re.search(r'預於(\d{1,2})月(\d{1,2})日', text)
            if "臺海周邊海、空域活動_" in text:
                missile_total = 1
            elif "臺海周邊海、空域活動2" in text:
                missile_total = 1
            else:
                missile_total = 0

            # 轉為整數後加總
            if aircraft_pattern:
                total_aircraft = aircraft_pattern[0]
            else:
                total_aircraft = 0

            if warship_pattern:
                total_warship = warship_pattern[0]
            else:
                total_warship = 0

            if official_ship_pattern:
                total_official_ship = official_ship_pattern[0]
            else:
                total_official_ship = 0

            if balloon_pattern:
                total_balloon = balloon_pattern[0]
            else:
                total_balloon = 0

            if enter_warn_pattern:
                enter_warn_total = enter_warn_pattern[0]
            elif enter_warn_pattern2:
                enter_warn_total = enter_warn_pattern2[0]
            elif enter_warn_pattern3:
                enter_warn_total = enter_warn_pattern3[0]
            else:
                enter_warn_total = 0

            if preview_missile_pattern:
                m_month, m_day = preview_missile_pattern.groups()
                date2_string = f"{m_month}-{m_day}"
            else:
                date2_string = " "
            content2 = driver.find_element(By.XPATH, '//*[@id="main-content"]/div/div[1]')
            context_text = content2.text.replace('區域動態\n', '')
            print(context_text)
            print(
                "=== {}/{}/{} ===\n共機{}架次\n逾越:{}\n公務船{}艘\n共艦{}艘\n氣球{}顆\n".format(
                    year,
                    month,
                    day,
                    total_aircraft,
                    enter_warn_total,
                    total_official_ship,
                    total_warship,
                    total_balloon,
                )
            )
            # to select all column we will use
            statement = 'SELECT * FROM INFO WHERE date=\'{}\''.format(date_string)
            msg = 'INSERT INTO INFO (date, url, day, military_aircraft, warship, \
                offical_ship, balloon, missile, enter_warn, preview_missile, content) \
                VALUES (\'{}\', \'{}\', {}, {}, {}, {}, {}, {}, {}, \'{}\', \'{}\')'.format(date_string,
                                                                                url,
                                                                                date_object.weekday(),
                                                                                total_aircraft,
                                                                                total_warship,
                                                                                total_official_ship,
                                                                                total_balloon,
                                                                                missile_total,
                                                                                enter_warn_total,
                                                                                date2_string,
                                                                                text)
            print("共機{}架次\n逾越{}架次\n公務船{}艘\n共艦{}艘\n氣球{}顆".format(total_aircraft, enter_warn_total, 
                                                            total_official_ship, total_warship, total_balloon))
            print("{}飛彈經過台灣".format(missile_total))
            cursor.execute(statement)
            output = cursor.fetchmany(1)
            if (len(output) == 0):
                print("=== commit new {}===".format(date_string))
                print()
                cursor.execute(msg)
                conn.commit()
                print("=================================")
            else:
                print("pass: ", date_string)
                print("=================================")
                break
    driver.quit()
    conn.close()
