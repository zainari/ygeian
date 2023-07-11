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
				  <a href="#">
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Inst">
<path id="Vector" d="M29.9198 39.9999H10.1798C7.52764 39.9999 4.98413 38.9463 3.10876 37.0709C1.2334 35.1956 0.17981 32.652 0.17981 29.9999V10.3599C0.17981 7.7077 1.2334 5.16416 3.10876 3.2888C4.98413 1.41343 7.52764 0.359863 10.1798 0.359863H29.8198C32.472 0.359863 35.0155 1.41343 36.8909 3.2888C38.7662 5.16416 39.8198 7.7077 39.8198 10.3599V29.9999C39.833 31.3083 39.5867 32.6065 39.0951 33.8191C38.6035 35.0318 37.8764 36.135 36.9557 37.065C36.0351 37.9949 34.9393 38.7331 33.7316 39.2368C32.5239 39.7406 31.2283 39.9999 29.9198 39.9999Z" fill="#40B4E7"/>
<path id="Vector_2" d="M19.9999 29.6298C24.9152 29.6298 28.8999 25.6452 28.8999 20.7298C28.8999 15.8145 24.9152 11.8298 19.9999 11.8298C15.0845 11.8298 11.0999 15.8145 11.0999 20.7298C11.0999 25.6452 15.0845 29.6298 19.9999 29.6298Z" fill="white"/>
<path id="Vector_3" d="M31.8401 11.6398C33.3092 11.6398 34.5001 10.4489 34.5001 8.97982C34.5001 7.51075 33.3092 6.31982 31.8401 6.31982C30.371 6.31982 29.1801 7.51075 29.1801 8.97982C29.1801 10.4489 30.371 11.6398 31.8401 11.6398Z" fill="white"/>
</g>
</svg></a>
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
				  <a href="#"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Inst">
                    <path id="Vector" d="M29.9198 39.9999H10.1798C7.52764 39.9999 4.98413 38.9463 3.10876 37.0709C1.2334 35.1956 0.17981 32.652 0.17981 29.9999V10.3599C0.17981 7.7077 1.2334 5.16416 3.10876 3.2888C4.98413 1.41343 7.52764 0.359863 10.1798 0.359863H29.8198C32.472 0.359863 35.0155 1.41343 36.8909 3.2888C38.7662 5.16416 39.8198 7.7077 39.8198 10.3599V29.9999C39.833 31.3083 39.5867 32.6065 39.0951 33.8191C38.6035 35.0318 37.8764 36.135 36.9557 37.065C36.0351 37.9949 34.9393 38.7331 33.7316 39.2368C32.5239 39.7406 31.2283 39.9999 29.9198 39.9999Z" fill="#40B4E7"/>
                    <path id="Vector_2" d="M19.9999 29.6298C24.9152 29.6298 28.8999 25.6452 28.8999 20.7298C28.8999 15.8145 24.9152 11.8298 19.9999 11.8298C15.0845 11.8298 11.0999 15.8145 11.0999 20.7298C11.0999 25.6452 15.0845 29.6298 19.9999 29.6298Z" fill="white"/>
                    <path id="Vector_3" d="M31.8401 11.6398C33.3092 11.6398 34.5001 10.4489 34.5001 8.97982C34.5001 7.51075 33.3092 6.31982 31.8401 6.31982C30.371 6.31982 29.1801 7.51075 29.1801 8.97982C29.1801 10.4489 30.371 11.6398 31.8401 11.6398Z" fill="white"/>
                    </g>
                    </svg></a>
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
