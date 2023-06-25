<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VerifyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'value' => 'required',
            'type' => 'required',
            'number1' => 'required',
            'number2' => 'required',
            'number3' => 'required',
            'number4' => 'required',
            'number5' => 'required',
            'number6' => 'required'
        ];
    }
}
