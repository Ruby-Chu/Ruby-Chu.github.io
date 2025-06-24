import sqlite3
from datetime import datetime

if __name__ == "__main__":
    con = sqlite3.connect("mydb.db")
    cur = con.cursor()

    rows = cur.execute("SELECT * FROM INFO ORDER BY date desc limit 20")
    labels = []
    military = []
    warship = []
    offical_ship = []
    balloon = []
    missile = []
    enter_warn = []
    for row in rows:
        labels.append(row[1])
        military.append(row[4])
        warship.append(row[5])
        offical_ship.append(row[6])
        balloon.append(row[7])
        missile.append(row[8])
        enter_warn.append(row[9])

    fid = open("script_temp.js", "r",encoding="utf-8")
    # Perform operations on file_object
    s = fid.read()   
    str_labels = ', '.join('\''+v+'\'' for v in labels)
    s = s.replace('{date_temp}',"[" + str_labels +"]")
    str_military = ', '.join(str(v) for v in military)
    s = s.replace('{military_temp}',"[" + str_military +"]")
    str_warship = ', '.join(str(v) for v in warship)
    s = s.replace('{warship_temp}',"[" + str_warship +"]")
    # str_offical_ship = ', '.join(str(v) for v in offical_ship)
    # s = s.replace('{offical_ship_temp}',"[" + str_offical_ship +"]")
    str_balloon = ', '.join(str(v) for v in balloon)
    s = s.replace('{balloon_temp}',"[" + str_balloon +"]")
    # str_missile = ', '.join(str(v) for v in missile)
    # s = s.replace('{missile_temp}',"[" + str_missile +"]")
    # 統計
    if military[0] == 0:
        today_military_p = 0
        today_military_wp = 0
    else:
        today_military_p = round((military[0]/ military[0])*100,1)
        today_military_wp = round((enter_warn[0]/military[0])*100,1)
    s = s.replace('{today_military_p}', str(today_military_p))
    s = s.replace('{today_military_wp}', str(today_military_wp))
    
    rows2 = cur.execute("select * from INFO_COUNT limit 6")
    m_labels = []
    m_military = []
    m_warship = []
    m_offical_ship = []
    m_balloon = []
    m_missile = []
    m_enter_warn = []
    m_total = []
    for r in rows2:
        print(r)
        m_labels.append(r[0])
        m_military.append(r[3])
        m_enter_warn.append(r[8])
        m_warship.append(r[4])
        m_missile.append(r[7])
        m_total.append(r[9])
    
    str_m_labels = ', '.join('\''+v+'\'' for v in m_labels)
    s = s.replace('{m_labels_temp}',"[" + str_m_labels +"]")
    str_m_military = ', '.join(str(v) for v in m_military)
    s = s.replace('{m_military_temp}',"[" + str_m_military +"]")
    str_m_enter_warn = ', '.join(str(v) for v in m_enter_warn)
    s = s.replace('{m_enter_warn_temp}',"[" + str_m_enter_warn +"]")
    str_m_warship = ', '.join(str(v) for v in m_warship)
    s = s.replace('{m_warship_temp}',"[" + str_m_warship +"]")
    str_m_total = ', '.join(str(v) for v in m_total)
    s = s.replace('{m_total_temp}',"[" + str_m_total +"]")
    str_m_missile = ', '.join(str(v) for v in m_missile)
    s = s.replace('{m_missile_temp}',"[" + str_m_missile +"]")

    con.close()
    

    fid.close()
    
    fid2 = open("ObservationRoom/msg.js", "w",encoding="utf-8")
    fid2.write(s)
    fid2.close()

    fid3 = open("index_temp.html", "r",encoding="utf-8")
    s1 = fid3.read()
    s1 = s1.replace('{today}',str(labels[0]))
    s1 = s1.replace('{today_military}',str(military[0]))
    s1 = s1.replace('{today_warship}',str(warship[0]))
    s1 = s1.replace('{today_balloon}',str(balloon[0]))
    s1 = s1.replace('{today_missile}',str(missile[0]))

    s1 = s1.replace('{result}', "success")
    s1 = s1.replace('{warn_msg}', "無飛彈飛越警告")
    d1 = datetime.today().strftime('%Y%m%d%H%M%S')
    s1 = s1.replace('{version}',d1)
    
   


    fid3.close()
    fid4 =  open("ObservationRoom/index.html", "w",encoding="utf-8")
    fid4.write(s1)
    fid4.close()