import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';
import type { Campaign, Gift, Conditions, GameType, Profile } from '../../doc/CampaignType';

export const useCampaignForm = () => {
  const form = useForm<Campaign>({
    defaultValues: {id: '', profile: 'PREMIUM' as Profile, configuration: {actions: [
          {
            id: '1',
            priority: 1,
            target: 'https://google.com/fr',
            type: 'GOOGLE_REVIEW'
          },
          {
            id: '2',
            priority: 2,
            target: 'Modifier',
            type: 'INSTAGRAM'
          }
        ],
        colors: {
          primary: '#2A3B8F',
          secondary: '#FF9800'
        },
        disabled: false,
        game_type: 'WHEEL' as GameType,
        noConditions: false,
        purchaseCondition: true,
        minimumPurchaseAmount: "10€ d'achat minimum pour récupérer le gain",
        gifts: [
          {id: '1', icon: '', initial_limit: 50, limit: 50, name: 'Frite', type: 'EAT'},
          {
            id: '2', icon: '', initial_limit: -1, limit: -1, name: 'Sac Jacquemus', type: 'DISCOUNT'
          }
        ],
        retrievalConditions: [
          {
            id: '1',
            name: 'Frite',
            value: 'Aucune'
          },
          {
            id: '2',
            name: 'Sac Jacquemus',
            value: 'Achat minimum de 10€'
          }
        ],
        logo_uri: ''
      },
      created_at: new Date().toISOString(),
      created_by: '',
      enabled: true,
      label: 'Ma Campagne',
      placeId: '',
      updated_at: new Date().toISOString(),
      updated_by: ''
    }
  });

  const { control, watch, setValue, handleSubmit, formState: { errors } } = form;


  const actionsFieldArray = useFieldArray({
    control,
    name: 'configuration.actions'
  });

  const giftsFieldArray = useFieldArray({
    control,
    name: 'configuration.gifts'
  });

  const conditionsFieldArray = useFieldArray({
    control,
    name: 'configuration.retrievalConditions'
  });

  // Watchers pour la logique conditionnelle
  const gameType = watch('configuration.game_type');
  const profile = watch('profile');
  const gifts = watch('configuration.gifts');
  const is100PercentWinning = watch('configuration.disabled') === false;
  
  const noConditions = watch('configuration.noConditions') || false;
  const purchaseCondition = watch('configuration.purchaseCondition') || false;
  const minimumPurchaseAmount = watch('configuration.minimumPurchaseAmount') || "10€ d'achat minimum pour récupérer le gain";

  // Logique pour gérer la case "PERDU" automatiquement
  useEffect(() => {
    const currentGifts = giftsFieldArray.fields;
    
    if (!is100PercentWinning) {
      // Si le jeu n'est pas 100% gagnant, ajouter une case "PERDU" si elle n'existe pas
      const hasLossGift = currentGifts.some(gift => gift.type === 'LOSS');
      
      if (!hasLossGift) {
        const lossGift: Gift = {
          id: `loss-${Date.now()}`,
          name: "Perdu",
          icon: "❌",
          type: "LOSS",
          initial_limit: -1,
          limit: -1
        };
        giftsFieldArray.append(lossGift);
        
        // Ajouter la condition correspondante
        const lossCondition: Conditions = {
          id: `loss-condition-${Date.now()}`,
          name: "Perdu",
          value: "Aucune"
        };
        conditionsFieldArray.append(lossCondition);
      }
    } else {
      // Si le jeu est 100% gagnant, supprimer la case "PERDU"
      const lossGiftIndex = currentGifts.findIndex(gift => gift.type === 'LOSS');
      if (lossGiftIndex !== -1) {
        giftsFieldArray.remove(lossGiftIndex);
        
        // Supprimer la condition correspondante
        const lossConditionIndex = conditionsFieldArray.fields.findIndex(
          condition => condition.name === "Perdu"
        );
        if (lossConditionIndex !== -1) {
          conditionsFieldArray.remove(lossConditionIndex);
        }
      }
    }
  }, [is100PercentWinning, giftsFieldArray, conditionsFieldArray]);

  // Validation : au moins un gain illimité en mode 100% gagnant
  useEffect(() => {
    if (is100PercentWinning) {
      const hasUnlimitedGift = gifts.some(gift => gift.limit === -1 && gift.type !== 'LOSS');
      
      if (!hasUnlimitedGift && gifts.length > 0) {
        // Si aucun gain n'est illimité, rendre le premier gain illimité
        const firstGiftIndex = gifts.findIndex(gift => gift.type !== 'LOSS');
        if (firstGiftIndex !== -1) {
          const updatedGift: Gift = {...gifts[firstGiftIndex], initial_limit: -1, limit: -1};
          giftsFieldArray.update(firstGiftIndex, updatedGift);
        }
      }
    }
  }, [is100PercentWinning, gifts, giftsFieldArray]);

  // Fonctions utilitaires
  const addGift = () => {
    const newGift: Gift = {
      id: Date.now().toString(),
      icon: '',
      initial_limit: 1,
      limit: 1,
      name: 'Nouveau gain',
      type: 'EAT'
    };
    giftsFieldArray.append(newGift);
    
    // Ajouter automatiquement la condition correspondante
    const newCondition: Conditions = {
      id: Date.now().toString(),
      name: newGift.name,
      value: 'Aucune'
    };
    conditionsFieldArray.append(newCondition);
  };

  const removeGift = (index: number) => {
    const giftName = gifts[index]?.name;
    giftsFieldArray.remove(index);
    
    // Supprimer la condition correspondante
    const conditionIndex = conditionsFieldArray.fields.findIndex(
      condition => condition.name === giftName
    );
    if (conditionIndex !== -1) {
      conditionsFieldArray.remove(conditionIndex);
    }
  };

  const updateGiftName = (index: number, newName: string) => {
    giftsFieldArray.update(index, { ...gifts[index], name: newName });
    
    // Mettre à jour le nom de la condition correspondante
    const conditionIndex = conditionsFieldArray.fields.findIndex(
      condition => condition.name === gifts[index].name
    );
    if (conditionIndex !== -1) {
      conditionsFieldArray.update(conditionIndex, {
        ...conditionsFieldArray.fields[conditionIndex],
        name: newName
      });
    }
  };

  // Fonctions pour les conditions de récupération
  const updateNoConditions = (value: boolean) => {
    setValue('configuration.noConditions', value);
  };

  const updatePurchaseCondition = (value: boolean) => {
    setValue('configuration.purchaseCondition', value);
  };

  const updateMinimumPurchaseAmount = (value: string) => {
    setValue('configuration.minimumPurchaseAmount', value);
  };

  const updateProfile = (newProfile: Profile) => {
    setValue('profile', newProfile);
  };

  const onSubmit = (data: Campaign) => {
    console.log('Campaign data:', data);
    // Ici vous pouvez envoyer les données à votre API
    alert('Campagne sauvegardée avec succès !');
  };

  return {form, control, watch, setValue, handleSubmit,
    errors, actionsFieldArray, giftsFieldArray, conditionsFieldArray,
    gameType, profile, gifts, is100PercentWinning, noConditions, purchaseCondition,
    minimumPurchaseAmount, addGift,removeGift,updateGiftName,updateNoConditions,updatePurchaseCondition,updateMinimumPurchaseAmount,updateProfile,onSubmit
  };
}; 