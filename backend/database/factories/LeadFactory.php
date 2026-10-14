<?php

namespace Database\Factories;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Lead>
 */
class LeadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Lead::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'company' => fake()->company(),
            'job_title' => fake()->jobTitle(),
            'source' => fake()->randomElement([
                'website',
                'facebook',
                'google',
                'referral',
                'linkedin',
            ]),
            'status' => 1,
            'assigned_to' => User::inRandomOrder()->value('id'),
            'created_by' => 1,
            'notes' => fake()->optional()->paragraph(),
        ];
    }
}
