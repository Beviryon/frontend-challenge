# Documentation Complète - Frontend Challenge

## **Vue d'ensemble du projet**

Ce projet est une interface de configuration de campagnes de jeux développée avec React 19 et TypeScript. Elle permet de gérer des gains, des actions, et de personnaliser l'expérience utilisateur pour des campagnes marketing interactives.

---

## **Stack technologique**

### **Core Technologies**
- **React 19.1.0** - Framework JavaScript moderne
- **TypeScript 5.x** - Typage statique pour la sécurité du code
- **Vite 7.x** - Build tool rapide et moderne

### **UI & Styling**
- **Material UI (@mui/material)** - Bibliothèque de composants UI
- **Material Icons (@mui/icons-material)** - Icônes Material Design
- **CSS personnalisé** - Styles spécifiques au projet

### **Gestion d'état & Formulaires**
- **react-hook-form** - Gestion avancée des formulaires
- **useFieldArray** - Gestion des listes dynamiques
- **useFormContext** - Partage de contexte de formulaire

### **Fonctionnalités avancées**
- **@dnd-kit** - Drag & drop moderne (compatible React 19)
- **FileReader API** - Upload et preview d'images
- **Canvas API** - Validation des couleurs hexadécimales

---

## **Architecture du projet**

```
frontend-challenge/
├── src/
│   ├── components/           # Composants React
│   │   ├── ActionsCampagne.tsx
│   │   ├── AlerteCodePin.tsx
│   │   ├── ChoixJeu.tsx
│   │   ├── ConditionsRecuperation.tsx
│   │   ├── DraggableActions.tsx
│   │   ├── GainsCampagne.tsx
│   │   ├── HeaderCampagne.tsx
│   │   └── PersonnalisationJeu.tsx
│   ├── hooks/               # Hooks personnalisés
│   │   └── useCampaignForm.ts
│   ├── doc/                 # Types et documentation
│   │   └── CampaignType.ts
│   ├── assets/              # Images et ressources
│   ├── App.tsx              # Composant principal
│   ├── main.tsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── public/                  # Fichiers statiques
├── package.json             # Dépendances
├── tsconfig.json           # Configuration TypeScript
├── vite.config.ts          # Configuration Vite
└── README.md               # Documentation utilisateur
```

---

## **Fonctionnalités détaillées**

### **1. Gestion des gains (GainsCampagne.tsx)**

#### **Tableau interactif**
- **5 colonnes** : Nom du Gain, Catégorie, Nombre de stock, Illimité, Actions
- **Icônes d'information** dans les en-têtes
- **Menu déroulant** dans la colonne Catégorie
- **Switches** pour gérer l'état illimité

#### **Fonctionnalités**
```typescript
// Ajout d'un nouveau gain
const ajouterGain = () => {
  const nouveauGain: Gift = {
    id: Date.now().toString(),
    name: "Nouveau gain",
    icon: "",
    type: "EAT",
    initial_limit: 1,
    limit: 1
  };
  append(nouveauGain);
};

// Suppression d'un gain
const supprimerGain = (index: number) => {
  const gift = fields[index];
  if (gift.type === 'LOSS') {
    alert('Le gain "Perdu" ne peut pas être supprimé manuellement.');
    return;
  }
  remove(index);
};
```

