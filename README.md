# CCW19-WeatherApp

## Konfiguracja webpacka

Po co nam to?

Webpack pozwoli nam stworzyć wersję produkcyjną naszej aplikacji.

1. Jak używać?

   Odpalamy konsole i przechodzimy do głównego katalogu projektu - instalujemy wszystkie biblioteki za pomocą `npm install`.

- wpisujemy polecenie: `npm run build`
  i naciskamy enter żeby zbudować projekt
- wpisujemy polecenie: `npm run dev` i naciskamy enter żeby odpalić serwer developerski
  dzięki temu możemy wprowadzać zmiany w kodzie a strona będzie automatycznie je pokazywać w przeglądarce po zapisaniu.
  
WAŻNE - jak działa webpack?
---

Piszę to co wiem...

Webpack zbiera wszystko co jest dodane do pliku `index.js` i robi z tego paczkę, którą będziemy mogli wrzucić na serwer jak będziemy chcieli nasz projekt udostępnić oline.
Jeżeli dodajemy jakiś kod JS to nie ma potrzeby wrzucać go w index.html w tagach <script> bo webpack zrobi to za nas - na tym polega właśnie automatyzacja jaką nam oferuje. 
Najważniejsze żeby nasz kod zaimportować w pliku `index.js`

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
