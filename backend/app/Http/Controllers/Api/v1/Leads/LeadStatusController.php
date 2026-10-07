<?php

namespace App\Http\Controllers\Api\v1\Leads;

use App\Http\Controllers\Controller;
use App\Models\LeadStatus;
use Illuminate\Http\JsonResponse;

class LeadStatusController extends Controller
{
    public function index(): JsonResponse
    {
        $statuses = LeadStatus::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get([
                'id',
                'name',
                'slug',
                'color',
            ]);

        return response()->json([
            'data' => $statuses,
        ]);
    }
}
