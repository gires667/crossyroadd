<?php

namespace App\DataFixtures;

use App\Entity\Users;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

   class UsersFixture extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $user = new Users();
        $user->setName("gires667");
        $user->setEmail("gires8585@gmail.com");
        $user->setPassword("gigi555g");

        // $product = new Product();
        // $manager->persist($product);

        $manager->persist($user);
        $manager->flush();
    }
}
