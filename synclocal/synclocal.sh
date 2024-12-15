#!/bin/sh

# # #

echo "Starting 'spgdb' restore..."
mongorestore --uri="mongodb://spgdbuser:spgdbpassword@spgdb/production?authSource=admin" --drop --preserveUUID --gzip --archive="spg-backup-spgdb-20240718182644"
echo "Restore 'spgdb' complete!"
