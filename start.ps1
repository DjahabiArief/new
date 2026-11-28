[CmdletBinding()]
param([ValidateRange(1,65535)][int]$Port = 5173)
$ErrorActionPreference = 'Stop'
Push-Location -LiteralPath $PSScriptRoot
try {
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) { throw 'Docker Desktop belum terpasang atau docker belum tersedia di PATH.' }
    docker info --format '{{.OSType}}' | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'Buka Docker Desktop dan tunggu hingga engine Linux siap.' }
    $env:GAELLVERSE_PORT = "$Port"
    docker compose up --build --detach --wait
    if ($LASTEXITCODE -ne 0) { throw 'Container belum siap. Periksa keluaran Docker di atas.' }
    $url = "http://localhost:$Port"
    Write-Host "GAELLVERSE siap di $url"
    Start-Process $url
} finally {
    Pop-Location
}
