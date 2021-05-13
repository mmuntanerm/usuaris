EXEC	[planificacio].[dbo].[ViatgesCompletsLinia_a_data_no_lin]		@lafecha = '13/05/21', @mLinea = '%' , @ShowResults=0 ;


-- Sortides de capçalera (amb key)
select 
	 linea*1e10+sentido*1e8+nododesde*1e4+nodohasta vjkey,
	 right(tipodia, 3) TpDIA
	,linea 
	, sentido, ruta, sublinea
	,Nodo, Nombre, evento
	, instanteTEO, convert(varchar(5), dateadd(s, instanteTEO, 0), 108) HRPas
	, NombreDesde ,NombreHasta, NodoDesde ,NodoHasta
	from  ##ViatgesLiniaDetall 
where 
	linea between 1 and 85
and evento in (11,3) --  and sentido =  1 
order by linea , sentido, instanteTEO; 


-- Rutes Viatges .. categories  
with RutasViajes as (
	select 
		 right(tipodia, 3)  asTpDIA
		,linea 
		, sentido
		, ruta, sublinea
		, NodoDesde , NombreDesde ,NodoHasta, nombreHasta
		,Nodo, Nombre
		, count(1) NumViatges
		from  ##ViatgesLiniaDetall 
	where 
		linea between 1 and 85
	and evento in (11,3) --  and sentido =  1 
	group by  
			right(tipodia, 3) ,linea, sentido
			, ruta, sublinea
			, NodoDesde, nombreDesde ,NodoHasta, nombreHasta
			,Nodo, Nombre
) 
select 
	linea*1e10+sentido*1e8+nododesde*1e4+nodohasta vjkey,
	r.* 
	, row_number() over(partition by linea, sentido  order by linea asc , sentido asc , NumViatges desc ) Categoria 
	, 'C' +  cast( row_number() over(partition by linea, sentido  order by linea asc , sentido asc , NumViatges desc ) as varchar)  CategoriaChar
from RutasViajes r
order by linea asc , sentido asc , NumViatges desc ; 





-- Linies ... 
select * from SAEBaseNext.dbo.Lineas l 

-- altres infos 
select * from SAEBaseNext.dbo.Rutas r; 
select * from SAEBaseNext.dbo.Sublineas s;
select * from SAEBaseNext.dbo.Nodos n;


-- Sortides de capçalera 
with Sortides as (
select 
	 linea*1e10+sentido*1e8+nododesde*1e4+nodohasta vjkey,
	 right(tipodia, 3) TpDIA
	,linea 
	, sentido, ruta, sublinea
	,Nodo, Nombre, evento
	, instanteTEO, convert(varchar(5), dateadd(s, instanteTEO, 0), 108) HRPas
	, NombreDesde ,NombreHasta, NodoDesde ,NodoHasta
	from  ##ViatgesLiniaDetall 
where 
	linea between 1 and 85
and evento in (11,3) 
)
	-- Rutes Viatges .. categories  
, RutasViajes as (
	select 
		 right(tipodia, 3)  asTpDIA
		,linea 
		, sentido
		, ruta, sublinea
		, NodoDesde , NombreDesde ,NodoHasta, nombreHasta
		,Nodo, Nombre
		, count(1) NumViatges
		from  ##ViatgesLiniaDetall 
	where 
		linea between 1 and 85
	and evento in (11,3) --  and sentido =  1 
	group by  
			right(tipodia, 3) ,linea, sentido
			, ruta, sublinea
			, NodoDesde, nombreDesde ,NodoHasta, nombreHasta
			,Nodo, Nombre
)
, rutesViatgesAmbCategoria as (   
select 
	linea*1e10+sentido*1e8+nododesde*1e4+nodohasta vjkey,
	r.* 
	, row_number() over(partition by linea, sentido  order by linea asc , sentido asc , NumViatges desc ) categoria
from RutasViajes r
) 
-- select * from rutesViatgesAmbCategoria order by linea asc , sentido asc , NumViatges desc ;
-- select * from  Sortides order by linea , sentido, instanteTEO;
select 
	s.*
	,r.NumViatges as NumViajes
	,r.categoria 
	,'C'+cast ( r.categoria as varchar(2) )  categoriaChar
from Sortides s  
left join rutesViatgesAmbCategoria r 
	on s.linea = r.linea and s.sentido = r.sentido and s.NodoDesde=r.NodoDesde  and s.NodoHasta=r.NodoHasta   and s.ruta =r.ruta and s.sublinea = r.sublinea   -- s.vjkey = r.vjkey 
order by s.linea , s.sentido, s.instanteTEO;



















































