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
          <h1>Welcome</h1>
          <form action="{{ route('login') }}" method="POST">
            @csrf
            <div class="form-group">
              <input type="email" id="email" name="email" placeholder="Email" required>
            </div>

            <div class="form-group">
              <h5 class="h5">or</h5>
            </div>

            <div class="form-group">
              <input type="tel" id="mobile" name="mobile" placeholder="Mobile" required>
            </div>

            <div class="choose-opt">
              <div class="form-group">
                <div class="form-check">
                  <input type="radio" class="form-check-input" id="doctor" name="user_type" value="doctor" required>
                  <label class="form-check-label" for="doctor">I’m a doctor</label>
                </div>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input type="radio" class="form-check-input" id="patient" name="user_type" value="patient" required>
                  <label class="form-check-label" for="patient">I’m a patient</label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <button type="submit">Sign In</button>
            </div>

            <div class="bottom-links">
              <span>Already have an account? <a href="{{ route('register') }}">Sign Up</a></span>
              <p>Sign up as <a href="#">Company</a> • <a href="#">Hospital</a> • <a href="#">Pharmacy</a></p>
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
          <a href="#"><img src="{{asset('assets/img/logo.svg')}}" alt="welcome-logo"/></a>
        </div>
        <div class="terms-links">
          <p><a href="#">TERMS</a> • <a href="#">PRIVACY</a> • <a href="#">CONTACT US</a> • <a href="#">ADVERTISMENT</a></p>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
  <script>
    // swal("Good job!", {{ Session::get('success') }}, "success")
    //   setTimeout(swal("Good job!", {{ Session::get('success') }}, "success"), 5000);
    // @if(Session::has('success'))
    // @php
    //     Session::forget('success');
    // @endphp
    // @endif
  </script>
  <script>
    var email = document.getElementById("email");
    email.addEventListener("input", function () {
        document.getElementById("mobile").disabled = this.value != "";
    });
    var mobile = document.getElementById("mobile");
    mobile.addEventListener("input", function () {
        document.getElementById("email").disabled = this.value != "";
    });
  </script>
</body>
</html>
