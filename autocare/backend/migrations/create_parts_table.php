<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('parts', function (Blueprint $table) {
            $table->id();
            $table->string('part_id')->unique();
            $table->string('name');
            $table->string('category', 50);
            $table->string('subcategory', 50)->nullable();
            $table->string('brand', 100);
            
            // Pricing
            $table->decimal('price', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->integer('stock')->default(0);
            $table->enum('condition', ['new', 'used', 'refurbished'])->default('new');
            
            // Ratings
            $table->decimal('rating', 2, 1)->default(0.0);
            $table->integer('review_count')->default(0);
            
            // Seller info
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->string('seller_location');
            $table->string('seller_response_time')->nullable();
            
            // Specifications
            $table->string('part_number')->nullable();
            $table->string('fitment')->nullable();
            $table->string('warranty')->nullable();
            $table->string('material')->nullable();
            $table->json('specifications')->nullable();
            
            // Images and description
            $table->json('images')->nullable();
            $table->text('description')->nullable();
            $table->json('compatibility')->nullable();
            
            // Shipping
            $table->boolean('shipping_available')->default(true);
            $table->decimal('shipping_cost', 10, 2)->nullable();
            $table->string('estimated_delivery')->nullable();
            
            // Status
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('category');
            $table->index('brand');
            $table->index('seller_id');
            $table->index('price');
            $table->index('rating');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('parts');
    }
};
