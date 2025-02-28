<?php

class AuthModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database(); // Load the database connection
    }

    // Register new user with role
    public function registerUser($first_name, $last_name, $email, $phone, $address, $password, $role = 'user') {
        // Prepare user data
        $data = array(
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'phone' => $phone,
            'address' => $address,
            'password' => password_hash($password, PASSWORD_DEFAULT), // Hash the password
            'role' => $role, // Set the role
        );

        // Insert data into the 'users' table
        return $this->db->insert('users', $data);
    }
}
