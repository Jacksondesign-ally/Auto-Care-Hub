<?php

namespace App\Http\Controllers;

use App\Models\Diagnostic;
use App\Services\DiagnosticEngine;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DiagnosticController extends Controller
{
    protected $diagnosticEngine;

    public function __construct(DiagnosticEngine $diagnosticEngine)
    {
        $this->diagnosticEngine = $diagnosticEngine;
    }

    /**
     * Run AI diagnosis
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function diagnose(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string|min:10',
            'language' => 'nullable|string|max:10',
            'region' => 'nullable|string|max:50',
            'vehicleAge' => 'nullable|integer|min:0|max:50',
            'mileage' => 'nullable|integer|min:0',
            'season' => 'nullable|string|in:rainy,dry,harmattan',
            'media' => 'nullable|array',
        ]);

        try {
            // Run AI diagnosis
            $diagnosis = $this->diagnosticEngine->diagnose(
                $validated['description'],
                [
                    'language' => $validated['language'] ?? 'en',
                    'region' => $validated['region'] ?? 'Nigeria',
                    'vehicleAge' => $validated['vehicleAge'] ?? 5,
                    'mileage' => $validated['mileage'] ?? 50000,
                    'season' => $validated['season'] ?? $this->getCurrentSeason(),
                ]
            );

            // Save to database
            $diagnostic = Diagnostic::create([
                'user_id' => auth()->id(),
                'description' => $validated['description'],
                'language' => $validated['language'] ?? 'en',
                'region' => $validated['region'] ?? 'Nigeria',
                'vehicle_age' => $validated['vehicleAge'],
                'mileage' => $validated['mileage'],
                'season' => $validated['season'] ?? $this->getCurrentSeason(),
                'problem' => $diagnosis['problem'],
                'category' => $diagnosis['category'],
                'diagnosis_description' => $diagnosis['description'] ?? null,
                'confidence' => $diagnosis['confidence'],
                'severity' => $diagnosis['severity'],
                'health_impact' => $diagnosis['healthImpact'],
                'health_score' => $diagnosis['healthScore'],
                'cost_min' => $diagnosis['costEstimate']['min'] ?? null,
                'cost_max' => $diagnosis['costEstimate']['max'] ?? null,
                'currency' => $diagnosis['costEstimate']['currency'] ?? 'USD',
                'labor_cost' => $diagnosis['costEstimate']['breakdown']['labor'] ?? null,
                'parts_cost' => $diagnosis['costEstimate']['breakdown']['parts'] ?? null,
                'shipping_cost' => $diagnosis['costEstimate']['breakdown']['shipping'] ?? null,
                'causes' => json_encode($diagnosis['causes'] ?? []),
                'parts' => json_encode($diagnosis['parts'] ?? []),
                'recommendations' => json_encode($diagnosis['recommendations'] ?? []),
                'predictive_maintenance' => json_encode($diagnosis['predictive'] ?? []),
                'regional_insights' => json_encode($diagnosis['regional'] ?? []),
                'feedback_id' => $diagnosis['feedbackId'],
                'urgency_level' => $diagnosis['urgencyLevel']['label'] ?? 'MEDIUM',
                'repair_time' => $diagnosis['repairTime'] ?? null,
                'media_files' => json_encode($validated['media'] ?? []),
            ]);

            return response()->json([
                'success' => true,
                'data' => $diagnosis,
                'diagnostic_id' => $diagnostic->id
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Diagnosis failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get diagnostic history for user
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function history(Request $request)
    {
        $diagnostics = Diagnostic::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $diagnostics
        ]);
    }

    /**
     * Get single diagnostic
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $diagnostic = Diagnostic::findOrFail($id);

        // Check authorization
        if ($diagnostic->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $diagnostic
        ]);
    }

    /**
     * Submit feedback for diagnostic
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function feedback(Request $request, $id)
    {
        $validated = $request->validate([
            'was_accurate' => 'required|boolean',
            'user_feedback' => 'nullable|string',
            'actual_cost' => 'nullable|numeric|min:0',
        ]);

        $diagnostic = Diagnostic::findOrFail($id);

        // Check authorization
        if ($diagnostic->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $diagnostic->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Feedback submitted successfully',
            'data' => $diagnostic
        ]);
    }

    /**
     * Get diagnostic statistics
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function statistics()
    {
        $stats = [
            'total_diagnostics' => Diagnostic::count(),
            'by_category' => Diagnostic::selectRaw('category, COUNT(*) as count')
                ->groupBy('category')
                ->get(),
            'by_severity' => Diagnostic::selectRaw('severity, COUNT(*) as count')
                ->groupBy('severity')
                ->get(),
            'by_region' => Diagnostic::selectRaw('region, COUNT(*) as count')
                ->groupBy('region')
                ->get(),
            'average_confidence' => Diagnostic::avg('confidence'),
            'average_health_score' => Diagnostic::avg('health_score'),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Get current season based on month
     * 
     * @return string
     */
    private function getCurrentSeason()
    {
        $month = date('n');
        return ($month >= 4 && $month <= 10) ? 'rainy' : 'dry';
    }
}
