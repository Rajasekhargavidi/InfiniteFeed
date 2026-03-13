# AI Generated Code by Deloitte + Cursor (BEGIN)
# Push Infinte to GitHub as private repo
# Run this after: gh auth login

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
Set-Location $PSScriptRoot

# Create private repo and push (if not exists)
gh repo create Rajasekhargavidi/Infinte --private --source=. --remote=origin --push
# AI Generated Code by Deloitte + Cursor (END)
