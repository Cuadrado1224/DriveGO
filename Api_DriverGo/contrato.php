<?php
require('FPDF/fpdf.php'); 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$pdf = new FPDF();
$pdf->AddPage();

$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 10, 'CONTRATO DE ALQUILER DE VEHICULO', 0, 1, 'C');
$pdf->Ln(10);

$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Conste por el presente documento el contrato de alquiler de vehiculo, el usuario ______________, identificado con numero de cedula ______________, a quien en lo sucesivo se denominara EL ARRENDADOR; y de otra parte la empresa DRIVE GO con sede en la Universidad Tecnica de Ambato, a quien en lo sucesivo se denominara EL ARRENDATARIO, con los siguientes terminos:");
$pdf->Ln(10);

$clausulas = [
    "PRIMERO" => "EL ARRENDADOR es propietario del vehiculo usado, marca ______________, modelo ______________, ano de fabricacion ______________, con tipo de transmision ______________, No de chasis ______________ y con placa de rodaje No ______________.",
    "SEGUNDO" => "EL ARRENDADOR deja constancia que el vehiculo a que se refiere la clausula anterior se encuentra en buen estado de funcionamiento mecanico y conservacion de carroceria, pintura y accesorios, sin mayor desgaste que el producido por el uso normal y ordinario.",
    "TERCERO" => "Por el presente contrato, EL ARRENDADOR se obliga a ceder el uso del bien descrito en la clausula primera en favor de EL ARRENDATARIO, a titulo de alquiler. Por su parte, EL ARRENDATARIO se obliga a pagar a EL ARRENDADOR el monto de la renta pactada en la clausula siguiente, en la forma y oportunidad convenidas.",
    "CUARTO" => "Las partes acuerdan que el monto de la renta que pagara EL ARRENDATARIO en calidad de contraprestacion por el uso del bien asciende a la suma de ______________ dolares; cantidad que sera cancelada en dinero, en la forma y oportunidad a que se refiere la clausula siguiente.",
    "QUINTO" => "Las partes convienen fijar un plazo de duracion determinada para el presente contrato, el cual sera desde ______________ hasta el dia ______________; fecha en la que EL ARRENDATARIO esta obligado a devolver el bien arrendado.",
    "SEXTO" => "EL ARRENDADOR se obliga a entregar el bien objeto de la prestacion a su cargo en la fecha de suscripcion de este documento, sin mas constancia que las firmas de las partes puestas en el. Esta obligacion se verificara con la entrega fisica del vehiculo, las llaves y la tarjeta de propiedad del mismo.",
    "SEPTIMO" => "EL ARRENDATARIO se obliga a pagar de forma inmediata el monto de la renta, en la forma, oportunidad y lugar pactados, con sujecion a lo convenido en las clausulas cuarta y quinta.",
    "OCTAVO" => "EL ARRENDATARIO se obliga a destinar el bien arrendado unica y exclusivamente para uso o transporte particular. En consecuencia, queda establecido que EL ARRENDATARIO es la persona principal autorizada para conducir el vehiculo.",
    "NOVENO" => "De otro lado, EL ARRENDATARIO esta obligado a efectuar por cuenta y costo propio las reparaciones y mantenimientos que sean necesarios para conservar el vehiculo en el mismo estado en que fue recibido.",
    "DECIMO" => "Asi tambien, EL ARRENDATARIO queda prohibido de introducir mejoras, cambios o alteraciones internas y externas en el bien arrendado y sus accesorios, sin el consentimiento expreso y por escrito de EL ARRENDADOR."
];

foreach ($clausulas as $titulo => $contenido) {
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(0, 10, $titulo . ':', 0, 1, 'L');
    $pdf->SetFont('Arial', '', 12);
    $pdf->MultiCell(0, 10, $contenido);
    $pdf->Ln(10);
}

$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, 'En senal de conformidad las partes suscriben este documento en la ciudad de Ambato, a los ___ dias del mes de ______ de _____.');
$pdf->Ln(10);

$pdf->Cell(90, 10, '_____________________', 0, 0, 'C');
$pdf->Cell(90, 10, '_____________________', 0, 1, 'C');
$pdf->Cell(90, 10, 'EL ARRENDADOR', 0, 0, 'C');
$pdf->Cell(90, 10, 'EL ARRENDATARIO', 0, 1, 'C');

$pdf->Output();
?>
