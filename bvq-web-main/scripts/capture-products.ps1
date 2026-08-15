$projectRoot = Split-Path -Parent $PSScriptRoot
$vitePath = Join-Path $projectRoot 'node_modules\vite\bin\vite.js'
$nodePath = 'C:\Program Files\nodejs\node.exe'
$chromePath = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$profilePath = Join-Path $projectRoot '.chrome-products'
$outputDir = Join-Path $projectRoot 'product-previews'
$slugs = @('spa', 'du-lich', 'nha-hang', 'o-to', 'bat-dong-san', 'thoi-trang')

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
$serverArgs = "`"$vitePath`" --host 127.0.0.1 --port 5174 --strictPort"
$server = Start-Process -FilePath $nodePath -ArgumentList $serverArgs -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru

for ($attempt = 0; $attempt -lt 20; $attempt++) {
  try {
    if ((Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:5174' -TimeoutSec 1).StatusCode -eq 200) { break }
  } catch { Start-Sleep -Milliseconds 250 }
}

try {
  foreach ($slug in $slugs) {
    $screenshotPath = Join-Path $outputDir "$slug.png"
    $args = @(
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      "--user-data-dir=$profilePath",
      '--hide-scrollbars',
      '--window-size=1440,900',
      '--virtual-time-budget=2500',
      "--screenshot=$screenshotPath",
      "http://127.0.0.1:5174/san-pham/$slug"
    )
    Start-Process -FilePath $chromePath -ArgumentList $args -Wait -WindowStyle Hidden
  }
  Get-ChildItem $outputDir -Filter '*.png' | Select-Object Name, Length
}
finally {
  Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
}
