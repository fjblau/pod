#!/bin/sh


composer archive create -t dir -n .
composer network install -c peerAdmin@hlfv1 -a pod@0.0.5.bna
composer network upgrade -c peeradmin@hlfv1 -n pod -V 0.0.5
# Install networkadmin card with name admin
composer-rest-server -c admin@pod -n never -w true

# Fresh Install Only
# composer network install -c PeerAdmin@hlfv1  -a pod.bna
# composer network start --card PeerAdmin@hlfv1 --networkAdmin admin  --networkName pod --networkVersion 0.0.5 --networkAdminEnrollSecret adminpw  --file networkadmin.card
