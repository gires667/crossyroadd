<?php

namespace App\DataFixtures;

use App\Entity\Character;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CharacterFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);
        $character = new Character();
        $character->setName("Fowly");
        $character->setUnlocked(1);
        $manager->persist($character);

        $manager->flush();
    }
}
