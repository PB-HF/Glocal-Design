#!/usr/bin/env pwsh

$sourceDir = "c:\Users\Admin\Desktop\glocalstudio\public\toWEBP"
$destDir = "c:\Users\Admin\Desktop\glocalstudio\public\frames"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
    Write-Host "Created frames folder"
}

$files = Get-ChildItem -Path $sourceDir -Filter "*.webp" | Sort-Object { [int]($_.BaseName -replace 'D') }

Write-Host "Processing $($files.Count) frames..."

$counter = 1
foreach ($file in $files) {
    $newName = "frame_{0:D4}.webp" -f $counter
    $destPath = Join-Path $destDir $newName
    Copy-Item -Path $file.FullName -Destination $destPath -Force
    
    if ($counter % 50 -eq 0) {
        Write-Host "Processed $counter frames..."
    }
    $counter++
}

Write-Host "Complete! Processed $($files.Count) frames"
$movedCount = (Get-ChildItem -Path $destDir -Filter "*.webp").Count
Write-Host "Frames in destination: $movedCount"
