<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LeadStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            [
                'name' => 'New',
                'slug' => 'new',
                'color' => '#3B82F6',
                'sort_order' => 1,
                'is_active' => true,
                'is_final' => false,
            ],
            [
                'name' => 'Contacted',
                'slug' => 'contacted',
                'color' => '#8B5CF6',
                'sort_order' => 2,
                'is_active' => true,
                'is_final' => false,
            ],
            [
                'name' => 'Qualified',
                'slug' => 'qualified',
                'color' => '#06B6D4',
                'sort_order' => 3,
                'is_active' => true,
                'is_final' => false,
            ],
            [
                'name' => 'Follow Up',
                'slug' => 'follow_up',
                'color' => '#F59E0B',
                'sort_order' => 4,
                'is_active' => true,
                'is_final' => false,
            ],
            [
                'name' => 'Meeting Scheduled',
                'slug' => 'meeting_scheduled',
                'color' => '#6366F1',
                'sort_order' => 5,
                'is_active' => true,
                'is_final' => false,
            ],
            [
                'name' => 'Proposal Sent',
                'slug' => 'proposal_sent',
                'color' => '#EC4899',
                'sort_order' => 6,
                'is_active' => true,
                'is_final' => false,
            ],
            [
                'name' => 'Negotiation',
                'slug' => 'negotiation',
                'color' => '#F97316',
                'sort_order' => 7,
                'is_active' => true,
                'is_final' => false,
            ],
            [
                'name' => 'Won',
                'slug' => 'won',
                'color' => '#22C55E',
                'sort_order' => 8,
                'is_active' => true,
                'is_final' => true,
            ],
            [
                'name' => 'Lost',
                'slug' => 'lost',
                'color' => '#EF4444',
                'sort_order' => 9,
                'is_active' => true,
                'is_final' => true,
            ],
            [
                'name' => 'On Hold',
                'slug' => 'on_hold',
                'color' => '#6B7280',
                'sort_order' => 10,
                'is_active' => true,
                'is_final' => false,
            ],
        ];

        DB::table('lead_statuses')->upsert(
            $statuses,
            ['slug'],
            [
                'name',
                'color',
                'sort_order',
                'is_active',
                'is_final',
                'updated_at',
            ]
        );
    }
}
