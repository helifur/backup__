#!/usr/bin/env bash

source ~/.config/scripts/env.sh

exec $WATCHER -a "$SWAYOSD_DAEMON" -d "$SWAYOSD_DIR" -p "swayosd-server"
