#!/bin/sh
for i in $(seq 1 30); do
  /opt/mssql-tools/bin/sqlcmd -S $DB_SERVER -U $DB_USER -P $DB_PASSWORD -Q "SELECT 1" -C
  if [ $? -eq 0 ]; then
    echo "SQL Server está listo para la app."
    break
  else
    echo "Esperando a SQL Server para la app... ($i/30)"
    sleep 3
  fi
done
exec node server.js