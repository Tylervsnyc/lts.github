#!/bin/bash

while true; do
    git add .
    git commit -m "Auto-update $(date)"
    git push origin main
    sleep 60  # Wait 60 seconds before checking again
done

