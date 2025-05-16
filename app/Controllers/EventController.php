<?php
namespace App\Controllers;
use App\Models\EventModel;
use App\Models\EventImageModel;
use CodeIgniter\RESTful\ResourceController;

class EventController extends ResourceController
{
  protected $eventModel;

  public function __construct()
  {
      // Load the EventModel
      $this->eventModel = new EventModel();
  }

  public function createEvent()
  {
      // Get the file and event data from the request
      $validation = \Config\Services::validation();
      $file = $this->request->getFile('img');
      $eventDescription = $this->request->getPost('eventDescription');
      $location = $this->request->getPost('location');
      $eventTitle = $this->request->getPost('eventTitle');

      // Validate the incoming data
      $validationRules = [
          'eventTitle'        => 'required|min_length[3]|max_length[100]',
          'eventDescription'  => 'required|min_length[10]|max_length[500]',
          'location'          => 'required|min_length[3]|max_length[100]',
          'img' => 'uploaded[img]|max_size[img,2048]|is_image[img]|mime_in[img,image/jpg,image/jpeg,image/png,image/gif]',

      ];

      if (!$this->validate($validationRules)) {
        // Return validation errors directly
        return $this->fail($validation->getErrors(), 400);
    }

      // Check if the file is valid and move it to the uploads folder
      if (!$file->isValid()) {
        return $this->fail('File upload error.', 400);
    }

      // Generate a unique name for the file and move it to the uploads directory
      $newName = $file->getRandomName();
      if (!$file->move(FCPATH . 'uploads', $newName)) {
        return $this->fail('Failed to move uploaded file.', 500);
    }

      // Prepare data for insertion into the database
      $data = [
          'img' => $newName,  
          'eventDescription' => $eventDescription,
          'location' => $location,
          'eventTitle' => $eventTitle,
      ];

      // Check if an event with the same title already exists
      if ($this->eventModel->checkEventExists($eventTitle)) {
        return $this->fail('Event with the same title already exists.', 400);
    }

      // Insert the event into the database
      if ($this->eventModel->insertEvent($data)) {
        return $this->respondCreated(['message' => 'Event created successfully', 'data' => $data]);
      } else {
          log_message('error', 'Database insert failed: ' . json_encode($this->eventModel->errors()));
          return $this->fail('Failed to create event.', 500);
      }

      
  }

  // Get All Events
  public function getAllEvents()
  {
      $events = $this->eventModel->getAllEvents();
      return $this->respond($events);
  }

  // Get Single Event
  public function getSingleEvent($id = null)
  {
      $event = $this->eventModel->getEventById($id);
      if ($event) {
          return $this->respond($event);
      }
      return $this->failNotFound("Event not found");
  }

  public function updateEvent($id = null)
  {
      $data = [
          'eventTitle' => $this->request->getPost('eventTitle'),
          'eventDescription' => $this->request->getPost('eventDescription'),
          'location' => $this->request->getPost('location'),
      ];
  
      // Handle image upload
      $file = $this->request->getFile('img');
      if ($file && $file->isValid()) {
          $newName = $file->getRandomName();
          $file->move(FCPATH . 'uploads', $newName);
          $data['img'] = $newName;
      }
  
      // Filter out any empty fields
      $data = array_filter($data, function ($value) {
          return !empty($value);
      });
  
      if (empty($data)) {
          return $this->fail('No valid data provided to update.', 400);
      }
  
      // Log the data to be updated
      log_message('debug', 'Data to update: ' . json_encode($data));
  
      // Perform the update
      $result = $this->eventModel->updateEvent($id, $data);
      
      if ($result) {
          log_message('debug', 'Event updated in DB: ' . json_encode($data));
          return $this->respondUpdated(['message' => 'Event updated successfully', 'data' => $data]);
      } else {
          log_message('error', 'Update failed: ' . json_encode($this->eventModel->errors()));
          return $this->fail('Failed to update event in the database.', 500);
      }
  }
  
  // Delete Event
  public function deleteEvent($id = null)
  {
      $event = $this->eventModel->getEventById($id);
      if (!$event) {
          return $this->failNotFound("Event not found");
      }

      if ($this->eventModel->deleteEvent($id)) {
          return $this->respondDeleted(['message' => 'Event deleted successfully']);
      }

      return $this->fail('Failed to delete event.', 500);
  }
}
