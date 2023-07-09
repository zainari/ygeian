<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>loading</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">

 <link rel="stylesheet" href="{{asset('assets/css/style2.css')}}" type="text/css">
</head>
<body>

  <div class="container">
    <div class="row">
      <div class="col-xl-5 col-md-6 col-sm-12 col-xs-12">
        <div class="welcome-form1">
         <h1 class="Verifying">Verifying...</h1>

        <div class="spinner-border text-primary spinner" role="status">
          <span class="visually-hidden span">Loading...</span>
        </div>
        </div>
      </div>

		<div class="col-xl-7 col-md-6 col-sm-12 col-xs-12 hide-col">
			<div class="logo">
				<a href="./index.html"><img src="{{asset('assets/img/logo.svg')}}" alt="welcome-logo"/></a>
			</div>
			<div class="terms-links">
				<p><a href="#">TERMS</a> • <a href="#">PRIVACY</a> • <a href="#">CONTACT US</a> • <a href="#">ADVERTISMENT</a></p>
			</div>
		</div>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
  <script>
    const myTimeout = setTimeout(dashboard, 3000);

    function dashboard() {
        document.location.href="{{ route('dashboard', ['id' => $user->id]) }}";
    }
  </script>

</body>
</html>
