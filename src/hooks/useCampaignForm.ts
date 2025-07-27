import { useForm, useFieldArray } from 'react-hook-form';
import type { Campaign, Gift, Conditions, GameType, Profile } from '../../doc/CampaignType';

export const useCampaignForm = () => {
  const form = useForm<Campaign>({
    defaultValues: {
      id: '',
      profile: 'PREMIUM' as Profile,
      configuration: {
        actions: [
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
        gifts: [
          {
            id: '1',
            icon: '🍟',
            initial_limit: 50,
            limit: 50,
            name: 'Frite',
            type: 'EAT'
          },
          {
            id: '2',
            icon: '👜',
            initial_limit: -1, // Illimité
            limit: -1,
            name: 'Sac Jacquemus',
            type: 'DISCOUNT'
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

  // Field arrays pour les listes
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

  // Fonctions utilitaires
  const addGift = () => {
    const newGift: Gift = {
      id: Date.now().toString(),
      icon: '🎁',
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

  const onSubmit = (data: Campaign) => {
    console.log('Campaign data:', data);
    // Ici vous pouvez envoyer les données à votre API
    alert('Campagne sauvegardée avec succès !');
  };

  return {
    form,
    control,
    watch,
    setValue,
    handleSubmit,
    errors,
    actionsFieldArray,
    giftsFieldArray,
    conditionsFieldArray,
    gameType,
    profile,
    gifts,
    is100PercentWinning,
    addGift,
    removeGift,
    updateGiftName,
    onSubmit
  };
}; 