<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\VerifyRequest;
use App\Models\User;
use Exception;
use Twilio\Rest\Client;

class UserController extends Controller
{
    public function registerForm()
    {
        return view('register');
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->all();
        User::create($data);
        return redirect()->route('login')->with('success', 'Registered Successfully');
    }

    public function loginForm()
    {
        return view('login');
    }

    public function login(LoginRequest $request)
    {
        $account_sid = env("TWILIO_ACCOUNT_SID");
        $auth_token = env("TWILIO_AUTH_TOKEN");
        $service_sid = env("TWILIO_SERVICE_SID");
        $twilio = new Client($account_sid, $auth_token);

        if (!empty($request->email)) {
            $user = User::where('email', $request->email)->first();
            $value = $user->email;
            $type = 'email';
        } else {
            $user = User::where('mobile', $request->mobile)->first();
            $value = $user->mobile;
            $type = 'sms';
        }

        $verification = $twilio->verify->v2->services($service_sid)
            ->verifications
            ->create($value, $type);

        return redirect()->route('verify')->with([ 'value' => $value, 'type' => $type ]);
    }

    public function verify(){
        $value = session()->get('value');
        $type = session()->get('type');
        return view('verify', compact('value', 'type'));
    }

    public function verification(VerifyRequest $request)
    {
        $account_sid = env("TWILIO_ACCOUNT_SID");
        $auth_token = env("TWILIO_AUTH_TOKEN");
        $service_sid = env("TWILIO_SERVICE_SID");
        $twilio = new Client($account_sid, $auth_token);

        $number = $request->number1 . $request->number2 . $request->number3 . $request->number4 . $request->number5 . $request->number6;

        $verification = $twilio->verify->v2->services($service_sid)
            ->verificationChecks
            ->create([
                "to" => $request->value,
                "code" => $number
            ]);

        if ($request->type == 'email') {
            $user = User::where('email', $request->value)->first();
        } else {
            $user = User::where('mobile', $request->value)->first();
        }


        if ($verification->status === "approved") {
            return view('loading', compact('user'));
        } else {

            // echo "<script>alert('Invalid Email or password');</script>";
            return back()->with('error', 'Verification failed. Please try again.');
        }
    }

    public function dashboard($id)
    {
        $user = User::find($id);

        if ($user->user_type == 'doctor') {
            return view('doctor/success', compact('user'));
        } else {
            return view('patient/success', compact('user'));
        }
    }
}
