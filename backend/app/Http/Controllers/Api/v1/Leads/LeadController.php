<?php

namespace App\Http\Controllers\Api\v1\Leads;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreLeadRequest;     
use App\Actions\Leads\CreateLead;               
use App\Http\Resources\Lead\{LeadResource,ActivityResource, LeadDetailResource};
use App\Models\{Lead,LeadStatus};
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // DB::listen(function ($query) {
        //     Log::info('SQL', [
        //         'sql' => $query->sql,
        //         'bindings' => $query->bindings,
        //         'time_ms' => $query->time,
        //     ]);
        // });

        $statusId = $request->query('status_id');

        $leads = Lead::query()
            ->with('assignee')
            ->where('status', $statusId)
            ->latest()
            ->paginate(10);

        return LeadResource::collection($leads);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeadRequest $request, CreateLead $createLead) 
    {
       
        $lead = $createLead->handle(
            $request->validated(),
            $request->user()
        );

        return response()->json([
            'success' => true,
            'message' => 'Lead created successfully.',
            'data' => new LeadResource($lead),
        ], 201);
    }

    /**
     * Display the specified resource.
     */

    public function show(Lead $lead)
    {
        $lead->load([
            'assignee:id,name',
        ]);

        return new LeadDetailResource($lead);
    }

    public function updateStatus(Request $request, Lead $lead)
    {
        $validated = $request->validate([
            'status_id' => ['required','integer','exists:lead_statuses,id',],
        ]);
        \Log::info('Status ID', ['statusId' => $validated['status_id']]);
        $status = LeadStatus::query()
            ->where('id', $validated['status_id'])
            ->where('is_active', true)
            ->first();

        if (! $status) {
            return response()->json([
                'success' => false,
                'message' => 'The selected status is inactive.',
            ], 422);
        }

        $lead->update([
            'status' => $status->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Lead status updated successfully.',
            'data' => new LeadResource($lead->fresh()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
