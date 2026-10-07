<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\LeadActivity;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lead extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'source',
        'status',
        'assigned_to',
        'created_by',
        'notes',
    ];

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function activities()
    {
        return $this->hasMany(LeadActivity::class)->latest();
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(LeadStatus::class, 'status_id');
    }
}
