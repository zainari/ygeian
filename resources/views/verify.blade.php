<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>verify</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="{{asset('assets/css/m-style.css')}}" type="text/css">
  <link rel="stylesheet" href="{{asset('assets/css/style.css')}}" type="text/css">
 <link rel="stylesheet" href="{{asset('assets/css/style2.css')}}" type="text/css">
</head>
<body>
  <div class="container">
    <div class="row loginform">
      <div class="col-md-6 col-sm-12 col-xs-12">
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
<!--
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
-->
      </div>
      <div class="modal-body">
        <P>Verifying...</P>
      </div>
<!--
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
-->
    </div>
  </div>
</div>

<div class="mob-logo">
    <a href="#"><img src="{{asset('assets/img/logo.svg')}}" alt="mobile-logo" class="logom"></a>
  </div>

  @if(session()->has('success'))
  <div class="alert alert-success">
      {{ session()->get('success') }}
  </div>
@endif
  @if(session()->has('error'))
  <div class="alert alert-danger">
      {{ session()->get('error') }}
  </div>
@endif
        <div class="welcome-form">
          <h1>Get Verified</h1>
          <h5 class="h5">Enter the 6 digit OTP that has been <br/> sented to your email or phone</h5>
          <form method="POST" action="{{ route('verification') }}">
            @csrf
            <div class="code-container">
                <input name="value" value=" {{ session()->get('value') }}" required hidden>
                <input name="type"  value=" {{ session()->get('type') }}" required hidden>
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
			  <span>Already have an account? <a href="#">Sign In</a></span>
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

		<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 hide-col">
			<div class="logo">
				<a href="#"><img src="{{asset('assets/img/logo.svg')}}" alt="welcome-logo"/></a>
			</div>
			<div class="terms-links">
				<p><a href="#">TERMS</a> • <a href="#">PRIVACY</a> • <a href="#">CONTACT US</a> • <a href="#">ADVERTISMENT</a></p>
			</div>
		</div>

    </div> <!-- Row End Here -->
      <div class="row">
          <div class="link-mob">
            <div class="col-md-3 col-sm-12">
                <div class="form-group copyright">
				  <p>© YGEIAN 2023</p>
				</div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="terms-links">
				    <p><a href="#">TERMS</a> • <a href="#">PRIVACY</a> • <a href="#">CONTACT US</a> • <a href="#">ADVERTISMENT</a></p>
			     </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group social-icons">
				  <a href="#"><i class="fab fa-facebook-f"></i></a>
				  <a href="#"><i class="fab fa-instagram"></i></a>
				  <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        </div>
  </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.0.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js"></script>
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
