<?php
define('ROOT_DIR', __DIR__);

require_once ROOT_DIR . '/vendor/autoload.php';

use PaymentApp\Test\Controller\MainController;

if ($argc < 2) {
    die("Please give us your credit card number !\n");
}

//stores the credit card number from the command line argument
$creditCardNumber = $argv[1]; 

//creates an instance of the MainController class
$controller = new MainController();

//calls the run method of the MainController with $creditCardNumber as an argument then returns the payment status
$paymentStatus = $controller->run($creditCardNumber);

echo "Payment Status: " . $paymentStatus . PHP_EOL;
