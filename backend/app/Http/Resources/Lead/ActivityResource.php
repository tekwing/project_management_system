<?php
namespace App\Http\Resources\Lead;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\User\UserResource;

class ActivityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'description' => $this->description,
            'scheduled_at' => $this->scheduled_at,
            'status' => $this->status,
            'next_action' => $this->next_action,
            'created_at' => $this->created_at?->toISOString(),
            'status_history' => $this->status_history,
            'lead_status' => $this->lead_status,
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}