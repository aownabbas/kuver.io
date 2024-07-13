#!/bin/bash
if [ "$DEPLOYMENT_GROUP_NAME" == "kuver_frontend_prod" ]
then
    cd /www/wwwroot/dashboard.kuver.io
fi
if [ "$DEPLOYMENT_GROUP_NAME" == "kuver_frontend_dev" ]
then
    cd /www/wwwroot/kuverfrontdev.tuitify.com
fi
if [ "$DEPLOYMENT_GROUP_NAME" == "kuver_frontend_prod" ]
then
    pm2 delete dashboard.kuver.io
    pm2 start npm --name dashboard.kuver.io -- run prod -p 3005
fi
if [ "$DEPLOYMENT_GROUP_NAME" == "kuver_frontend_dev" ]
then
    pm2 delete kuverfrontdev.tuitify.com
    pm2 start npm --name kuverfrontdev.tuitify.com -- run prod -p 3004
fi
