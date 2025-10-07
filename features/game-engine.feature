#language: it

Funzionalità: Motore del Gioco - Indovinare Lettera
  Come giocatore
  Voglio indovinare lettere nel gioco dell'impiccato
  In modo da poter scoprire la parola segreta

  Contesto:
    Data la parola segreta "scrum"
    E il gioco è stato avviato

  Scenario: Il giocatore fa un tentativo corretto
    Quando indovino la lettera "S"
    Allora dovrei vedere un messaggio che dice "La lettera S é nella parola."
    E il mio numero di vite dovrebbe rimanere lo stesso
    E la lettera "S" dovrebbe essere aggiunta ai miei tentativi
    E lo stato del gioco dovrebbe rimanere "RUNNING" se ho vite rimanenti

  Scenario: Il giocatore fa un tentativo sbagliato
    Quando indovino la lettera "z"
    Allora il mio numero di vite dovrebbe diminuire di 1
    E la lettera "z" dovrebbe essere aggiunta ai miei tentativi
    E dovrei vedere un messaggio che dice "La lettera Z non é nella parola."
    Ma lo stato del gioco dovrebbe rimanere "RUNNING" se ho vite rimanenti

  Scenario: Il giocatore scrive più di una lettera
    Quando indovino la lettera "da"
    Allora dovrei vedere un messaggio che dice "Inserisci una lettera"
    E il mio numero di vite dovrebbe rimanere lo stesso
    E lo stato del gioco dovrebbe rimanere "RUNNING" se ho vite rimanenti
