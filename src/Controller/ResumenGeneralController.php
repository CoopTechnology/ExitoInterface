<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ResumenGeneralController extends Controller{

    /**
     * @Route("/")
     * @Method({"GET"})
     */

    public function indexAction() {
        return $this->render('dashboard/dashboard.html.twig');
    }
}