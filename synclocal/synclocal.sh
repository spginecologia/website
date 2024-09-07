#!/bin/sh

# # #

echo "Starting 'websitedb' restore..."
mongorestore --uri="mongodb://websitedbuser:websitedbpassword@websitedb/production?authSource=admin" --drop --preserveUUID --gzip --archive="spg-backup-websitedb-20240718182644"
echo "Restore 'websitedb' complete!"
