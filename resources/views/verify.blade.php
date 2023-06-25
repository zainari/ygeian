<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LOGIN</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="{{asset('assets/css/style.css')}}">
  <style>
  </style>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-xl-5 col-md-6 col-sm-12 col-xs-12">
        <div class="welcome-form">
          <h1>Get Verified</h1>
          <h5 class="h5">Enter the 6-digit OTP that has been sent to your email or phone</h5>
          <form method="POST" action="{{ route('verify') }}">
            @csrf
            <div class="code-container">
                <input name="value" value=" {{ $value }}" required hidden>
                <input name="type"  value=" {{ $type }}" required hidden>
                <input name="number1" type="number" class="code" min="0" max="9" required>
                <input name="number2" type="number" class="code" min="0" max="9" required>
                <input name="number3" type="number" class="code" min="0" max="9" required>
                <input name="number4" type="number" class="code" min="0" max="9" required>
                <input name="number5" type="number" class="code" min="0" max="9" required>
                <input name="number6" type="number" class="code" min="0" max="9" required>
            </div>

            <div class="form-group">
              <button type="submit">Submit</button>
            </div>
            <div class="bottom-links">
              <p><a href="#">Sign Up</a> • <a href="#">Sign in</a></p>
            </div>
            <div class="footer-text">
              <div class="form-group copyright">
                <p>© YGEIAN 2023</p>
              </div>
              <div class="form-group social-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="col-xl-7 col-md-6 col-sm-12 col-xs-12 hide-col">
        <div class="logo">
          <a href="#"><img src="img/logo.svg" alt="welcome-logo"/></a>
        </div>
        <div class="terms-links">
          <p><a href="#">TERMS</a> • <a href="#">PRIVACY</a> • <a href="#">CONTACT US</a> • <a href="#">ADVERTISMENT</a></p>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
  <script>
    const codes = document.querySelectorAll('.code')
    codes[0].focus()

    codes.forEach((code, idx) => {
        code.addEventListener('keydown', (e) => {
            if(e.key >= 0 && e.key <=9) {
                codes[idx].value = ''
                setTimeout(() => codes[idx + 1].focus(), 10)
            } else if(e.key === 'Backspace') {
                setTimeout(() => codes[idx - 1].focus(), 10)
            }
        })
    })
  </script>
</body>
</html>
