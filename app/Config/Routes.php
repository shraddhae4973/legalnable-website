<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
 
 // Route for user registration
 $routes->get('test-db', 'TestController::index');

 $route['auth/register'] = 'AuthController/register'; 
 $routes->get('api/events', 'EventController::getEventList');

