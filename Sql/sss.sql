UPDATE USUARIOS SET nom_usu='pepe',ape_usu='perez',corr_usu='pp@gmail.com',cargo='Administrador' where id_usu=1;
INSERT INTO USUARIOS(nom_usu,ape_usu,corr_usu,con_usu,cargo) values ('Alejandro','perez','ale@gmail.com','123456','Administrador');

Select * from usuarios;

Delete from Usuarios where id_usu=6;

SELECT *FROM VEHICULOS;

INSERT INTO VEHICULOS(MAT_VEH,MAR_VEH,MOD_VEH,TIP_VEH,ANIO_VEH,EST_VEH,TIP_TRANS_VEH,KIL_VEH,NUM_OCU_VEH,NUM_PUE_VEH,IMG_VEH)
VALUES('TAA-2450','TOYOTA','landcruise','4X4','2020','DISPONIBLE','MANUAL',20000,4,5,'HOLA.PNG');