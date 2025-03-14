#!/bin/bash

# Number of records to generate
NUM_RECORDS=100

# Arrays for generating names
FIRST_NAMES=("john" "jane" "michael" "sarah" "david" "emma" "james" "olivia" "william" "sophia")
LAST_NAMES=("smith" "johnson" "williams" "brown" "jones" "garcia" "miller" "davis" "rodriguez" "martinez")
DOMAINS=("gmail.com" "yahoo.com" "hotmail.com" "outlook.com" "example.com" "mail.com")

# Area codes for US phone numbers
AREA_CODES=("201" "202" "212" "213" "301" "302" "303" "304" "305" "310" "312" "313" "314" "315")

# Output file
OUTPUT_FILE="contacts.csv"

# Create header
echo "email,phone_number" > "$OUTPUT_FILE"

# Generate records
for ((i=1; i<=$NUM_RECORDS; i++)); do
    # Get random names and domain
    first_name=${FIRST_NAMES[$RANDOM % ${#FIRST_NAMES[@]}]}
    last_name=${LAST_NAMES[$RANDOM % ${#LAST_NAMES[@]}]}
    domain=${DOMAINS[$RANDOM % ${#DOMAINS[@]}]}
    
    # Generate random number for uniqueness in email
    random_num=$((RANDOM % 999))
    
    # Create email with different patterns
    case $((RANDOM % 4)) in
        0) email="${first_name}.${last_name}${random_num}@${domain}";;
        1) email="${first_name}${random_num}@${domain}";;
        2) email="${first_name:0:1}${last_name}${random_num}@${domain}";;
        3) email="${last_name}.${first_name}${random_num}@${domain}";;
    esac
    
    # Generate phone number
    area_code=${AREA_CODES[$RANDOM % ${#AREA_CODES[@]}]}
    prefix=$((RANDOM % 900 + 100))  # Generates number between 100-999
    line=$((RANDOM % 9000 + 1000))  # Generates number between 1000-9999
    phone="+1-${area_code}-${prefix}-${line}"
    
    # Convert email to lowercase using tr and append both email and phone to file
    echo "$(echo "$email" | tr '[:upper:]' '[:lower:]'),${phone}" >> "$OUTPUT_FILE"
done

echo "Generated $NUM_RECORDS contacts in $OUTPUT_FILE" 