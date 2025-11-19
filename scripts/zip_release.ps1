param(
    [string]$OutFile = "release.zip"
)

$root = Resolve-Path "..\" -Relative
# Compress current folder into release.zip (overwrites if exists)
Compress-Archive -Path * -DestinationPath $OutFile -Force
Write-Output "Created $OutFile"
