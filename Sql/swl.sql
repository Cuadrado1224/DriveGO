Drop table Usuarios;
Create table Usuarios(
ID_USU SERIAL PRIMARY KEY,
CED_USU VARCHAR(10),
NOM_USU VARCHAR(15) NOT NULL,
APE_USU VARCHAR(20) NOT NULL,
CORR_USU VARCHAR(20) NOT NULL,
CON_USU VARCHAR(20) NOT NULL,
CARGO VARCHAR(15) NOT NULL,
TMP_CONT VARCHAR(2) DEFAULT 'no',
CONT_TEMP VARCHAR(20)
) ;
SELECT nom_usu,ape_usu,corr_usu,cargo FROM Usuarios;
Insert into Usuarios(NOM_USU,APE_USU,CORR_USU,CON_USU,CARGO) values ('Alan','Cuadrado','Adminr@gmail.com','12345','Administrador');
Insert into Usuarios(NOM_USU,APE_USU,CORR_USU,CON_USU,CARGO) values ('Ismael','Cuadrado','Adminr@gmail.com','12345','Administrador');
