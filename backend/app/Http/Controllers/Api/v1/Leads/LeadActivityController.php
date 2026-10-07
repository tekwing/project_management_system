<?php

namespace App\Http\Controllers\Api\v1\Leads;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreLeadActivityRequest; 
use App\Http\Resources\Lead\ActivityResource;
use App\Models\{Lead, LeadActivity};
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class LeadActivityController extends Controller
{
    public function index(Lead $lead)
    {
        $activities = $lead->activities()
            ->with('user')
            ->latest()
            ->cursorPaginate(20);

        return ActivityResource::collection($activities);
    }

    public function upcoming_activities(Lead $lead)
    {
        $today = now()->startOfDay();

        $activities = $lead->activities()
            ->select('id', 'type', 'description', 'scheduled_at')
            ->where('scheduled_at', '>=', $today)
            ->where(function ($query) {
                $query->whereNull('status')
                    ->orWhere('status', '!=', 'attended');
            })
            ->orderBy('scheduled_at')
            ->get();

        return response()->json([
            'data' => $activities,
        ]);
    }

    public function store(StoreLeadActivityRequest $request, Lead $lead)
    {
        $data = $request->validated();

        if (!empty($data['scheduled_at_date']) && !empty($data['scheduled_at_time'])) {
            $data['scheduled_at'] = Carbon::createFromFormat(
                'Y-m-d H:i',
                $data['scheduled_at_date'] . ' ' . $data['scheduled_at_time']
            );
        }

        unset($data['scheduled_at_date'], $data['scheduled_at_time']);

        $activity = $lead->activities()->create([
            'user_id' => auth()->id(),
            ...$data,
        ]);

        return new ActivityResource($activity->load('user'));
    }

    public function update(Request $request, LeadActivity $leadActivity)
    {
        $validated = $request->validate([
            'actionNote' => ['required', 'string'],
            'nextActivityType' => ['nullable', 'string', 'in:meeting,follow_up'],
            'meetingTitle' => ['nullable', 'string'],
            'date' => ['nullable', 'date'],
            'time' => ['nullable'],
            'followUpType' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        return DB::transaction(function () use ($validated, $leadActivity) {

            // -----------------------------------------
            // 1. Update current activity
            // -----------------------------------------

            $statusHistory = $leadActivity->status_history ?? [];

            $statusHistory[] = [
                'status' => 'attended',
                'message' => $validated['actionNote'],
                'at' => now()->toDateTimeString(),
            ];

            $leadActivity->update([
                'status' => 'attended',
                'status_history' => $statusHistory,
            ]);

            // -----------------------------------------
            // 2. Create next activity if selected
            // -----------------------------------------

            $nextActivity = null;

            if (!empty($validated['nextActivityType'])) {

                $scheduledAt = null;

                if (
                    !empty($validated['date']) &&
                    !empty($validated['time'])
                ) {
                    $scheduledAt =
                        $validated['date'] . ' ' . $validated['time'];
                }

                // Determine next_action
                $nextAction = null;

                if ($validated['nextActivityType'] === 'meeting') {
                    $nextAction = $validated['meetingTitle'] ?? null;
                } elseif ($validated['nextActivityType'] === 'follow_up') {
                    $nextAction = $validated['followUpType'] ?? null;
                }

                $nextActivity = LeadActivity::create([
                    'lead_id' => $leadActivity->lead_id,
                    'user_id' => auth()->id(),
                    'type' => $validated['nextActivityType'],
                    'description' => $validated['description'] ?? '',
                    'next_action' => $nextAction,
                    'scheduled_at' => $scheduledAt,
                    'status' => 'scheduled',
                    'status_history' => null,
                    'lead_status' => $leadActivity->lead_status,
                ]);

                // -----------------------------------------
                // 3. Add scheduling info to current history
                // -----------------------------------------

                $statusHistory[] = [
                    'status' => 'next_activity_created',
                    'message' => $nextActivity->type === 'meeting'
                        ? 'Meeting scheduled'
                        : 'Follow-up scheduled',
                    'scheduled_at' => $nextActivity->scheduled_at?->toDateTimeString(),
                    'at' => now()->toDateTimeString(),
                ];

                $leadActivity->update([
                    'status_history' => $statusHistory,
                ]);
            }

            return response()->json([
                'message' => 'Activity updated successfully',
                'activity' => new ActivityResource($leadActivity->fresh()),
                'next_activity' => $nextActivity
                    ? new ActivityResource($nextActivity)
                    : null,
            ]);
        });
    }

}
