#!/bin/sh

jsonFile=$2

node > out_${jsonFile} <<EOF
var data = require('./${jsonFile}')

data.version = "$1";
console.log(JSON.stringify(data));

EOF

mv package.json package.json.old
mv out_package.json package.json

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
# composer network start --card PeerAdmin@hlfv1 --networkAdmin admin  --networkName pod --networkVersion $1 --networkAdminEnrollSecret adminpw  --file networkadmin.card
