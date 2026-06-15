#!/bin/bash
response=$(curl -s "https://no.krajtilak.in/api/no")
reason=$(echo "$response" | grep -o '"reason":"[^"]*' | cut -d'"' -f4)
echo "Excuse: $reason"