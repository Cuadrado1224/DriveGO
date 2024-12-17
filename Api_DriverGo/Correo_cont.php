<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true'); // Si usas cookies o sesiones

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // Respuesta sin contenido para solicitudes preflight
    exit;
}
include 'bd.php'; 
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$input = json_decode(file_get_contents(filename: 'php://input'), associative: true);

if (isset($input['email'])){
 $correo=$input['email'];
 $cfm='si';
 try{
 $query="select Id_usu from usuarios where corr_usu=:correo;";
 $stmt = $conn->prepare($query);
 $stmt->execute(params:[
    ':correo'=>$correo
 ]);
  if($stmt->rowCount() > 0){
    $usuarios = $stmt->fetch(PDO::FETCH_ASSOC);
    $id_usu=$usuarios['id_usu'];
    $Temporal = bin2hex(random_bytes(4));//tenemos que ecriptar 
    $query2="UPDATE USUARIOS SET CONT_TEMP=:cod,TMP_CONT=:cfm where id_usu=:id;";
    $stmt2 = $conn->prepare($query2);
    $stmt2->execute(params:[
    ':id'=>$id_usu,
    ':cod'=>$Temporal,
    ':cfm'=>$cfm
 ]);
   
 $mail = new PHPMailer(true);

 try {
     $mail->isSMTP();
     $mail->Host = 'smtp.gmail.com';
     $mail->SMTPAuth = true;
     $mail->Username = 'proyectodrivego@gmail.com';//correo
     $mail->Password = 'pvzv calt sawy eotu'; //contraseña
     $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
     $mail->Port = 587;

     $mail->setFrom('proyectodrivego@gmail.com', 'DriveGo');
     $mail->addAddress($correo);

     $mail->isHTML(true);
     $mail->Subject = 'Contraseña temporal';
     $mail->Body = "Su contraseña temporal es : <b>$Temporal</b>, para iniciar el proceso debe loguearse e ingresar el correo y la contraseña temporal, la cual lo redireccionara a otra pagina para su debido cambio";

     $mail->send();
     $response=array(
        "status"=>true,
        "message"=>"Correo enviado exitosamente"
    );
 }catch(PDOException $e){
    $response=array(
        "status"=>false,
        "message"=>"No se pudo enviar el correo ". $e->getMessage()
    );
}
 
  }else{
    $response=array(
        "status"=>false,
        "message"=>"Usuario no econtrado"
    );
  }
}catch(PDOException $e){
    $response=array(
        "status"=>false,
        "message"=>"Error en el servidor ". $e->getMessage()
    );
}
}else{
    $response=array(
        "status"=>false,
        "message"=>"Datos incompletos"
    );
}

$conn=null;
header('Content-Type: application/json');
echo json_encode($response);


?>