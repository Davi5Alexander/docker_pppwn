#!/bin/bash

INTERFACE=${INTERFACE}
FIRMWAREVERSION=${FIRMWAREVERSION}
SHUTDOWN=false
DIR="docker_pppwn-main/pppwn"

echo -e "\n\n\033[36m _____  _____  _____                 
|  __ \\|  __ \\|  __ \\
| |__) | |__) | |__) |_      ___ __
|  ___/|  ___/|  ___/\\ \\ /\\ / / '_ \\
| |    | |    | |     \\ V  V /| | | |
|_|    |_|    |_|      \\_/\\_/ |_| |_|\033[0m
\n\033[33mhttps://github.com/TheOfficialFloW/PPPwn\033[0m\n"

ip link set $INTERFACE down
sleep 5
ip link set $INTERFACE up
echo -e "\n\033[32mReady for console connection\033[92m\nFirmware:\033[94m $FIRMWAREVERSION\033[92m\nInterface:\033[94m $INTERFACE\033[0m\n"

while [ true ]
do
python3 $DIR/pppwn.py --interface=$INTERFACE --fw=$FIRMWAREVERSION --stage1=$DIR/stages/stage1_$FIRMWAREVERSION.bin --stage2=$DIR/stages/stage2_$FIRMWAREVERSION.bin <<EOF
EOF
ret=$?
if [ $ret -ge 1 ]
   then
        echo -e "\033[31m\nFailed retrying...\033[0m\n"
		ip link set $INTERFACE down
		sleep 5
		ip link set $INTERFACE up
   else
        echo -e "\033[32m\nConsole PPPwned! \033[0m\n"
		ip link set $INTERFACE down
		if [ $SHUTDOWN = true ] ; then
			poweroff
		fi
        exit 1
fi
done