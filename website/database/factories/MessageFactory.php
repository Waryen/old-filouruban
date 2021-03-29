<?php

namespace Database\Factories;

use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Message::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->word,
            'content' => $this->faker->sentences(3, true),
            'start_date' => $this->faker->dateTimeBetween('2000-01-01', '2010-01-01', 'Europe/Paris'),
            'end_date' => $this->faker->dateTimeBetween('2010-12-31', 'now', 'Europe/Paris'),
            'admins_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
