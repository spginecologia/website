#!/bin/sh

# # #

echo "Starting 'spgdb' restore..."
mongorestore --uri="mongodb://spgdbuser:spgdbpassword@spgdb/production?authSource=admin" --drop --preserveUUID --gzip --archive="./seeds/spg-backup-spgdb-20250712130745"
echo "Restore 'spgdb' complete!"
