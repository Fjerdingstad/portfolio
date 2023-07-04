<?php
namespace PaymentApp\Test\Service\Conf;

class Conf
{
    public static function getConf()
    {
        return json_decode(file_get_contents(ROOT_DIR . '/etc/conf.json'), true);
    }
}
