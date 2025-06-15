<?php

namespace App\Entity;

use App\Repository\ObstaclesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ObstaclesRepository::class)]
class Obstacles
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $Type = null;

    #[ORM\Column]
    private ?int $Speed = null;

    #[ORM\Column]
    private ?float $Frequency = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->Type;
    }

    public function setType(string $Type): static
    {
        $this->Type = $Type;

        return $this;
    }

    public function getSpeed(): ?int
    {
        return $this->Speed;
    }

    public function setSpeed(int $Speed): static
    {
        $this->Speed = $Speed;

        return $this;
    }

    public function getFrequency(): ?float
    {
        return $this->Frequency;
    }

    public function setFrequency(float $Frequency): static
    {
        $this->Frequency = $Frequency;

        return $this;
    }
}
