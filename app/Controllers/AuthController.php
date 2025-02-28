<?php

class AuthController extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('AuthModel'); // Load the AuthModel
        $this->load->library('form_validation'); // Load form validation library
    }

    public function register() {
        // Get data from React form (sent as JSON)
        $data = json_decode(file_get_contents("php://input"), true);
      
        // Validate required fields
        if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
            echo json_encode(['success' => false, 'message' => 'All fields are required']);
            return;
        }

        // Validate the email format
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => 'Invalid email format']);
            return;
        }

        // Check if the email already exists in the database
        $this->db->where('email', $data['email']);
        $existingUser = $this->db->get('users')->row();

        if ($existingUser) {
            echo json_encode(['success' => false, 'message' => 'Email already exists']);
            return;
        }

        // Check if the username already exists in the database
        $this->db->where('username', $data['username']);
        $existingUsername = $this->db->get('users')->row();

        if ($existingUsername) {
            echo json_encode(['success' => false, 'message' => 'Username already exists']);
            return;
        }

        // Get form fields
        $username = $data['username'];
        $email = $data['email'];
        $password = password_hash($data['password'], PASSWORD_DEFAULT); // Hash the password
        $agreeTerms = $data['agreeTerms'];
      
        if (!$agreeTerms) {
            echo json_encode(['success' => false, 'message' => 'You must agree to the terms and conditions']);
            return;
        }
      
        // Prepare data for database insertion
        $insertData = [
          'username' => $username,
          'email' => $email,
          'password' => $password,
          'role' => 'user', // Default role
        ];
      
        // Insert into 'users' table
        if ($this->db->insert('users', $insertData)) {
            // Respond with success if insertion is successful
            echo json_encode(['success' => true, 'message' => 'User registered successfully']);
        } else {
            // Respond with failure if insertion fails
            echo json_encode(['success' => false, 'message' => 'Registration failed, please try again']);
        }
    }
}
