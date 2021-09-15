Implementação do exemplo “[Box Selection](https://openlayers.org/en/latest/examples/box-selection.html)” do Openlayers usando JSON de [estados do Brasil](https://www.rocklabdigital.com/static/geojson/estado.geojson)
em vez de países do mundo.


# Motivação

A aplicação original requer que o usuário selecione no mapa, usando a tecla control, alguns países e o output será os países selecionados dentro do quadrado desenhado. 
O objetivo é executar a aplicação localmente e disponibilizar o código para ser executado pelos avaliadores. 
O Openlayers é uma biblioteca de visualização de mapas e pode ser usada com ou sem Node. 


# Requisitos

* Versionamento em Git com entrega através do Github, Bitbucket ou Gitlab com acesso público
* Editar o README.md com as instruções para usar a aplicação (ex: “Abrir o arquivo html/index.html”) e possíveis linhas de comandos para levantar servidor (caso use node)


# Ferramentas:

* O exemplo usa como padrão um geojson para os contornos dos países. Disponibilizamos um geojson dos estados do Brasil, mas, 
caso encontre outro geojson mais conveniente na internet, pode usá-lo sem problemas.
* Recomendamos o uso do Visual Studio Code

* Usando Node
  * https://www.npmjs.com/package/ol 
  * https://parceljs.org/getting_started.html
  * https://openlayers.org/en/latest/doc/tutorials/bundle.html 
* Instanciando um mapa sem usar Node
  * https://openlayers.org/en/latest/doc/quickstart.html 

