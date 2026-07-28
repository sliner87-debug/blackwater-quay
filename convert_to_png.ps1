param(
    [string]$TargetDirectory = "h:\Antigravity\Novel\images"
)
Add-Type -AssemblyName System.Drawing
$files = Get-ChildItem -Path $TargetDirectory -Filter "*.png"
foreach ($file in $files) {
    # Check first 2 bytes
    $fs = New-Object System.IO.FileStream($file.FullName, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read)
    $magic = New-Object byte[] 2
    $fs.Read($magic, 0, 2) | Out-Null
    $fs.Close()
    
    # JPEG magic bytes: FF D8
    if ($magic[0] -eq 0xFF -and $magic[1] -eq 0xD8) {
        Write-Host "Converting $($file.Name) from JPEG to PNG..."
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        $tempPath = $file.FullName + ".temp"
        $img.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $img.Dispose()
        Remove-Item -Path $file.FullName
        Rename-Item -Path $tempPath -NewName $file.Name
    }
}
Write-Host "Done!"
