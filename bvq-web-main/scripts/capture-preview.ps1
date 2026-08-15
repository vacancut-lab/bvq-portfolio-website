$projectRoot = Split-Path -Parent $PSScriptRoot
$vitePath = Join-Path $projectRoot 'node_modules\vite\bin\vite.js'
$nodePath = 'C:\Program Files\nodejs\node.exe'
$chromePath = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$profilePath = Join-Path $projectRoot '.chrome-capture'
$screenshotPath = Join-Path $projectRoot 'homepage-check.png'
$mobileScreenshotPath = Join-Path $projectRoot 'homepage-mobile-check.png'
$pricingScreenshotPath = Join-Path $projectRoot 'pricing-check.png'
$footerScreenshotPath = Join-Path $projectRoot 'footer-check.png'

$server = Start-Process -FilePath $nodePath -ArgumentList $vitePath, '--host', '127.0.0.1', '--port', '5173' -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru
Start-Sleep -Seconds 2

try {
  $chromeArgs = @(
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    "--user-data-dir=$profilePath",
    '--hide-scrollbars',
    '--window-size=1600,1000',
    '--virtual-time-budget=3000',
    "--screenshot=$screenshotPath",
    'http://127.0.0.1:5173'
  )
  Start-Process -FilePath $chromePath -ArgumentList $chromeArgs -Wait -WindowStyle Hidden
  $mobileArgs = @(
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    "--user-data-dir=$profilePath",
    '--hide-scrollbars',
    '--window-size=390,844',
    '--virtual-time-budget=3000',
    "--screenshot=$mobileScreenshotPath",
    'http://127.0.0.1:5173'
  )
  Start-Process -FilePath $chromePath -ArgumentList $mobileArgs -Wait -WindowStyle Hidden
  foreach ($capture in @(
    @{ Path = $pricingScreenshotPath; Url = 'http://127.0.0.1:5173/#chi-phi' },
    @{ Path = $footerScreenshotPath; Url = 'http://127.0.0.1:5173/#lien-he' }
  )) {
    $sectionArgs = @(
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      "--user-data-dir=$profilePath",
      '--hide-scrollbars',
      '--window-size=1440,900',
      '--virtual-time-budget=3000',
      "--screenshot=$($capture.Path)",
      $capture.Url
    )
    Start-Process -FilePath $chromePath -ArgumentList $sectionArgs -Wait -WindowStyle Hidden
  }
  Get-Item $screenshotPath, $mobileScreenshotPath, $pricingScreenshotPath, $footerScreenshotPath | Select-Object FullName, Length
}
finally {
  Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
}
