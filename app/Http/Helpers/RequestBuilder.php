<?php

namespace App\Http\Helpers;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class RequestBuilder extends FormRequest
{
    public function failedValidation(Validator $validator){
        throw $validator->errors()->first();
    }
}
