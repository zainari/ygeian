<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LOGIN</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="{{asset('assets/css/m-style.css')}}" type="text/css">
  <link rel="stylesheet" href="{{asset('assets/css/style.css')}}" type="text/css">
 <link rel="stylesheet" href="{{asset('assets/css/style2.css')}}" type="text/css">
 <link rel="stylesheet" href="{{asset('assets/css/intlTelInput.css')}}">
</head>


<style>
    label {
      font-size: 20px;
      font-weight: 400 !important;
      cursor: pointer;
      color: #3D3E3F;
    }
    input[type="text"] {
      width: 100%;
      background-color: #E9EAEB;
      padding: 11px 24px;
      font-family: 'Karla';
      color: #3D3E3F;
      font-size: 20px;
      border: none;
      border-radius: 10px;
    }



  </style>
  <script>
    var confirmLang = {
      "english": {
        "confirm": {
          "delete_title": "Delete Image",
          "delete_content": "Do you want delete?",
          "confirmButton": "Proceed",
          "cancelButton": "Cancel"
        },
        "previous": "Previous",
        "next": "Next",
        "bloodgroup": "Blood Group",
        "epidemics": "Epidemics",
        "heartdiseases": "Heart Diseases",
        "mentalillness": "Mental Illness",
        "rhd": "Rhd"
      },
      "greek": {
        "confirm": {
          "delete_title": "Διαγραφή εικόνας",
          "delete_content": "Θέλετε διαγραφή;",
          "confirmButton": "Προχωρώ",
          "cancelButton": "Ματαίωση"
        },
        "previous": "Προηγούμενος",
        "next": "επόμενος",
        "bloodgroup": "Ομάδα αίματος",
        "epidemics": "Επιδημίες",
        "heartdiseases": "Καρδιακές παθήσεις",
        "mentalillness": "Ψυχική ασθένεια",
        "rhd": "Rhd"
      }
    };
    var res = [],
      sess_arr = [];
    var usertype = "", latitude = "", userid = "", longitude = ""; var base_url = 'index.html';
    var usertype = '0';
    var language = 'english';
    var data_status = 1;
    var call_Geolocation = 2;
    var Langjson = confirmLang['english'];
    var myemail = '';
  </script>
<body>
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
  <div class="container">
    <div class="row loginform">
      <div class="col-md-6 col-sm-12 col-xs-12">

          <div class="mob-logo">
            <a href="#"><img src="{{asset('assets/img/logo.svg')}}" alt="mobile-logo" class="logom"></a>
          </div>
        <div class="welcome-form">
          <h1>Welcome Back</h1>
          <form action="{{ route('login') }}" method="POST">
            @csrf

            <div class="form-group">
              <input type="email" id="email" name="email" placeholder="Email" required>
            </div>
            <h5 style="text-align: center ; margin-bottom:20px">or</h5>
			  {{-- <div class="form-group">
<!--              <input type="tel" id="mobile" name="mobile" placeholder="Mobile" required>-->
             <input id="phone-country" name="mobile" type="tel" placeholder="Mobile " onkeyup="noAlphabet(this)" onkeypress="noAlphabet(this)" required />

            </div> --}}
            {{-- <div class="form-group">
                <!--              <input type="tel" id="mobile" name="mobile" placeholder="Mobile" required>-->
                             <input id="phone-country" name="mobile" type="tel" placeholder="Mobile " onkeyup="noAlphabet(this)" onkeypress="noAlphabet(this)" required />
                            </div> --}}

                            <div class="mb-3 form-input">
                                <input type="text" id="mobile1" class="cntmobile phone-input form-control mt-4" minlength="7"
                                  maxlength="15" name="mobile" placeholder="Mobile" onchange="check(this)" required />

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
                <label class="form-check-label" for="patient" >I’m a patient</label>
				</div>
            </div>
			  </div>

            <div class="form-group">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="terms" name="terms" required>
				  <label class="form-check-label" for="terms">I agree to the <a href="#">terms</a> and <a href="#">conditions</a></label>
              </div>
			  </div>
            <div class="form-group">
                <button type="submit">login In</button>
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
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
  <script src="{{asset('assets/js/inputfunction.js')}}"></script>
  <script src="{{asset('assets/js/mlib.js')}}"></script>

  <script src="{{asset('assets/js/mycustom.js')}}"></script>

  <script src="{{asset('assets/js/jquery.min.js')}}"></script>

  <script src="{{asset('assets/js/intlTelInput.js')}}"></script>
  <script>
    var email = document.getElementById("email");
    email.addEventListener("input", function () {
        document.getElementById("mobile1").disabled = this.value != "";
    });
    var mobile = document.getElementById("mobile1");
    mobile.addEventListener("input", function () {
        document.getElementById("email").disabled = this.value != "";
    });
  </script>
</body>
</html>
