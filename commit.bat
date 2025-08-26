@echo off
setlocal EnableDelayedExpansion

rem Prompt the user for the commit message
set /p "commit_message=Enter the commit message: "
echo Commit message entered: !commit_message!

echo.
echo What type is the issue?
echo 1: User Story
echo 2: Bug
echo 3: Testing
echo 4: Dev
set /p "issue_type=Enter the number corresponding to the issue type: "
echo Issue type selected: !issue_type!

rem Determine the emoji based on the user's input
if "!issue_type!"=="1" (
  set "emoji=🔠"
) else if "!issue_type!"=="2" (
  set "emoji=🐛"
) else if "!issue_type!"=="3" (
  set "emoji=🔬"
) else if "!issue_type!"=="4" (
  set "emoji=💻"
) else (
  echo Invalid choice, please commit again and enter a valid option.
  exit /b 1
)

rem Prepend the emoji to the commit message
set "final_message=!emoji! !commit_message!"
echo Final commit message: !final_message!

rem Run the git commit command with the final message
git commit -m "!final_message!"