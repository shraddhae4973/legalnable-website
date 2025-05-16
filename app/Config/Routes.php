<?php
// CORS headers - must go first!
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// 2) If this is a preflight OPTIONS request, short-circuit with 200
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

 $routes->post('events/createevent', 'EventController::createEvent');

 // Get all events
 $routes->get('/events', 'EventController::getAllEvents');

 // Get single event by ID
 $routes->get('events/getSingleEvent/(:num)', 'EventController::getSingleEvent/$1');

 $routes->post('events/updateEvent/(:num)', 'EventController::updateEvent/$1'); 

 // Delete event by ID
 $routes->delete('events/deleteEvent/(:num)', 'EventController::deleteEvent/$1');
 
