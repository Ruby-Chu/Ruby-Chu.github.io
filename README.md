# Ruby-Chu.github.io


DROP VIEW INFO_COUNT;
```sql
CREATE VIEW INFO_COUNT AS
SELECT strftime('%Y-%m', date) AS "year_month",
strftime('%Y', date) AS "year",
strftime('%m', date) AS "month",
sum(military_aircraft) as total_military_aircraft,
sum(warship) as total_warship,
sum(offical_ship) as total_offical_ship,
sum(balloon) as total_balloon,
sum(missile) as total_missile,
sum(enter_warn) as total_enter_warn
FROM INFO GROUP BY strftime("%Y-%m", date) ORDER BY strftime("%Y-%m", date) DESC
```