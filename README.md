# CCW19-WeatherApp

## Konfiguracja webpacka

Po co nam to?

Webpack pozwoli nam stworzyć wersję produkcyjną naszej aplikacji.

Pada? jest aplikacją pogodową, która pozwala uzyskać informację na temat bieżących, a także przyszłych warunków pogodowych wybranej lokalizacji. Informacje wykorzystywane w naszej aplikacji pochodzą z "Hourly forecast by OpenWeatherMap!".

   Odpalamy konsole i przechodzimy do głównego katalogu projektu - instalujemy wszystkie biblioteki za pomocą `npm install`.

Oto demo wersja naszej aplikacji : https://malgoskabou.github.io/CoolWeatherApp/

Aplikacja jest intuicyjna i zawiera jeden główny ekran. Jeśli użytkownik poprzednio korzystał z aplikacji, po ponownym uruchomieniu będzie ona wyświetlała pogodę dla ostatniego zapisu. Jeśli użytkownik korzysta po raz pierwszy zostaną wyświetlone dane pogodowe dla dla miejsca, gdzie użytkownik zostanie zlokalizowany(gdy lokalizacja jest dostępna):

![główny ekran aplikacji](./screens/main.png)

Użytkownik uzyskuje szczegółowe informacje na temat pogody wybranego miasta w konkretnym dniu:

![szczegółowa pogoda na dany dzień](./screens/details.png)

A takaże ogólne informacje na temat pogody w najbliższych dniach:

![pogoda na przyszłe dni](./screens/next.png)

W każdej chwili istnieje możliwość zmiany lokalizacji, zarówno po wpisaniu konkretniej miejscowości(pomocą jest tu lista  podpowiedzi miejscowości w Polsce) jak i po geolokalizacji:

![wprowadź miasto lub zlokalizuj](./screens/find.png)

Aplikacja jest przyjazna użytkownikowi i informuje o ewentualnych przeszkodach, jak np. błędnie wpisane miastobr czy ak zgody na lokalizację:

![źle wpisane miasto](./screens/error.png)

##  Użyte technologie

- HTML, CSS,
- JS,
- Google Places API
- Google Geolocation API

## Uruchomienie

Należy przejść do głównego katalogu projektu i zainstalować wszystkie biblioteki za pomocą `npm install`.
W celu uruchomienia serwera developerskiego wpisujemy polecenie: `npm run dev` i naciskamy enter. 

## Struktura plików aplikacji

#### 1. src - folder gromadzący treści splikacji

 - **icons** - tu znajdziesz wykorzystane w aplikacji ikonki.

- **js** - folder będący pudełkiem na wszystkie js'owe skrypty:
    - `currenDate.js` - plik z kodem pobierającym aktualną datę,
    - `geolocation.js` - plik z funkcją geolokalizacji,
    - `townSearcher.js` - plik z kodem do podpowiedzi w wyszukiwaniu miast,
    - `loadingScreen.js`- kod dla ekranu ładowania strony,
    - `errorHandling.js` - obsługa błędów,
    - `readingInput.js`- kod pobierający lokalizację lub wpisane miasto do wyświetlania pogody,
    - `localStorage.js` - kod odpowiedzialny za zapamiętywanie ostatnio wyświetlanego miasta w localStorage,
    - `showMeteoData.js` - wyświetlanie danych pogodowych,
    - `meteoData.js` - pobieranie danych pogodowych,
    - `drawerAnimation.js` - zachowanie aplikacji przy zmniejszającym się ekranie.

- **scss** - folder, w ktorym zawarta jest cała struktura css z podziałem na poszczegolne katalogi, zawierające                   pliki opisujące te same lub podobne struktury

    - **Base**:   folder zawierający animacje, style podstawowe, typografia, utiliesy i takie tam.
    - **Components**: folder zawierający po jednym pliku scss dla komponentu
    - **Pages**: folder zawierający po jednym pliku scss dla strony
    - **Abstracts**: folder zawierający funkcje, mixiny, zmienne
    - `main.scss` : plik gdzie importujemy wszystkie pliki scss 💅

- **`index.html`** - struktura html aplikacji, pełni fundamentalną rolę.
- **`index.js`** - to właśnie index.js jest załączany przez webpack'a do naszego html i to włąsnie tu importujemy                       wszystkie pliki js aplikacji,

#### 2. `package.json` - plik zawierający wszystkie informacje o tworzonym przez nas projekcie.
#### 3. `package-lock.json` - plik, w którym przechowywane są szczegółowe informacje o zainstalowanych przez nas modułach.
#### 4. `webpack.config.js`  - plik zawierający konfigurację webpack'a. Pozwola stworzyć wersję produkcyjną aplikacji.
  
WAŻNE - jak działa webpack?
---

Webpack zbiera wszystko co jest dodane do pliku `index.js` i robi z tego paczkę, którą można wrzucić na serwer w celu udostępnienia projektu online.
Dzięki niemu jeżeli dodajemy kod JS to nie ma potrzeby załączać go w index.html w tagach <script> bo webpack zrobi to za nas - na tym polega właśnie automatyzacja jaką nam oferuje. 

## Struktura katalogów scss

Gdzie i co pakować:

- **Base**: animacje, style podstawowe, typografia, utiliesy i takie tam.
- **Components**: po jednym pliku scss dla komponentu
- **Pages**: po jednym pliku scss dla strony
- **Abstracts**: funkcje, mixiny, zmienne

Wszytskie pliki importujemy w `main.scss`, ktory siedzi w głównym katalogu 💅

**UWAGA** - pliki scss w katalogach nazywamy zaczynając od podkreślnika np. `_moj-styl.scss` ale importujemy w `index.scss` bez podkreślnika.

**DLACZEGO?** - podkreślnik informuje SCSS, że dany plik jest tylko plikiem częściowym i że nie powinien być generowany w osobnym pliku CSS, tylko zaimportowany do większego pliku. Zapewne w związku z tym że korzytsamy z webpacka, będzie to działać równie dobrze bez podkreslnika, ale warto trzymać się jakiejś konwencji, a to jest równie dobra informacja dla innego programisty, który będzie potem oglądał nasz kod.

PÓŻNIEJ NAPISZE WIĘCEJ.... 😸 wszelkie pomysły i sugestie mile widziane 
