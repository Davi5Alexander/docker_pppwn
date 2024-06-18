#!/bin/bash

exec > >(tee /var/www/html/hack.log) 2>&1 
INTERFACE=${INTERFACE}
FIRMWAREVERSION=${FIRMWAREVERSION}
SHUTDOWN=false
PPPOECONN="${PPPOECONN:-false}"
DIR="pppwn"

echo -e '\033[38;5;25m                    ##        .            
              ## ## ##       ==            
           ## ## ## ##      ===            
       /""""""""""""""""\\___/ ===        
  \033[0m~~~ \033[38;5;25m{\033[0m~~ ~~~~ ~~~ ~~~~ ~~ ~ \033[38;5;25m/  ===- \033[0m ~~~\033[38;5;25m
       \\______ \033[0mo\033[38;5;25m          __/            
         \\    \\        __/             
          \\____\\______/';

echo -e "\033[38;5;27m  ___          _             ___ ___ ___             
 |   \ ___  __| |_____ _ _  | _ | _ | _ \_ __ ___ _  
 | |) / _ \/ _| / / -_| '_| |  _|  _|  _\ V  V | ' \ 
 |___/\___/\__|_\_\___|_|   |_| |_| |_|  \_/\_/|_||_|";

# ip link set $INTERFACE down
# sleep 5
# ip link set $INTERFACE up
echo -e "\n\033[32mReady for console connection
\033[0mFirmware:\033[38;5;27m $FIRMWAREVERSION
\033[0mInterface:\033[38;5;27m $INTERFACE\033[0m\n"

while [ true ]
do
python3 $DIR/pppwn.py --interface=$INTERFACE --fw=$FIRMWAREVERSION --stage1=$DIR/stages/stage1_$FIRMWAREVERSION.bin --stage2=$DIR/stages/stage2_$FIRMWAREVERSION.bin <<EOF
EOF
ret=$?
if [ $ret -ge 1 ]
   then
		echo -e "\033[31m\nFailed retrying...\033[0m\n"
		supervisorctl restart pppwn
	else
		echo -e "\033[32m\nConsole PPPwned! \033[0m\n"
		ip link set $INTERFACE down
		ip link set $INTERFACE up
		if [ $SHUTDOWN = true ] ; then
			poweroff
		else
			if [ $PPPOECONN = true ] ; then
				echo -e "\033[92mInternet Access:\033[93m Enabled\033[0m"
				$DIR/pppoe.sh
			fi
		fi
		exit 1
fi
done