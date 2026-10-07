<?php
namespace App\Actions\Leads; 

use App\Models\{Lead, LeadStatus};
use App\Models\User;
use Illuminate\Support\Facades\Log;

class CreateLead
{
    public function handle(array $data, User $user): Lead
    {
        $statusId = $data['status_id']
            ?? LeadStatus::where('slug', 'new')->value('id');
        // \Log::info('Status ID', ['statusId' => $statusId]);
        return Lead::create([
            ...$data,
            'status' => $statusId,
            'created_by' => $user->id,
        ]);
    }
}