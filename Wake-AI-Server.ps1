try {
    Write-Host "Waking up your AI Server (NVIDIA T4)..." -ForegroundColor Cyan
    & "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd" compute instances start kobold-server --zone=us-west4-a --project=gen-lang-client-0727219927
    
    Write-Host "Server is awake! Establishing secure connection tunnel..." -ForegroundColor Cyan
    $tunnelArgs = @("compute", "ssh", "kobold-server", "--zone=us-west4-a", "--project=gen-lang-client-0727219927", "--", "-N", "-L", "127.0.0.1:8000:127.0.0.1:8000", "-L", "127.0.0.1:5001:127.0.0.1:5001")
    Start-Process -FilePath "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd" -ArgumentList $tunnelArgs -WindowStyle Normal
    
    Write-Host "Waiting for SSH tunnel to establish (this can take up to 60 seconds)..." -ForegroundColor Yellow
    $maxRetries = 30
    $retryCount = 0
    $tunnelReady = $false
    
    while ($retryCount -lt $maxRetries) {
        $conn = Test-NetConnection -ComputerName 127.0.0.1 -Port 8000 -InformationLevel Quiet -WarningAction SilentlyContinue
        if ($conn) {
            $tunnelReady = $true
            break
        }
        Start-Sleep -Seconds 2
        $retryCount++
    }
    
    if ($tunnelReady) {
        Write-Host "Tunnel is ready! Opening SillyTavern..." -ForegroundColor Green
        Start-Process "http://127.0.0.1:8000"
    } else {
        Write-Host "Error: Timed out waiting for tunnel to establish. Please check the gcloud terminal window for errors." -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "======================================================" -ForegroundColor Red -BackgroundColor Black
    Write-Host "  AI SERVER IS RUNNING (Billing is active: ~$0.35/hr) " -ForegroundColor Red -BackgroundColor Black
    Write-Host "======================================================" -ForegroundColor Red -BackgroundColor Black
    Write-Host ""
    Read-Host -Prompt "When you are finished playing, press ENTER here to safely shut down the server and stop billing"
    
    Write-Host "Shutting down the server to save your credits..." -ForegroundColor Cyan
    Stop-Process -Name plink -ErrorAction SilentlyContinue
    Stop-Process -Name ssh -ErrorAction SilentlyContinue
    
    & "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd" compute instances stop kobold-server --zone=us-west4-a --project=gen-lang-client-0727219927
    
    Write-Host "Server stopped successfully. It is safe to close this window." -ForegroundColor Green
    Start-Sleep -Seconds 5
} catch {
    Write-Host "An unexpected error occurred:" -ForegroundColor Red
    Write-Host $_ -ForegroundColor Red
    Read-Host "Press ENTER to exit"
}
