import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography, TableCell, TableRow, IconButton, Chip } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Action, ActionType } from '../../doc/CampaignType';

interface DraggableActionRowProps {
  action: Action;
  onDelete: (id: string) => void;
}

const DraggableActionRow: React.FC<DraggableActionRowProps> = ({ action, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: action.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getActionIcon = (type: ActionType) => {
    switch (type) {
      case 'GOOGLE_REVIEW':
        return (
          <Box sx={{
            width: 24, height: 24, borderRadius: '50%', 
            background: '#4285F4', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', 
            color: '#fff', fontSize: 12, fontWeight: 'bold'
          }}>
            G
          </Box>
        );
      case 'INSTAGRAM':
        return '📸';
      case 'TIKTOK':
        return '🎵';
      case 'FACEBOOK':
        return '📘';
      default:
        return '📱';
    }
  };

  const getActionName = (type: ActionType) => {
    switch (type) {
      case 'GOOGLE_REVIEW':
        return 'Avis Google';
      case 'INSTAGRAM':
        return 'Parrainage (Par défaut)';
      case 'TIKTOK':
        return 'TikTok';
      case 'FACEBOOK':
        return 'Facebook';
      default:
        return 'Action';
    }
  };

  return (
    <TableRow ref={setNodeRef} style={style} sx={{ '&:hover': { background: '#f8f9fa' } }}>
      <TableCell sx={{ fontWeight: 500 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            {...attributes}
            {...listeners}
            sx={{ cursor: 'grab', color: '#666' }}
          >
            <DragIndicatorIcon />
          </IconButton>
          {`${action.priority === 1 ? 'Première' : action.priority === 2 ? 'Deuxième' : `${action.priority}ème`} action`}
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {getActionIcon(action.type)}
          <Typography>{getActionName(action.type)}</Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {action.type === 'GOOGLE_REVIEW' && (
            <>
              <Typography variant="body2" color="text.secondary">
                {action.target}
              </Typography>
              <Chip label="Intégré" color="success" size="small" sx={{ height: 20, fontSize: 11 }} />
            </>
          )}
          {action.type === 'INSTAGRAM' && (
            <>
              <Typography variant="body2" sx={{ color: '#2A3B8F', cursor: 'pointer', textDecoration: 'underline' }}>
                {action.target}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                En savoir plus ℹ️
              </Typography>
            </>
          )}
        </Box>
      </TableCell>
      <TableCell>
        {action.type !== 'INSTAGRAM' && (
          <IconButton
            size="small"
            onClick={() => onDelete(action.id)}
            sx={{ color: '#666' }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

interface DraggableActionsProps {
  actions: Action[];
  onActionsChange: (actions: Action[]) => void;
  onDeleteAction: (id: string) => void;
}

const DraggableActions: React.FC<DraggableActionsProps> = ({ 
  actions, 
  onActionsChange, 
  onDeleteAction 
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = actions.findIndex(action => action.id === active.id);
      const newIndex = actions.findIndex(action => action.id === over?.id);

      const newActions = arrayMove(actions, oldIndex, newIndex);
      
      // Mettre à jour les priorités
      const updatedActions = newActions.map((action, index) => ({
        ...action,
        priority: index + 1
      }));

      onActionsChange(updatedActions);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={actions.map(action => action.id)} strategy={verticalListSortingStrategy}>
        {actions.map((action) => (
          <DraggableActionRow
            key={action.id}
            action={action}
            onDelete={onDeleteAction}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DraggableActions; 