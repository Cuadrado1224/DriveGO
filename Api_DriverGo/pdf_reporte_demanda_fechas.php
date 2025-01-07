<?php
include 'config.php';
header("Access-Control-Allow-Origin: " . FRONT_URL);
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require('FPDF/fpdf.php');
require_once 'bd.php';

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['fecha_inicio']) || empty($data['fecha_inicio']) || 
    !isset($data['fecha_fin']) || empty($data['fecha_fin'])) {
    echo json_encode(["error" => "Faltan los parámetros 'fecha_inicio' o 'fecha_fin' o están vacíos."]);
    exit;
}

$fecha_inicio = $data['fecha_inicio'];
$fecha_fin = $data['fecha_fin'];

if (!DateTime::createFromFormat('Y-m-d', $fecha_inicio) || !DateTime::createFromFormat('Y-m-d', $fecha_fin)) {
    echo json_encode(["error" => "Formato de fecha inválido. Use 'YYYY-MM-DD'."]);
    exit;
}

$sql_count = "SELECT COUNT(*) AS total_reportes
              FROM reservas r
              WHERE r.fec_res BETWEEN :fecha_inicio AND :fecha_fin";
$stmt_count = $conn->prepare($sql_count);
$stmt_count->bindParam(':fecha_inicio', $fecha_inicio, PDO::PARAM_STR);
$stmt_count->bindParam(':fecha_fin', $fecha_fin, PDO::PARAM_STR);
$stmt_count->execute();
$result_count = $stmt_count->fetch(PDO::FETCH_ASSOC);
$total_reportes = $result_count['total_reportes'];

$sql = "SELECT 
            v.mat_veh,
            v.mar_veh,
            v.mod_veh,
            COUNT(r.id_res) AS cantidad_reservas
        FROM reservas r
        INNER JOIN vehiculos v ON r.matricula_veh = v.mat_veh
        WHERE r.fec_res BETWEEN :fecha_inicio AND :fecha_fin
        GROUP BY v.mat_veh, v.mar_veh, v.mod_veh
        ORDER BY cantidad_reservas DESC";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':fecha_inicio', $fecha_inicio, PDO::PARAM_STR);
$stmt->bindParam(':fecha_fin', $fecha_fin, PDO::PARAM_STR);
$stmt->execute();
$vehiculos = $stmt->fetchAll(PDO::FETCH_ASSOC);

class PDF extends FPDF {
    function Header() {
        global $fecha_inicio, $fecha_fin;
        $this->SetFillColor(0, 102, 204);
        $this->Rect(0, 0, 210, 30, 'F');
        $this->Image('Logo-sin_fodo.png', 150, 0, 40);
        $this->SetFont('Arial', 'B', 20);
        $this->SetTextColor(255, 255, 255);
        $this->Cell(170, 15, iconv("UTF-8", "ISO-8859-1","Reporte de Vehículos Más Usados" ), 0, 1, 'L', false);
        $this->Ln(10);
    }

    function Footer() {
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 8);
        $this->SetTextColor(128, 128, 128);
        $this->Cell(0, 10, 'Página ' . $this->PageNo() . '/{nb}', 0, 0, 'C');
    }
}

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();

$pdf->SetFont('Arial', 'B', 12);
$pdf->SetTextColor(0, 0, 0);

if (!$vehiculos) {
    $pdf->Ln(20);
    $pdf->SetFont('Arial', 'B', 16);
    $pdf->Cell(0, 10, iconv("UTF-8", "ISO-8859-1", "No se encontraron datos para el rango de fechas especificado."), 0, 1, 'C');
} else {
    $pdf->Cell(0, 10, iconv("UTF-8", "ISO-8859-1","Rango de Fechas: $fecha_inicio a $fecha_fin"), 0, 1, 'L');
    $pdf->Cell(0, 10, iconv("UTF-8", "ISO-8859-1","Número de Reservas: $total_reportes"), 0, 1, 'L');
    $pdf->Ln(5);
    
    $pdf->SetFont('Arial', 'B', 10);
    $pdf->SetFillColor(0, 102, 204);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->Cell(40, 10, 'Matricula', 1, 0, 'C', true);
    $pdf->Cell(40, 10, 'Marca', 1, 0, 'C', true);
    $pdf->Cell(40, 10, 'Modelo', 1, 0, 'C', true);
    $pdf->Cell(40, 10, 'Cantidad de Reservas', 1, 1, 'C', true);
    
    $pdf->SetFont('Arial', '', 9);
    $pdf->SetTextColor(0, 0, 0);
    
    foreach ($vehiculos as $vehiculo) {
        $pdf->Cell(40, 10, $vehiculo['mat_veh'], 1, 0, 'C');
        $pdf->Cell(40, 10, $vehiculo['mar_veh'], 1, 0, 'C');
        $pdf->Cell(40, 10, $vehiculo['mod_veh'], 1, 0, 'C');
        $pdf->Cell(40, 10, $vehiculo['cantidad_reservas'], 1, 1, 'C');
    }
}

$pdf->Output('D', 'reporte_vehiculos_rango_fechas_' . $fecha_inicio . '_a_' . $fecha_fin . '.pdf');
?>
