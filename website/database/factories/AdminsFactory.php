<?php

namespace Database\Factories;

use App\Models\Admins;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class AdminsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Admins::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'firstname' => $this->faker->firstName,
            'lastname' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => 'password',
            'su' => 1,
            'api_token' => Str::random(100),
            'remember_token' => Str::random(100),
        ];
    }
}