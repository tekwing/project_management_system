<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],

            'email' => ['nullable', 'email', 'max:255'],

            'phone' => ['nullable', 'string', 'max:20'],

            'company' => ['nullable', 'string', 'max:255'],

            'job_title' => ['nullable', 'string', 'max:255'],

            'source' => ['nullable', 'string', 'max:100'],

            'assigned_to' => [
                'nullable',
                'integer',
                'exists:users,id',
            ],

            'status_id' => [
                'nullable',
                'integer',
                'exists:lead_statuses,id',
            ],

            'notes' => ['nullable', 'string'],
        ];
    }
}
