<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class InicioController extends Controller{

    /**
     * @Route("/")
     * @Method({"GET"})
     */

    public function indexAction() {
//        return new Response('<html><h1>Hellow!</h1></html>');
        return $this->render('base.html.twig');
    }

}