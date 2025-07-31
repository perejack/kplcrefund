

$images = @(
    @{ url = 'https://seeklogo.com/images/K/kenya-power-and-lighting-logo-0E49074D60-seeklogo.com.png'; filename = 'kplc-logo.png' },
    @{ url = 'https://www.kplc.co.ke/storage/01JDVYK89WYR3GF378AQ88TQ8F.jpg'; filename = 'kplc-logo-alt.jpg' },
    @{ url = 'https://play-lh.googleusercontent.com/bRZF74-13jknePwUd1xam5ZCSdAJVuI_wqtkrisBgu7EEh1jobh2boZihlk-4ikY_S3V'; filename = 'mpesa-logo.png' },
    @{ url = 'https://biznakenya.com/wp-content/uploads/2017/04/EQUITYl-1.jpg'; filename = 'equity-logo.jpg' },
    @{ url = 'https://upload.wikimedia.org/wikipedia/en/d/de/KCB_Bank_Kenya_Limited_logo.png'; filename = 'kcb-logo.png' },
    @{ url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZCLJ5eyocLaJaSz-wEwdH9U48iQT9NdvdN2DctDGdnRL0PTJ7Y36UJXpRFZusuIfCOWA&usqp=CAU'; filename = 'kplc-badge.png' },
    @{ url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format'; filename = 'electricity.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop&auto=format'; filename = 'money.jpg' },
    @{ url = 'https://i0.wp.com/254list.com/wp-content/uploads/2023/07/how-to-buy-kenya-power-kplc-tokens.png?fit=1025%2C600&ssl=1'; filename = 'tokens-bg.png' },
    @{ url = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop&auto=format'; filename = 'process.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format'; filename = 'happy-customer.jpg' },
    @{ url = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&auto=format'; filename = 'satisfied-customer.jpg' }
)

$assetsPath = "$PSScriptRoot"

foreach ($img in $images) {
    $target = Join-Path $assetsPath $img.filename
    Write-Host "Downloading $($img.url) -> $target"
    Invoke-WebRequest -Uri $img.url -OutFile $target
}

Write-Host "All images downloaded to $assetsPath."
