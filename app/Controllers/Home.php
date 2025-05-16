<?php

namespace App\Controllers;
defined('BASEPATH') OR exit('No direct script access allowed');
class Home extends BaseController
{
    public function index(): string
    {
        return view('welcome_message');
    }
}
