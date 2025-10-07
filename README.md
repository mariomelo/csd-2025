# 🎯 Gioco dell'Impiccato - CSD 2025

Template educativo per l'insegnamento dello sviluppo software agile.

## 📋 Sul Progetto

Questo è un progetto template del gioco dell'impiccato creato per insegnare concetti di sviluppo agile, tra cui:

- ✅ Test unitari con Jest
- ✅ Test BDD con Cucumber
- ✅ Integrazione Continua con GitHub Actions
- ✅ Copertura del codice
- ✅ Architettura Esagonale
- ✅ Configurazione modulare

## 🚀 Comandi Disponibili

### Installazione
```bash
npm install
```

### Eseguire il Gioco
```bash
npm start
```

### Test

**Eseguire tutti i test:**
```bash
npm run test:all
```

**Test unitari (Jest):**
```bash
npm test
```

**Test con watcher (sviluppo):**
```bash
npm run test:watch
```

**Test con copertura del codice:**
```bash
npm run test:coverage
```

**Test BDD (Cucumber):**
```bash
npm run test:bdd
```


## 📁 Struttura del Progetto

```
csd-2025/
├── .github/workflows/     # GitHub Actions (CI/CD)
├── src/
│   ├── domain/           # Logica di business (Game Engine)
│   ├── adapters/         # Adattatori (Dictionary, Config)
│   └── ports/            # Interfacce (Contratti)
├── tests/                # Test unitari (Jest)
├── features/             # Test BDD (Cucumber)
├── cli/                  # Interfaccia a riga di comando
└── reports/              # Report dei test
```

## 🎮 Come Giocare

1. Eseguire `npm start`
2. Il gioco mostrerà una parola nascosta con trattini bassi
3. Digitare una lettera e premere INVIO
4. Provare a indovinare la parola prima che finiscano le vite!

## 🛠️ Per Sviluppatori

### Implementazione Necessaria

Questo è un template educativo. Gli studenti devono implementare:

1. **Dictionary** (`src/adapters/dictionary.js`)
   - Lettura del file delle parole
   - Selezione casuale delle parole

2. **Game Engine** (`src/domain/game-engine.js`)
   - Logica completa del gioco dell'impiccato
   - Validazione degli input
   - Controllo dello stato del gioco

3. **CLI** (`cli/index.js`)
   - Loop principale del gioco
   - Interazione con l'utente

### Architettura Esagonale

- **Ports**: Interfacce che definiscono i contratti
- **Adapters**: Implementazioni specifiche (Dictionary, Config)
- **Domain**: Logica di business pura (Game Engine)

### Configurazione

Utilizzare il modulo `config.js` per alternare tra gli adapter del dizionario.


## 📊 Copertura del Codice

Dopo aver eseguito `npm run test:coverage`, verificare:
- `coverage/lcov-report/index.html` - Report visuale
- `coverage/` - Dati di copertura

## 🔄 Integrazione Continua

Il progetto è configurato con GitHub Actions che:
- Esegue i test automaticamente su push/PR
- Genera report di copertura
- Utilizza Ubuntu e Node.js stabile

## 🤝 Contribuire

1. Implementare le funzionalità dei moduli
2. Aggiungere test per le proprie implementazioni
3. Mantenere alta la copertura del codice
4. Eseguire `npm run test:all` prima di fare commit

---

**Nota**: Questo è un progetto educativo. L'implementazione è intenzionalmente incompleta per consentire l'apprendimento pratico.
