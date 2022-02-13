<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Task;

class TaskFactory extends Factory
{

    /*
    * Factory に対応する Model の名前。
    */
    protected $model = Task::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->title(),
            'done_flag' => $this->faker->boolean(30),
            'created_at' => $this->faker->dateTimeBetween($startDate = 'now', $endDate = '+1 week'),
        ];
    }
}
