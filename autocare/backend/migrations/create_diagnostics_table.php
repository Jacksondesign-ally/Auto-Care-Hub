<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('diagnostics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            
            // Input data
            $table->text('description');
            $table->string('language', 10)->default('en');
            $table->string('region', 50)->default('Nigeria');
            $table->integer('vehicle_age')->nullable();
            $table->integer('mileage')->nullable();
            $table->string('season', 20)->nullable();
            
            // Diagnosis results
            $table->string('problem');
            $table->string('category', 50);
            $table->text('diagnosis_description')->nullable();
            $table->decimal('confidence', 3, 2)->default(0.50);
            $table->string('severity', 20);
            $table->integer('health_impact');
            $table->integer('health_score');
            
            // Cost estimates
            $table->decimal('cost_min', 10, 2)->nullable();
            $table->decimal('cost_max', 10, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->decimal('labor_cost', 10, 2)->nullable();
            $table->decimal('parts_cost', 10, 2)->nullable();
            $table->decimal('shipping_cost', 10, 2)->nullable();
            
            // Additional info
            $table->json('causes')->nullable();
            $table->json('parts')->nullable();
            $table->json('recommendations')->nullable();
            $table->json('predictive_maintenance')->nullable();
            $table->json('regional_insights')->nullable();
            
            // Metadata
            $table->string('feedback_id')->unique();
            $table->string('urgency_level', 20);
            $table->string('repair_time', 50)->nullable();
            $table->json('media_files')->nullable();
            
            // User feedback
            $table->boolean('was_accurate')->nullable();
            $table->text('user_feedback')->nullable();
            $table->decimal('actual_cost', 10, 2)->nullable();
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('user_id');
            $table->index('category');
            $table->index('severity');
            $table->index('region');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagnostics');
    }
};
