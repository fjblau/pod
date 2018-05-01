#!/bin/sh

git add *
git commit -m 'update version'
git push origin master

git pull https://github.com/fjblau/pod.git

archiveFile="pod@$1.bna"

composer archive create -t dir -n .
composer network install -c peerAdmin@hlfv1 -a $archiveFile
composer network upgrade -c peeradmin@hlfv1 -n pod -V $1
composer-rest-server -c admin@pod -n never -w true

# Fresh Install Only
# composer network install -c PeerAdmin@hlfv1  -a pod.bna
# composer network start --card PeerAdmin@hlfv1 --networkAdmin admin  --networkName pod --networkVersion $1 --networkAdminEnrollSecret adminpw  --file networkadmin.card
