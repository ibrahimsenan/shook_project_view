#!/bin/sh

# Prompt the user for the commit message
read -p "Enter the commit message: " commit_message

# Prompt the user for the type of issue
echo "What type is the issue?"
echo "1: User Story"
echo "2: Bug"
echo "3: Testing"
echo "4: Dev"
read -p "Enter the number corresponding to the issue type: " issue_type

# Determine the emoji based on the user's input
case $issue_type in
  1)
    emoji="🔠"
    ;;
  2)
    emoji="🐛"
    ;;
  3)
    emoji="🔬"
    ;;
  4)
    emoji="💻"
    ;;
  *)
    echo "Invalid choice, please commit again and enter a valid option."
    exit 1
    ;;
esac

# Prepend the emoji to the commit message
final_message="${emoji} ${commit_message}"

# Run the git commit command with the final message
git commit -m "$final_message"
