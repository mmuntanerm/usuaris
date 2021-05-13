/*
 * 
 *  Viatges complets de totes les linies a data per totes les parades ( només es detallen hores de pas teoriques de les parades on s'ha definit la informació) 
 *  
 * 
 * 
 */

EXEC	[planificacio].[dbo].[ViatgesCompletsLinia_a_data_no_lin]		@lafecha = '11/05/21', @mLinea = '%' , @ShowResults=0 ;

select 
 INFO2
 ,Tipodia
,linea
,Sublinea
,ruta
,coche
,servicio
,numviaje
,PosicionDesde
,NodoDesde
,NombreDesde
,PosicionHasta
,NodoHasta
,NombreHasta
,DistanciaViaje
,hinici
,hfinal
,franjacabe
,FranjaCabeR
,Sentido
,Destino
,Posicion
,Nodo
,Atributos
,Nombre
,Evento
,instanteTEO
from ##ViatgesLiniaDetall 
-- where servicio = '003003'
order by servicio,numviaje, posicion, InstanteTEO;



