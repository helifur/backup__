#!/usr/bin/env bash

if [[ $(pidof pavucontrol) ]]; then
    pkill pavucontrol
fi

exec pavucontrol
