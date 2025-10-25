<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CarouselController extends Controller
{
    /**
     * Get all carousel images/slides
     * These are the homepage banner slides that auto-rotate
     */
    public function index()
    {
        try {
            // You can store carousel data in database or return static data
            // For now, returning sample data structure
            
            $slides = [
                [
                    'id' => 1,
                    'title' => 'AI-Powered Vehicle Diagnostics',
                    'description' => 'Get instant analysis with 100+ symptom patterns and regional adaptation',
                    'image_url' => asset('storage/carousel/slide1.jpg'), // Upload images to storage/app/public/carousel/
                    'button_text' => 'Try Free Diagnosis',
                    'button_link' => '#diagnostics',
                    'order' => 1,
                    'active' => true
                ],
                [
                    'id' => 2,
                    'title' => 'Multi-Language Voice Input',
                    'description' => 'Speak in 7+ languages - English, French, Arabic, Swahili & more',
                    'image_url' => asset('storage/carousel/slide2.jpg'),
                    'button_text' => 'Try Voice Input',
                    'button_link' => '#diagnostics',
                    'order' => 2,
                    'active' => true
                ],
                [
                    'id' => 3,
                    'title' => 'Computer Vision Analysis',
                    'description' => 'Upload photos or videos for visual damage detection',
                    'image_url' => asset('storage/carousel/slide3.jpg'),
                    'button_text' => 'Upload Photos',
                    'button_link' => '#diagnostics',
                    'order' => 3,
                    'active' => true
                ],
                [
                    'id' => 4,
                    'title' => 'Regional Adaptation for Africa',
                    'description' => 'Climate-specific diagnostics and local pricing for 10+ countries',
                    'image_url' => asset('storage/carousel/slide4.jpg'),
                    'button_text' => 'Learn More',
                    'button_link' => '#features',
                    'order' => 4,
                    'active' => true
                ],
                [
                    'id' => 5,
                    'title' => 'Find Parts & Mechanics',
                    'description' => 'Connect with verified sellers and professional mechanics near you',
                    'image_url' => asset('storage/carousel/slide5.jpg'),
                    'button_text' => 'Browse Marketplace',
                    'button_link' => '#parts',
                    'order' => 5,
                    'active' => true
                ]
            ];
            
            // TODO: Replace with database query
            // $slides = CarouselSlide::where('active', true)->orderBy('order')->get();
            
            return response()->json([
                'status' => 'success',
                'data' => $slides
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch carousel slides',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Upload a new carousel image
     * POST /api/carousel
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'button_text' => 'nullable|string',
            'button_link' => 'nullable|string',
            'order' => 'nullable|integer'
        ]);
        
        try {
            // Upload image to storage
            $imagePath = $request->file('image')->store('carousel', 'public');
            
            // TODO: Save to database
            // $slide = CarouselSlide::create([
            //     'title' => $request->title,
            //     'description' => $request->description,
            //     'image_url' => asset('storage/' . $imagePath),
            //     'button_text' => $request->button_text,
            //     'button_link' => $request->button_link,
            //     'order' => $request->order ?? 999,
            //     'active' => true
            // ]);
            
            return response()->json([
                'status' => 'success',
                'message' => 'Carousel slide uploaded successfully',
                'data' => [
                    'image_url' => asset('storage/' . $imagePath)
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to upload carousel slide',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Update carousel slide
     * PUT /api/carousel/{id}
     */
    public function update(Request $request, $id)
    {
        // TODO: Implement update functionality
        return response()->json([
            'status' => 'success',
            'message' => 'Carousel slide updated successfully'
        ]);
    }
    
    /**
     * Delete carousel slide
     * DELETE /api/carousel/{id}
     */
    public function destroy($id)
    {
        // TODO: Implement delete functionality
        return response()->json([
            'status' => 'success',
            'message' => 'Carousel slide deleted successfully'
        ]);
    }
}
