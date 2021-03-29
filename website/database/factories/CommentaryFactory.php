<?php

namespace Database\Factories;

use App\Models\Commentary;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentaryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Commentary::class;

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
            'content' => $this->faker->sentences(3, true),
            'date' => $this->faker->date('Y-m-d', 'now'),
            'articles_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
