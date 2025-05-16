<?php

namespace App\Models;

use CodeIgniter\Model;

class EventImageModel extends Model
{
    protected $table = 'event_images';
    protected $primaryKey = 'id';
    protected $allowedFields = ['event_id', 'imgSrc'];
}
?>