<?php

namespace App\Models;

use CodeIgniter\Model;

class EventModel extends Model
{
    protected $table      = 'events'; // assuming the table name is events
    protected $primaryKey = 'id';
    protected $allowedFields = ['img', 'eventDescription', 'location', 'eventTitle'];
    protected $useTimestamps = true;

    protected $validationRules = [
        'eventTitle'        => 'required|min_length[3]|max_length[100]',
        'eventDescription'  => 'required|min_length[10]|max_length[500]',
        'location'          => 'required|min_length[3]|max_length[100]',
        // 'img'               => 'required|valid_url',  // Assuming imgSrc stores a URL or file path
    ];

    public function insertEvent($data)
    {
        return $this->insert($data);  // This uses the insert method from CodeIgniter Model
    }

    // Get all events
    public function getAllEvents()
    {
        return $this->findAll();
    }

    // Get a single event by ID
    public function getEventById($id)
    {
        return $this->find($id);   
    }

    // Update an event
    public function updateEvent($id, $data)
    {
        return $this->update($id, $data);   
    }

    // Delete an event
    public function deleteEvent($id)
    {
        return $this->delete($id);  
    }

    // Optional: Check if an event exists by title or other fields
    public function checkEventExists($eventTitle)
    {
        return $this->where('eventTitle', $eventTitle)->countAllResults() > 0;
    }
}
?>