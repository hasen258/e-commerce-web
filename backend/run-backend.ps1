$envFile = "d:\angular\e-commerce\backend\.env"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^(?<key>[^#=]+)=(?<value>.*)$') {
            $key = $Matches['key'].Trim()
            $value = $Matches['value'].Trim()
            [System.Environment]::SetEnvironmentVariable($key, $value, [System.EnvironmentVariableTarget]::Process)
            Write-Host "Set Env: $key"
        }
    }
}
& ".\mvnw" spring-boot:run