#### **Types de gains supportés**
- **EAT** → "Nourriture"
- **DISCOUNT** → "Tirage au sort" (avec date d'expiration)
- **LOSS** → "Perdu" (géré automatiquement)

### **2. Jeu 100% Gagnant**

#### **Logique automatique**
```typescript
// Ajout automatique de la case "Perdu"
useEffect(() => {
  if (!is100PercentWinning) {
    // Ajouter gain "Perdu" s'il n'existe pas
    const perduGift = fields.find(gift => gift.type === 'LOSS');
    if (!perduGift) {
      append({
        id: 'loss-gift',
        name: 'Perdu',
        icon: '',
        type: 'LOSS',
        initial_limit: -1,
        limit: -1
      });
    }
  } else {
    // Supprimer gain "Perdu" si mode 100% gagnant
    const perduIndex = fields.findIndex(gift => gift.type === 'LOSS');
    if (perduIndex !== -1) {
      remove(perduIndex);
    }
  }
}, [is100PercentWinning]);
```

#### **Validation des gains illimités**
- Au moins un gain doit être illimité en mode 100% gagnant
- Validation automatique avec correction

### **3. Actions avec drag & drop (ActionsCampagne.tsx)**

#### **Types d'actions supportés**
```typescript
enum ActionType {
  GOOGLE_REVIEW = "GOOGLE_REVIEW",
  FACEBOOK_LIKE = "FACEBOOK_LIKE",
  INSTAGRAM_FOLLOW = "INSTAGRAM_FOLLOW",
  TWITTER_FOLLOW = "TWITTER_FOLLOW",
  EMAIL_SUBSCRIPTION = "EMAIL_SUBSCRIPTION"
}
```

#### **Fonctionnalités drag & drop**
```typescript
// DraggableActions.tsx
const { attributes, listeners, setNodeRef, transform } = useSortable({
  id: action.id
});

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (active.id !== over?.id) {
    const oldIndex = actions.findIndex(action => action.id === active.id);
    const newIndex = actions.findIndex(action => action.id === over?.id);
    const newActions = arrayMove(actions, oldIndex, newIndex);
    onActionsChange(newActions);
  }
};
```

#### **Détection de doublons**
- Alerte automatique si des actions du même type sont ajoutées
- Prévention des doublons lors de l'ajout

### **4. Personnalisation (PersonnalisationJeu.tsx)**

#### **Upload de logo**
```typescript
const validateImageFile = (file: File): string | null => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!validTypes.includes(file.type)) {
    return 'Format de fichier non supporté';
  }
  if (file.size > maxSize) {
    return 'Fichier trop volumineux (max 5MB)';
  }
  return null;
};
```

#### **Validation des couleurs hex**
```typescript
const validateHexColor = (color: string): string | null => {
  let hex = color.replace('#', '');
  
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  if (hex.length !== 6) {
    return 'Code couleur incomplet';
  }
  
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return 'Format hexadécimal attendu';
  }
  
  return null;
};
```

### **5. Conditions de récupération (ConditionsRecuperation.tsx)**

#### **Switches configurables**
- **Pas de conditions** : Récupération immédiate
- **Condition d'achat** : Achat requis
- **Montant minimum** : Montant configurable

#### **Synchronisation avec les gains**
- Les conditions sont liées aux gains disponibles
- Validation automatique des cohérences

### **6. Interface utilisateur avancée**

#### **Modals interactives (HeaderCampagne.tsx)**
```typescript
// Modal Code PIN
<Dialog open={openPinModal} onClose={handleClosePinModal}>
  <DialogTitle>Mon Code PIN</DialogTitle>
  <DialogContent>
    <TextField
      value={pinCode}
      onChange={(e) => setPinCode(e.target.value)}
      inputProps={{ maxLength: 4 }}
      placeholder="0000"
    />
    <Alert severity="info" sx={{ mt: 2 }}>
      Ce code vous permettra d'accéder à vos statistiques
    </Alert>
  </DialogContent>
</Dialog>
```

#### **Sections accordéon**
- Chaque section peut être réduite/développée
- État persistant pendant la session

#### **Alertes dynamiques**
- Messages d'erreur contextuels
- Alertes de validation en temps réel
- Notifications de succès

---

## 🔧 **Configuration et installation**

### **Prérequis**
- Node.js 18+ 
- npm ou yarn

### **Installation**
```bash
# Cloner le projet
git clone [url-du-repo]
cd frontend-challenge

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build
```

### **Scripts disponibles**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

---

## **Types TypeScript**

### **Structure principale**
```typescript
interface Campaign {
  gameType: GameType;
  profile: Profile;
  actions: Action[];
  gifts: Gift[];
  configuration: Configuration;
}

interface Gift {
  id: string;
  name: string;
  icon: string;
  type: string;
  initial_limit: number;
  limit: number;
}

interface Action {
  id: string;
  type: ActionType;
  priority: number;
}

interface Configuration {
  disabled: boolean;
  noConditions?: boolean;
  purchaseCondition?: boolean;
  minimumPurchaseAmount?: string;
}
```

---

## **Design System**

### **Couleurs principales**
```css
/* Couleurs du thème */
--primary-blue: #2A3B8F;
--primary-orange: #FF9800;
--error-red: #f44336;
--success-green: #4caf50;
--warning-yellow: #ff9800;
--grey-light: #f5f5f5;
--grey-medium: #e0e0e0;
--grey-dark: #757575;
```

### **Typographie**
- **Titres** : Roboto, 600-700 weight
- **Corps** : Roboto, 400 weight
- **Captions** : Roboto, 300 weight

### **Espacement**
- **xs** : 4px
- **sm** : 8px
- **md** : 16px
- **lg** : 24px
- **xl** : 32px

---

##**Déploiement**

### **Build de production**
```bash
npm run build
```

## **Tests et qualité**

### **Linting**
- ESLint configuré pour React/TypeScript
- Règles strictes pour la qualité du code

### **Type checking**
- TypeScript strict mode activé
- Vérification des types à la compilation

### **Validation des formulaires**
- Validation en temps réel
- Messages d'erreur contextuels
- Prévention des soumissions invalides

---

## **Performance**

### **Optimisations**
- **Code splitting** automatique avec Vite
- **Tree shaking** pour réduire la taille du bundle
- **Lazy loading** des composants non critiques
- **Optimisation des images** automatique

### **Métriques**
- **Taille du bundle** : ~538KB (165KB gzippé)
- **Temps de build** : ~5-10 secondes
- **Temps de chargement** : < 2 secondes

---

## 🔧 **Maintenance et évolution**

### **Ajout de nouveaux types de gains**
1. Modifier `CampaignType.ts`
2. Ajouter la logique dans `GainsCampagne.tsx`
3. Mettre à jour les validations

### **Ajout de nouvelles actions**
1. Étendre l'enum `ActionType`
2. Ajouter l'icône correspondante
3. Mettre à jour `getActionName()`

### **Modification du design**
1. Utiliser les variables CSS du thème
2. Respecter la grille Material UI
3. Tester la responsivité

---

## **Dépannage**

### **Problèmes courants**

#### **Page blanche**
- Vérifier les erreurs dans la console
- S'assurer que toutes les dépendances sont installées
- Vérifier la configuration TypeScript

#### **Erreurs de compilation**
- Vérifier les imports manquants
- S'assurer que les types sont corrects
- Nettoyer le cache : `npm run build --force`

#### **Problèmes de drag & drop**
- Vérifier que @dnd-kit est installé
- S'assurer que les IDs sont uniques
- Vérifier la configuration du DndContext


## **Conclusion**

Ce projet démontre une implémentation complète d'une interface moderne avec :
- ✅ Architecture modulaire et maintenable
- ✅ Gestion d'état robuste
- ✅ Interface utilisateur intuitive
- ✅ Validation complète des données
- ✅ Performance optimisée
- ✅ Code TypeScript typé
