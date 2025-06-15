<?php

namespace App\Entity;

use App\Repository\GamesessionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GamesessionRepository::class)]
class Gamesession
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $player_ID = null;

    #[ORM\Column]
    private ?int $Score = null;

    #[ORM\Column]
    private ?int $obstacles_hit = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTime $time_lasted = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayerID(): ?int
    {
        return $this->player_ID;
    }

    public function setPlayerID(int $player_ID): static
    {
        $this->player_ID = $player_ID;

        return $this;
    }

    public function getScore(): ?int
    {
        return $this->Score;
    }

    public function setScore(int $Score): static
    {
        $this->Score = $Score;

        return $this;
    }

    public function getObstaclesHit(): ?int
    {
        return $this->obstacles_hit;
    }

    public function setObstaclesHit(int $obstacles_hit): static
    {
        $this->obstacles_hit = $obstacles_hit;

        return $this;
    }

    public function getTimeLasted(): ?\DateTime
    {
        return $this->time_lasted;
    }

    public function setTimeLasted(\DateTime $time_lasted): static
    {
        $this->time_lasted = $time_lasted;

        return $this;
    }
}
