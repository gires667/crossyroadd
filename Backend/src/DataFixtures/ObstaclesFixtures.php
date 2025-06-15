<?php

namespace App\DataFixtures;

use App\Entity\Obstacles;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ObstaclesFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);
        $river = new Obstacles();
        $river->setType("River");
        $river->setSpeed(0);
        $river->setFrequency(1.0);
        $manager->persist($river);


        $cable = new Obstacles();
        $cable->setType("Cable");
        $cable->setSpeed(0);
        $cable->setFrequency(1.0);
        $manager->persist($cable);


        $cars = new Obstacles();
        $cars->setType("Cars");
        $cars->setSpeed(50);
        $cars->setFrequency(5.0);
        $manager->persist($cars);


        $chickentrap = new Obstacles();
        $chickentrap->setType("Chickentrap");
        $chickentrap->setSpeed(0);
        $chickentrap->setFrequency(2.0);
        $manager->persist($chickentrap);

        $manager->flush();
    }
}
