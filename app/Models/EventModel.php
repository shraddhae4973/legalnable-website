<?php

namespace App\Models;

use CodeIgniter\Model;

class EventModel extends Model
{
    protected $table = 'events';  // Your database table
    protected $primaryKey = 'id';
    protected $allowedFields = ['imgSrc', 'eventDescription', 'location', 'eventTitle'];  // Ensure column names match DB
}
