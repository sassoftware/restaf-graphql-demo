#!/usr/bin/env bash

# usage: register [-f flow] [-c clientId] [-s clientSecret] [-r redirect_url]
USAGE="Usage: register [-f flow] [-c clientId] [-s clientSecret] [-r redirect_url]"
logon_url=http://localhost

while getopts hf:c:s:r: o
do	case "$o" in
	f)	flow="$OPTARG";;
	c)	clientId="$OPTARG";;
	s)      clientSecret="$OPTARG";;
	r)      redirect_uri="$OPTARG";;
	h)	echo $USAGE;
		exit 0
		;;
	esac
done
echo BEGIN INPUT Parameters--------------------------------------------------
echo Registering in host=$HOSTNAME
# echo flow=$flow client_id=$client_id client_secret=$client_secret redirect_uri=$redirect_uri


if [[ (-z $flow) || (-z $clientId) ]]
then
echo "Require atleast flow and client_id. One or both missing"
exit 1
fi

ldata=" { \"client_id\": \"$clientId\", \
       \"scope\": [\"openid\", \"*\"],\
      \"resource_ids\": \"none\",\
      \"authorities\": [\"uaa.resource\"],\
      \"autoapprove\": true,\
      \"authorized_grant_types\": [\"$flow\"],\
      \"access_token_validity\": 864000,\
      \"use-session\": true"

if [ -z $clientSecret ]
then
echo "Note: No client secret specified"
else
ldata="$ldata ,\"client_secret\": \"$clientSecret\""
fi

if [ -z $redirect_uri ]
then
echo "Note: No redirect_uri specified"
else
ldata="$ldata ,\"redirect_uri\": [\"$redirect_uri\"]"
fi
ldata="$ldata}";



echo registerInformation=$ldata
echo END INPUT PARAMETERS ----------------------------------------------

#
# Now do the registeration
#

echo "Getting consul token..."
export CONSUL_TOKEN=$( cat /opt/sas/viya/config/etc/SASSecurityCertificateFramework/tokens/consul/default/client.token )
echo "consulToken=$CONSUL_TOKEN"


url1="${logon_url}/SASLogon/oauth/clients/consul?callback=false&serviceId=${clientId}";
adminToken_response=$(curl -X POST "${url1}" -H "X-Consul-Token: ${CONSUL_TOKEN}")
echo "** Waiting for administrator  token..."
while [[ $adminToken_response == "" ]]
do
  printf '...'
  sleep 5
done

export TOKEN=$(echo $adminToken_response | python -c "import json, sys;print json.load(sys.stdin)['access_token'];")
echo "adminToken=$TOKEN"

echo "Now registering the client"
curl -v -X POST "http://localhost/SASLogon/oauth/clients" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${TOKEN}" \
     -d "${ldata}"
echo "end of register script"


