#!/bin/bash
if [ "$DEPLOYMENT_GROUP_NAME" == "kuver_frontend_prod" ]
then
    cd /www/wwwroot/dashboard.kuver.io
fi
if [ "$DEPLOYMENT_GROUP_NAME" == "kuver_frontend_dev" ]
then
    cd /www/wwwroot/kuverfrontdev.tuitify.com
fi
shopt -s extglob
rm -rf !(@( ".user.ini" ))
find ./ -type f -not \( -name '.user.ini' \) -delete
