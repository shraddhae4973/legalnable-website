<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\Database\Exceptions\DatabaseException;

class TestController extends BaseController
{
    public function index()
    {
        try {
            // Try to query the database
            $db = \Config\Database::connect();
            $query = $db->query("SELECT * FROM users");
            $data = $query->getResult();
            echo '<pre>';
            print_r($data);
            echo '</pre>';
        } catch (DatabaseException $e) {
            echo 'Database connection failed: ' . $e->getMessage();
        }
    }
}
