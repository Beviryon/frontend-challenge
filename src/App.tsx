
import './App.css';
import { FormProvider } from 'react-hook-form';
// On importe tous les composants de la page
import HeaderCampagne from "./components/HeaderCampagne";
import AlerteCodePin from "./components/AlerteCodePin";
import ActionsCampagne from "./components/ActionsCampagne";
import ChoixJeu from "./components/ChoixJeu";
import PersonnalisationJeu from "./components/PersonnalisationJeu";
import GainsCampagne from "./components/GainsCampagne";
import ConditionsRecuperation from "./components/ConditionsRecuperation";
import { useCampaignForm } from './hooks/useCampaignForm';

function App() {
  const {
    form,
    actionsFieldArray,
    giftsFieldArray,
    conditionsFieldArray,
    noConditions,
    purchaseCondition,
    minimumPurchaseAmount,
    profile,
    updateNoConditions,
    updatePurchaseCondition,
    updateMinimumPurchaseAmount,
    updateProfile,
    handleSubmit,
    onSubmit
  } = useCampaignForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="ma-campagne-container"
          style={{
            padding: '20px',
            minHeight: '100vh',
            maxWidth: '1200px',
            margin: '0 auto',
            background: '#f5f5f5'
          }}
        >
          {/* En-tête de la page */}
          <HeaderCampagne />

          {/* Alerte code PIN */}
          <AlerteCodePin />

          {/* Section pour organiser les actions */}
          <ActionsCampagne actionsFieldArray={actionsFieldArray} />

          {/* Section pour choisir le type de jeu */}
          <ChoixJeu 
            profile={profile}
            onProfileChange={updateProfile}
          />

          {/* Section pour personnaliser le jeu */}
          <PersonnalisationJeu profile={profile} />

          {/* Section pour ajouter et configurer les gains */}
          <GainsCampagne giftsFieldArray={giftsFieldArray} />

          {/* Section pour définir les conditions de récupération */}
          <ConditionsRecuperation 
            conditionsFieldArray={conditionsFieldArray}
            noConditions={noConditions}
            purchaseCondition={purchaseCondition}
            minimumPurchaseAmount={minimumPurchaseAmount}
            onNoConditionsChange={updateNoConditions}
            onPurchaseConditionChange={updatePurchaseCondition}
            onMinimumPurchaseAmountChange={updateMinimumPurchaseAmount}
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default App;
