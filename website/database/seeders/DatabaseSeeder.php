<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\Admin::factory(10)->create();
         \App\Models\Subscriber::factory(10)->create();
        // \App\Models\Category::factory(10)->create();
        // \App\Models\Contact::factory(10)->create();
        // \App\Models\Message::factory(10)->create();
        // \App\Models\Article::factory(10)->create();
        // \App\Models\Commentary::factory(10)->create();
        // \App\Models\User::factory(10)->create();
    }
}
