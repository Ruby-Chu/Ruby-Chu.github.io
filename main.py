import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import re
import sqlite3
from datetime import datetime, timedelta

if __name__ == "__main__":
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

    for page in range(0, 13):
        print("page: {}".format(page + 1))
        if page == 0:
            url = "https://mna.mnd.gov.tw/news/information/"
        else:
            url = "https://mna.mnd.gov.tw/news/information/?PageIndex={}".format(page + 1)

        user_agent = UserAgent().random
        headers = {'User-Agent': user_agent}
        req = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(req.text, 'lxml')
        grid = soup.find('ul', attrs={'class': 'slider-grid lprt'})
        lis = grid.find_all('li')
        for l in lis:
            row1 = l.find('a')
            link = "https://mna.mnd.gov.tw" + row1['href']
            title_elem = l.find('div', attrs={'class': 'title'})
            summary_elem = l.find('div', attrs={'class': 'summary'})
            time_elem = l.find('span', attrs={'class': 'time'})

            if "國軍嚴密監控應處" in title_elem.text:
                match = re.search(r"民國(\d{1,3})年(\d{1,2})月(\d{1,2})日", time_elem.text)
                aircraft_pattern = re.findall(r'共機(\d+)架次', summary_elem.text)
                warship_pattern = re.findall(r'共艦(\d+)艘', summary_elem.text)
                official_ship_pattern = re.findall(r'公務船(\d+)艘', summary_elem.text)
                balloon_pattern = re.findall(r'氣球(\d+)顆', summary_elem.text)
                enter_warn_pattern = re.findall(r'空域(\d+)架次', summary_elem.text)
                preview_missile_pattern = re.search(r'預於(\d{1,2})月(\d{1,2})日', summary_elem.text)

                if "火箭飛行路徑經臺灣" in summary_elem.text:
                    missile_total = 1
                else:
                    missile_total = 0

                if match:
                    year, month, day = match.groups()
                    year = int(year) + 1911
                    date_string = f"{year}-{month}-{day}"
                    date_object = datetime.strptime(date_string, "%Y-%m-%d")  # + timedelta(days=-1)
                    content = summary_elem.text
                    print(date_string)
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
                    else:
                        enter_warn_total = 0

                    if preview_missile_pattern:
                        m_month, m_day = preview_missile_pattern.groups()
                        date2_string = f"{m_month}-{m_day}"
                    else:
                        date2_string = " "

                    msg = 'INSERT INTO INFO (date, url, day, military_aircraft, warship, \
                        offical_ship, balloon, missile, enter_warn, preview_missile, content) \
                        VALUES (\'{}\', \'{}\', {}, {}, {}, {}, {}, {}, {}, \'{}\', \'{}\')'.format(date_string,
                                                                                        link,
                                                                                        date_object.weekday(),
                                                                                        total_aircraft,
                                                                                        total_warship,
                                                                                        total_official_ship,
                                                                                        total_balloon,
                                                                                        missile_total,
                                                                                        enter_warn_total,
                                                                                        date2_string,
                                                                                        content)
                    # to select all column we will use
                    statement = 'SELECT date FROM INFO WHERE date=\'{}\''.format(date_string)

                    cursor.execute(statement)
                    output = cursor.fetchmany(1)
                    if (len(output) == 0):
                        print("commit new")
                        print("共機{}架次\n公務船{}艘\n共艦{}艘\n氣球{}顆".format(total_aircraft, total_official_ship,
                                                                                    total_warship, total_balloon))
                        print("{}飛彈經過台灣".format(missile_total))
                        cursor.execute(msg)
                        conn.commit()

                    # print("-----------------------------------------------------\n")
                else:
                    print("找不到符合的日期格式")
    # Commit your changes in
    # the database
    #

    # Closing the connection
    conn.close()
