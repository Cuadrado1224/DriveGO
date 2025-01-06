<?php
require('../FPDF/fpdf.php'); 

require_once 'bd.php';
include 'config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['cedula_usu'])) {
    echo json_encode(["error" => "Falta el ID de la reserva."]);
    exit;
}

$cedula_usu = $data['cedula_usu'];

$stmt = $conn->prepare("SELECT r.ced_usu_res, r.nom_usu_res, r.matricula_veh, r.fec_res, r.fec_dev, v.mar_veh, v.mod_veh, v.anio_veh, v.tip_trans_veh, v.chasis, v.mat_veh
                        FROM reservas r
                        JOIN vehiculos v ON r.matricula_veh = v.mat_veh
                        WHERE r.ced_usu_res = ?");
$stmt->execute([$cedula_usu]);
$reserva = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$reserva) {
    echo json_encode(["error" => "No se encontró la reserva."]);
    exit;
}

function limpiarTexto($texto) {
    $buscar = array('Ñ', 'ñ', '°', 'N°', '°', 'ª', 'º');
    $reemplazar = array('N', 'n', '', '', '', '', '');
    return str_ireplace($buscar, $reemplazar, $texto);
}

$cedulaUsuario = limpiarTexto($reserva['ced_usu_res']);
$nombreUsuario = limpiarTexto($reserva['nom_usu_res']);
$matriculaVehiculo = limpiarTexto($reserva['matricula_veh']);
$fechaReserva = limpiarTexto($reserva['fec_res']);
$fechaDevolucion = limpiarTexto($reserva['fec_dev']);
$marcaVehiculo = limpiarTexto($reserva['mar_veh']);
$modeloVehiculo = limpiarTexto($reserva['mod_veh']);
$anioVehiculo = limpiarTexto($reserva['anio_veh']);
$transmisionVehiculo = limpiarTexto($reserva['tip_trans_veh']);
$chasisVehiculo = limpiarTexto($reserva['chasis']);

$pdf = new FPDF();
$pdf->AddPage();

$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 10, iconv('UTF-8', 'ISO-8859-1', 'CONTRATO DE ALQUILER DE VEHÍCULO'),0,1,'C');
$pdf->Ln(10);

$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Conste por el presente documento el contrato de alquiler de vehiculo, el usuario $nombreUsuario, identificado con numero de cedula $cedulaUsuario, a quien en lo sucesivo se denominara EL ARRENDADOR; y de otra parte la empresa DRIVE GO con sede en la Universidad Tecnica de Ambato, a quien en lo sucesivo se denominara EL ARRENDATARIO, con los siguientes terminos:");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'PRIMERO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "EL ARRENDADOR es propietario del vehiculo usado, marca $marcaVehiculo, modelo $modeloVehiculo, ano de fabricacion $anioVehiculo, con tipo de transmision $transmisionVehiculo, No de chasis $chasisVehiculo y con placa de rodaje No $matriculaVehiculo.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'SEGUNDO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "EL ARRENDADOR deja constancia que el vehiculo a que se refiere la clausula anterior se encuentra en buen estado de funcionamiento mecanico y conservacion de carroceria, pintura y accesorios, sin mayor desgaste que el producido por el uso normal y ordinario.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'TERCERO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Por el presente contrato, EL ARRENDADOR se obliga a ceder el uso del bien descrito en la clausula primera en favor de EL ARRENDATARIO, a titulo de alquiler. Por su parte, EL ARRENDATARIO se obliga a pagar a EL ARRENDADOR el monto de la renta pactada en la clausula siguiente, en la forma y oportunidad convenidas.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'CUARTO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Las partes acuerdan que el monto de la renta que pagara EL ARRENDATARIO en calidad de contraprestacion por el uso del bien asciende a la suma de PRECION_FINAL dolares; cantidad que sera cancelada en dinero, en la forma y oportunidad a que se refiere la clausula siguiente.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'QUINTO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Las partes convienen fijar un plazo de duracion determinada para el presente contrato, el cual sera desde $fechaReserva hasta el dia $fechaDevolucion; fecha en la que EL ARRENDATARIO esta obligado a devolver el bien arrendado.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'SEXTO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "EL ARRENDADOR se obliga a entregar el bien objeto de la prestacion a su cargo en la fecha de suscripcion de este documento, sin mas constancia que las firmas de las partes puestas en el. Esta obligacion se verificara con la entrega fisica del vehiculo, las llaves y la tarjeta de propiedad del mismo.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'SEPTIMO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "EL ARRENDATARIO se obliga a pagar de forma inmediata el monto de la renta, en la forma, oportunidad y lugar pactados, con sujecion a lo convenido en las clausulas cuarta y quinta.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'OCTAVO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "EL ARRENDATARIO se obliga a destinar el bien arrendado unica y exclusivamente para uso o transporte particular. En consecuencia, queda establecido que EL ARRENDATARIO es la persona principal autorizada para conducir el vehiculo.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'NOVENO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "De otro lado, EL ARRENDATARIO esta obligado a efectuar por cuenta y costo propio las reparaciones y mantenimientos que sean necesarios para conservar el vehiculo en el mismo estado en que fue recibido.");
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'DECIMO:', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, "Asi tambien, EL ARRENDATARIO queda prohibido de introducir mejoras, cambios o alteraciones internas y externas en el bien arrendado y sus accesorios, sin el consentimiento expreso y por escrito de EL ARRENDADOR.");
$pdf->Ln(10);

$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 10, 'En senal de conformidad las partes suscriben este documento en la ciudad de Ambato, a los ___ dias del mes de ______ de _____.');
$pdf->Ln(10);

$pdf->Cell(90, 10, '_____________________', 0, 0, 'C');
$pdf->Cell(90, 10, '_____________________', 0, 1, 'C');
$pdf->Cell(90, 10, 'EL ARRENDADOR', 0, 0, 'C');
$pdf->Cell(90, 10, 'EL ARRENDATARIO', 0, 1, 'C');

$pdf->Output();
?>
