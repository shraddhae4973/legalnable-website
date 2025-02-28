<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class CorsFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        return service('response')
            ->setHeader('Access-Control-Allow-Origin', '*')  // Allow all origins
            ->setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // No implementation needed for after.
    }
}
