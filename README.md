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

## Struktura katalogów scss

Gdzie i co pakować:

- **Base**: animacje, style podstawowe, typografia, utiliesy i takie tam.
- **Components**: po jednym pliku scss dla komponentu
- **Pages**: po jednym pliku scss dla strony
- **Abstracts**: funkcje, mixiny, zmienne

Wszytskie pliki importujemy w `main.scss`, ktory siedzi w głównym katalogu 💅

PÓŻNIEJ NAPISZE WIĘCEJ.... 😸 wszelkie pomysły i sugestie mile widziane 
