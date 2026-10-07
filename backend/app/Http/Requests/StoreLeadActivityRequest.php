<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLeadActivityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'required|string|in:note,meeting,followup,status_change',
            'description' => 'nullable|string',
            'next_action' => 'nullable|string',
            'status_value' => 'nullable|string',
            'scheduled_at_date' => 'nullable|date_format:Y-m-d',
            'scheduled_at_time' => 'nullable|date_format:H:i',
        ];
    }
}
