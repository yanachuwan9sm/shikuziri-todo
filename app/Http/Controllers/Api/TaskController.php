<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Carbon\Carbon;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks,200);
    }

    public function shikuziriTodo()
    {
        $yesterday = Carbon::now()->subDay()->format('Y-m-d');
        $tasks = Task::whereDate('created_at',$yesterday)
                       ->where('done_flag', false)
                       ->orderBy('created_at', 'asc')->get();
        return response()->json($tasks,200);
    }

    public function TodayTodo()
    {
        $tasks = Task::WhereDate('created_at', date("Y-m-d") )->orderBy('created_at', 'asc')->get();
        return response()->json($tasks,200);
    }

    public function create(Request $request)
    {
        $task = new Task;
        $task->title = $request->title;
        $task->user_id = $request->user_id;
        $task->save();

        $tasks = Task::WhereDate('created_at', date("Y-m-d") )->orderBy('created_at', 'asc')->get();
        return response()->json($tasks,200);
    }

    public function toggleFlagUpdate(Request $request)
    {
        $task = Task::find($request->id);
        $task->done_flag = $request->done_flag;
        $task->save();
        $tasks = Task::WhereDate('created_at', date("Y-m-d"))->orderBy('created_at', 'asc')->get();
        return response()->json($tasks,200);
    }

    public function delete(Request $request)
    {
        $task = Task::find($request->id);
        $task->delete();

        $tasks = Task::WhereDate('created_at', date("Y-m-d"))->orderBy('created_at', 'asc')->get();
        return response()->json($tasks,200);
    }
}
