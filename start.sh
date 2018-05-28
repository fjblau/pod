#!/bin/sh

jsonFile=package.json

node > out_${jsonFile} <<EOF
var data = require('./${jsonFile}')
data.version = "$1";
console.log(JSON.stringify(data));
EOF

rm package.json
mv out_package.json package.json

git remote set-url origin git@github.com:fjblau/pod.git
git add *
git commit -m 'update version'
git push origin master

git pull https://github.com/fjblau/pod.git

archiveFile="pod@$1.bna"

bash ~/fabric-dev-servers/startFabric.sh

composer archive create -t dir -n .
composer network install -c PeerAdmin@hlfv1 -a $archiveFile
composer network start --card PeerAdmin@hlfv1 --networkAdmin admin  --networkName pod --networkVersion "$1" --networkAdminEnrollSecret adminpw  --file networkadmin.card

composer-rest-server -c admin@pod -n never -w true
