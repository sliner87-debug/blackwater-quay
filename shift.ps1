for ($i=20; $i -ge 10; $i--) {
    $next = $i+1
    $currStr = "{0:D2}" -f $i
    $nextStr = "{0:D2}" -f $next
    $filePath = "Chapter$currStr-New.md"
    $newPath = "Chapter$nextStr-New.md"
    if (Test-Path $filePath) {
        Rename-Item -Path $filePath -NewName $newPath
        Write-Host "Renamed $filePath to $newPath"
    }
}
