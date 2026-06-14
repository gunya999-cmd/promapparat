# Encoding rules

All text files in this repository must be saved as UTF-8.

## Important for Windows PowerShell

Do not edit UTF-8 HTML/CSS/JS files with plain `Get-Content` / `Set-Content` in Windows PowerShell 5.1. It can corrupt Cyrillic text.

Use .NET UTF-8 read/write instead:

```powershell
$utf8 = New-Object System.Text.UTF8Encoding($false)
$path = "index.html"
$text = [System.IO.File]::ReadAllText((Resolve-Path $path), [System.Text.Encoding]::UTF8)
# modify $text here
[System.IO.File]::WriteAllText((Resolve-Path $path), $text, $utf8)
```

## Preferred encodings

- HTML: UTF-8, no BOM preferred.
- CSS: UTF-8, no BOM preferred.
- JS: UTF-8, no BOM preferred.
- Markdown: UTF-8, no BOM preferred.

## Why this file exists

The homepage has Cyrillic text. A previous PowerShell edit corrupted Russian text because the file was read/written with the wrong encoding. This rule must be checked before any future scripted edits.
