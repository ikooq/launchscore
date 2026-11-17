# VHS tape — https://github.com/charmbracelet/vhs
# Render: vhs launch/demo.tape

Output launch/demo.gif

Set Shell "bash"
Set FontSize 22
Set Width 1200
Set Height 640
Set Padding 24
Set Theme "Catppuccin Mocha"
Set TypingSpeed 45ms

# Hidden setup (cd, env, clean state)
Hide
Type "cd /tmp && clear"
Enter
Show

# --- The aha moment: replace with your commands ---
Type "npx your-tool init"
Sleep 400ms
Enter
Sleep 3s

Type "your-tool run"
Enter
Sleep 4s
# --------------------------------------------------

# Hold on the result so viewers can read it
Sleep 3s
