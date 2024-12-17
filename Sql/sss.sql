UPDATE USUARIOS SET nom_usu='pepe',ape_usu='perez',corr_usu='pp@gmail.com',cargo='Administrador' where id_usu=1;
INSERT INTO USUARIOS(nom_usu,ape_usu,corr_usu,con_usu,cargo) values ('Alejandro','perez','ale@gmail.com','123456','Administrador');

Select * from usuarios;

Delete from Usuarios where id_usu=6;

SELECT *FROM VEHICULOS;

INSERT INTO VEHICULOS(MAT_VEH,MAR_VEH,MOD_VEH,TIP_VEH,ANIO_VEH,EST_VEH,TIP_TRANS_VEH,KIL_VEH,NUM_OCU_VEH,NUM_PUE_VEH,IMG_VEH)
VALUES('TAA-2460','TOYOTA','landcruise','4X4','2020','DISPONIBLE','MANUAL',20000,4,5,'HOLA.PNG');

SELECT MAR_VEH,MOD_VEH,ANIO_VEH,TIP_VEH,MAT_VEH,EST_VEH FROM VEHICULOS;

DELETE FROM VEHICULOS WHERE MAT_VEH='TAA-2460';

ALTER TABLE usuarios ADD COLUMN cont_temp VARCHAR(20), ADD COLUMN tmp_cont VARCHAR(2);
SELECT *FROM USUARIOS ;

UPDATE USUARIOS SET CONT_TEMP='152FGHJ',TMP_CONT='si' where id_usu=4;
ALTER TABLE vehiculos
ADD COLUMN precio_veh NUMERIC(10, 2) DEFAULT 0.00;


ALTER TABLE usuarios
ALTER COLUMN tmp_cont SET DEFAULT 'no';

select id_usu from usuarios where cont_temp='65d864f2';
ALTER TABLE USUARIOS 
ADD COLUMN verificado BOOLEAN DEFAULT FALSE, 
ADD COLUMN codigo_verificacion VARCHAR(255);


UPDATE Vehiculos SET precio_veh=30 where mat_veh='TAA-3456';
