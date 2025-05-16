<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class EventImages extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'        => [
                'type'           => 'INT',
                'constraint'     => 11,
                'auto_increment' => true,
            ],
            'event_id'  => [
                'type'           => 'INT',
                'constraint'     => 11,
                'null'           => false,
            ],
            'imgSrc'    => [
                'type'           => 'TEXT',
                'null'           => false,
            ],
        ]);
        
        // Foreign Key Constraint
        $this->forge->addForeignKey('event_id', 'events', 'id', 'CASCADE', 'CASCADE');
        
        $this->forge->addKey('id', true);
        $this->forge->createTable('event_images');
    }

    public function down()
    {
        $this->forge->dropTable('event_images');
    }
}
