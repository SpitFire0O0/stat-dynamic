# Скрипт для тестирования всех эндпоинтов API
Write-Host "=== Тестирование эндпоинтов API ===" -ForegroundColor Green

# Ждем запуска сервера
Write-Host "Ожидание запуска сервера..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Базовый URL
$baseUrl = "http://localhost:3000"

# Функция для тестирования эндпоинта
function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Url,
        [string]$Description,
        [string]$Body = $null,
        [hashtable]$Headers = @{}
    )
    
    Write-Host "`n--- $Description ---" -ForegroundColor Cyan
    Write-Host "URL: $Method $Url" -ForegroundColor Gray
    
    try {
        $params = @{
            Uri = $Url
            Method = $Method
            Headers = $Headers
            TimeoutSec = 10
        }
        
        if ($Body) {
            $params.Body = $Body
            $params.ContentType = "application/json"
        }
        
        $response = Invoke-WebRequest @params -ErrorAction Stop
        
        Write-Host "✅ Статус: $($response.StatusCode)" -ForegroundColor Green
        if ($response.Content) {
            Write-Host "Ответ: $($response.Content.Substring(0, [Math]::Min(200, $response.Content.Length)))..." -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "❌ Ошибка: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Тестирование Health Check
Test-Endpoint -Method "GET" -Url "$baseUrl/health" -Description "Health Check"

# Тестирование Swagger документации
Test-Endpoint -Method "GET" -Url "$baseUrl/api" -Description "Swagger Documentation"

# Тестирование аутентификации (без токена - должно вернуть 401)
Test-Endpoint -Method "POST" -Url "$baseUrl/auth/login" -Description "Auth Login (без данных)" -Body '{"email":"test@test.com","password":"test"}'

# Тестирование пользователей (без токена - должно вернуть 401)
Test-Endpoint -Method "GET" -Url "$baseUrl/users" -Description "Get Users (без токена)"

# Тестирование файлов (без токена - должно вернуть 401)
Test-Endpoint -Method "GET" -Url "$baseUrl/files/logo" -Description "Get User Logo (без токена)"

# Тестирование групп (без токена - должно вернуть 401)
Test-Endpoint -Method "GET" -Url "$baseUrl/groups" -Description "Get Groups (без токена)"

# Тестирование курсов (без токена - должно вернуть 401)
Test-Endpoint -Method "GET" -Url "$baseUrl/courses" -Description "Get Courses (без токена)"

# Тестирование дисциплин (без токена - должно вернуть 401)
Test-Endpoint -Method "GET" -Url "$baseUrl/discipline" -Description "Get Disciplines (без токена)"

# Тестирование тем (без токена - должно вернуть 401)
Test-Endpoint -Method "GET" -Url "$baseUrl/themes" -Description "Get Themes (без токена)"

# Тестирование домашних заданий (без токена - должно вернуть 401)
Test-Endpoint -Method "GET" -Url "$baseUrl/homework" -Description "Get Homework (без токена)"

# Тестирование оценок (без токена - должно вернуть 401)
Test-Endpoint -Method "GET" -Url "$baseUrl/grades" -Description "Get Grades (без токена)"

# Тестирование встреч (без токена - должно вернуть 401)
Test-Endpoint -Method "GET" -Url "$baseUrl/meetings" -Description "Get Meetings (без токена)"

# Тестирование обратной связи (без токена - должно вернуть 401)
Test-Endpoint -Method "GET" -Url "$baseUrl/feedback" -Description "Get Feedback (без токена)"

# Тестирование контактов (без токена - должно вернуть 401)
Test-Endpoint -Method "GET" -Url "$baseUrl/contacts" -Description "Get Contacts (без токена)"

# Тестирование достижений (без токена - должно вернуть 401)
Test-Endpoint -Method "GET" -Url "$baseUrl/achievements" -Description "Get Achievements (без токена)"

# Тестирование приоритетов пользователей (без токена - должно вернуть 401)
Test-Endpoint -Method "GET" -Url "$baseUrl/user-priorities" -Description "Get User Priorities (без токена)"

Write-Host "`n=== Тестирование завершено ===" -ForegroundColor Green
