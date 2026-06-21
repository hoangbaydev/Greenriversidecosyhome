# Opens Firebase Console and copies firestore.rules to clipboard (Windows)
$project = "green-riverside-cosy-home"
$rulesPath = Join-Path $PSScriptRoot "..\firestore.rules"
$storagePath = Join-Path $PSScriptRoot "..\storage.rules"

Write-Host ""
Write-Host "=== Deploy Firestore Rules (manual) ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Firestore rules will be copied to your clipboard."
Write-Host "2. Browser will open Firebase Console."
Write-Host "3. Paste rules, click Publish."
Write-Host "4. Repeat for Storage rules (storage.rules)."
Write-Host ""

if (Test-Path $rulesPath) {
  Get-Content $rulesPath -Raw | Set-Clipboard
  Write-Host "Copied firestore.rules to clipboard." -ForegroundColor Green
} else {
  Write-Host "firestore.rules not found at $rulesPath" -ForegroundColor Red
}

Start-Process "https://console.firebase.google.com/project/$project/firestore/rules"
Write-Host "Opened Firestore Rules in browser."
Write-Host ""
Write-Host "After publishing Firestore rules, open Storage rules:"
Write-Host "https://console.firebase.google.com/project/$project/storage/rules"
Write-Host ""
Write-Host "Storage rules file: $storagePath"
Write-Host ""
Write-Host "Or use CLI after login: npm run firebase:login && npm run firebase:deploy"
