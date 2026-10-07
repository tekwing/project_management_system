<?php
namespace App\Actions\Leads; 

use App\Models\{Lead, LeadStatus};
use App\Models\User;

class CreateLead
{
    public function handle(array $data, User $user): Lead
    {
        $statusId = $data['status_id']
            ?? LeadStatus::where('slug', 'new')->value('id');

        return Lead::create([
            ...$data,
            'status_id' => $statusId,
            'created_by' => $user->id,
        ]);
    }
}