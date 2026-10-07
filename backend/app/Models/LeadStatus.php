<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LeadStatus extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'color',
        'sort_order',
        'is_active',
        'is_final',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_final' => 'boolean',
    ];

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class, 'status_id');
    }
}
