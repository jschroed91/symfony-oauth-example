<?php
/**
 * Created by PhpStorm.
 * User: JoshSchroeder
 * Date: 2/10/16
 * Time: 4:38 PM
 */

namespace AppBundle\EventListener;

use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManager;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    /**
     * @var ManagerRegistry
     */
    protected $registry;

    public function __construct(ManagerRegistry $registry)
    {
        $this->registry = $registry;
    }

    public function onLexikjwtauthenticationOnjwtcreated(JWTCreatedEvent $event)
    {
        $em = $this->registry->getManager();
        $data = $event->getData();
        $data['wownewfield'] = 'muchcool';
        $event->setData($data);
    }
}