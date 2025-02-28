<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class EventController extends ResourceController
{
    protected $modelName = 'App\Models\EventModel';
    protected $format    = 'json';

    // Get all events
    public function getEventList()
    {
        return $this->respond($this->model->findAll());
    }
}
