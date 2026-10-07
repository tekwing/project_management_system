<?php

namespace App\Http\Controllers\Api\v1\Leads;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreLeadRequest;     
use App\Actions\Leads\CreateLead;               
use App\Http\Resources\Lead\{LeadResource,ActivityResource, LeadDetailResource};
use App\Models\Lead;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $leads = Lead::query()
            ->with('assignee')
            ->latest()
            ->paginate(20);

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
