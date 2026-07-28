$sourceDirs = @(
    "E:\My Drive\Graphic Novel Sablehook\images",
    "E:\My Drive\Organized_Campaign_Archive\Images_and_Artwork_Unsorted"
)

$destRoot = "E:\My Drive\Blackwater Quay\Organized_Images_For_Review"

if (!(Test-Path -Path $destRoot)) {
    New-Item -ItemType Directory -Path $destRoot | Out-Null
}

$imageExtensions = @(".png", ".jpg", ".jpeg", ".webp", ".gif")

foreach ($dir in $sourceDirs) {
    if (Test-Path -Path $dir) {
        $files = Get-ChildItem -Path $dir -File | Where-Object { $imageExtensions -contains $_.Extension.ToLower() }
        
        foreach ($file in $files) {
            $destFolder = "Unsorted"
            
            # Match Chapter/Part patterns (e.g. ch18, part3, chapter01)
            if ($file.Name -match "(?i)(ch|chapter|part)_?(\d+)") {
                $num = [int]$matches[2]
                $destFolder = "Chapter_$($num.ToString('D2'))"
            } elseif ($file.Name -match "(?i)(Banki|Sable|Kestrel|Asmodeus)") {
                $destFolder = "Characters"
            }
            
            $targetDir = Join-Path -Path $destRoot -ChildPath $destFolder
            if (!(Test-Path -Path $targetDir)) {
                New-Item -ItemType Directory -Path $targetDir | Out-Null
            }
            
            $targetPath = Join-Path -Path $targetDir -ChildPath $file.Name
            if (!(Test-Path -Path $targetPath)) {
                Copy-Item -Path $file.FullName -Destination $targetPath
            }
        }
    }
}
Write-Output "Image organization complete."
