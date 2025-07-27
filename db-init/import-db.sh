#!/bin/bash

SQLCMD="/opt/mssql-tools/bin/sqlcmd"
SQL_FILE="/scripts/BDD-polimusic-mscanciones.sql"
SERVER="db"
USER="SA"
PASSWORD="Politecnica1"

echo "Esperando a que SQL Server esté listo..."
for i in {1..30}; do
  $SQLCMD -S $SERVER -U $USER -P $PASSWORD -Q "SELECT 1" -C
  if [ $? -eq 0 ]; then
    echo "SQL Server está listo."
    break
  else
    echo "Esperando... ($i/30)"
    sleep 3
  fi
done

echo "Ejecutando script de base de datos..."
$SQLCMD -S $SERVER -U $USER -P $PASSWORD -C -i $SQL_FILE