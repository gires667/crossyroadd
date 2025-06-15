<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Score;

class ScoreController extends AbstractController
{
    #[Route('/api/save-score', name: 'save_score', methods: ['POST'])]
    public function saveScore(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $scoreValue = $data['score'] ?? null;

        if ($scoreValue === null || !is_numeric($scoreValue)) {
            return new JsonResponse(['error' => 'Score invalide.'], 400);
        }

        $score = new Score();
        $score->setValue((int)$scoreValue);
        $score->setCreatedAt(new \DateTimeImmutable());

        $em->persist($score);
        $em->flush();

        return new JsonResponse(['message' => 'Score enregistré avec succès.']);
    }
}
