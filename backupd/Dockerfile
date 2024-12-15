FROM mongo:latest

WORKDIR /backupd

COPY . .

RUN chmod +x backupd.sh spgdb.sh

CMD ["sh", "backupd.sh"]