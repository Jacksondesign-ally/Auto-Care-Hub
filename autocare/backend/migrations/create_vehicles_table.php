<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('vehicle_id')->unique();
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            
            // Basic info
            $table->string('make');
            $table->string('model');
            $table->integer('year');
            $table->string('trim')->nullable();
            
            // Pricing
            $table->decimal('price', 12, 2);
            $table->string('currency', 3)->default('USD');
            
            // Specifications
            $table->integer('mileage');
            $table->enum('condition', ['excellent', 'very good', 'good', 'fair', 'poor']);
            $table->string('transmission');
            $table->string('fuel_type');
            $table->string('drivetrain');
            $table->string('engine');
            $table->string('exterior_color');
            $table->string('interior_color');
            $table->string('vin')->nullable();
            
            // Location
            $table->string('city');
            $table->string('country');
            $table->string('dealer_name')->nullable();
            
            // Features
            $table->json('features')->nullable();
            
            // Health score
            $table->integer('health_score')->default(0);
            $table->json('health_report')->nullable();
            
            // History
            $table->integer('previous_owners')->default(1);
            $table->integer('accidents')->default(0);
            $table->integer('service_records')->default(0);
            $table->string('title_status')->default('Clean');
            
            // Images
            $table->json('images')->nullable();
            
            // Seller info
            $table->enum('seller_type', ['dealer', 'private'])->default('dealer');
            $table->boolean('is_verified')->default(false);
            $table->decimal('seller_rating', 2, 1)->nullable();
            $table->string('seller_phone')->nullable();
            
            // Warranty and financing
            $table->boolean('warranty_available')->default(false);
            $table->string('warranty_duration')->nullable();
            $table->string('warranty_coverage')->nullable();
            $table->boolean('financing_available')->default(false);
            $table->decimal('down_payment', 10, 2)->nullable();
            $table->decimal('monthly_payment', 10, 2)->nullable();
            $table->integer('financing_term')->nullable();
            
            // Status
            $table->enum('status', ['available', 'pending', 'sold'])->default('available');
            $table->boolean('is_featured')->default(false);
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('make');
            $table->index('model');
            $table->index('year');
            $table->index('price');
            $table->index('city');
            $table->index('condition');
            $table->index('status');
            $table->index('is_featured');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
