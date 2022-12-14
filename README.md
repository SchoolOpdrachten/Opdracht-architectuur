# Opdracht-architectuur
De **DOCKER** opdracht

week 13 (Architectuur):
* inlezen hoe tf je docker gebruikt en aanmaakt
* maak 2 docker containers voor de microservices
* draai de front-end in nog een aparte docker container

# brightspace opdracht
Scroll naar beneden voor een 'stappenplan'.

Er is een klein gedeelte  van de website gemaakt voor het Pretpark Den Haag, in React met een .NET backend. 

Gebruikers kunnen een lijst van attracties zien. Gebruikers kunnen ook attracties toevoegen (in de toekomst mogen natuurlijk alleen medewerkers dit). 
Gebruikers kunnen vragen om een attractie in de buurt, waar het niet zo druk is. 
De opdracht bestaat uit twee delen. 

## Deel 1
Aan jou is de taak om tenminste twee microservices te maken in de backend: 
* Een microservice die alles gerelateerd aan attracties doet: attracties opvragen, aanpassen, toevoegen en verwijderen. 
* Een microservice die de ingewikkelde berekening doet om een attractie-suggestie te doen. 

Draai elke microservice in een aparte Docker container. Draai ook de frontend in een aparte Docker container. 
* Je zult de CORS instellingen moeten aanpassen om cross-domain requests te kunnen doen.
* De suggestie microservice zal dus een API request moeten doen naar de attractie microservice. 

Draai SQL server ook in een (of twee) aparte Docker container(s). 

Dit zijn ongeveer de stappen die je kunt nemen: 

1. Probeer de applicatie te draaien met "dotnet run". Je zult tegen fouten aan lopen: de database moet worden aangemaakt met "dotnet ef migrations add 1" en "dotnet ef database update", en mogelijk krijg je HTTPS fouten die je moet verbeteren. 
2. Als de applicatie het doet, gaan we de frontend en backend los van elkaar runnen. Zet twee mappen ("frontend" en "backend") naast elkaar, en sleep de inhoud van "ClientApp" naar "frontend" en sleep de rest naar "backend". Start de frontend op met "npm run start" en start de backend op met "dotnet run". Je zult zien dat de fetch aanroepen in de frontend, niet meer bij de backend terecht komen, omdat de proxy in "setupProxy.js" niet meer werkt. Dat kan verbeterd worden door daar de port van de backend correct aan te geven. Het is echter makkelijker om de fetch direct naar de backend te doen. Daarvoor moet je wel even de CORS instellingen in de backend aanpassen naar AllowAnyMethod/AllowAnyHeader/AllowAnyOrigin (of ingewikkelder: door alleen de frontend toe te staan). 
3. Dupliceer nu de "backend" folder, en verwijder de AttractieController in de eerste en de SuggestieController in de tweede. Zorg ervoor dat de overblijvende Controllers op andere poorten runnen. 
4. De twee microservices hebben nu allebei een eigen database, maar er is overlap tussen de tabellen. Verwijder voor de microservices de DbSets die niet nodig zijn, en roep vanuit de microservice voor de suggesties de API aan van de microservice voor de attracties. 
5. Start de twee dotnet en de node omgeving. Zorg ervoor dat de vorige stappen zijn gelukt en verifieer dat de applicatie werkt, voordat je met Docker begint. Maak drie Dockerfile's, waarvan twee de image "mcr.microsoft.com/dotnet/sdk" gebruiken, en waarvan één de image "node" gebruikt. Run de drie Dockerfile's in containers en zorg dat het werkt. 
6. Run nu een container met image "mcr.microsoft.com/mssql/server" en de juiste configuratie (wachtwoord, etc.). Probeer vanuit vanuit één van de twee microservices connectie te maken naar deze sql server. Als dat lukt kan je of een aparte sql server container aanmaken voor de tweede microservice (netjes), of een tweede database aanmaken in dezelfde container (minder netjes). 
7. Maak een docker-compose aan waarin je de drie Dockerfile's in drie verschillende containers runt, en daarnaast de database container(s). 

## Deel 2 (extra)
Doe deze opdracht alleen als je het leuk vind. 

Aan jou is de taak om de attractie-lijst real-time te maken. Dat wil zeggen dat als een medewerker een attractie toevoegt of verwijderd (misschien is de attractie wel aan onderhoud toe), dat een gebruiker dat direct ziet op de webpagina. Maak daarbij dus gebruik van websockets. 