<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mechanics', function (Blueprint $table) {
            $table->id();
            $table->string('mechanic_id')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Basic info
            $table->string('business_name');
            $table->string('owner_name');
            $table->boolean('is_verified')->default(false);
            $table->json('certifications')->nullable();
            
            // Ratings
            $table->decimal('rating', 2, 1)->default(0.0);
            $table->integer('review_count')->default(0);
            
            // Specialties and services
            $table->json('specialties');
            $table->json('services');
            
            // Location
            $table->string('city');
            $table->string('country');
            $table->text('address');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            
            // Contact
            $table->string('phone');
            $table->string('email');
            $table->string('website')->nullable();
            
            // Business hours
            $table->json('business_hours');
            
            // Pricing
            $table->decimal('labor_rate', 10, 2);
            $table->decimal('diagnostic_fee', 10, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            
            // Features
            $table->json('features')->nullable();
            $table->json('images')->nullable();
            
            // Business details
            $table->integer('years_in_business')->nullable();
            $table->integer('employee_count')->nullable();
            $table->json('languages')->nullable();
            
            // Status
            $table->boolean('is_active')->default(true);
            $table->boolean('accepts_bookings')->default(true);
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('city');
            $table->index('country');
            $table->index('rating');
            $table->index('is_verified');
            $table->index('is_active');
            $table->index(['latitude', 'longitude']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mechanics');
    }
};
