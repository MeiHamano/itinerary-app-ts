import React from 'react';
import { Grid, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import type { ItineraryItem, CategoryType } from '../types/itinerary';

interface GeneralFormProps {
  item: ItineraryItem;
  onChange: (id: string, field: string, value: string) => void;
}

const getPlacePlaceholder = (category: CategoryType): string => {
  switch (category) {
    case 'meal': return '例: ○○カフェ、海鮮炉端焼き XX店';
    case 'activity': return '例: 展望台、カヤック体験ツアー、美術館';
    case 'shopping': return '例: アウトレットモール、お土産センター';
    default: return '例: ホテルチェックイン、荷物預け入れ';
  }
};

const getPlaceLabel = (category: CategoryType): string => {
  switch (category) {
    case 'meal': return '店名・食事場所';
    case 'activity': return '施設名・アクティビティ名';
    case 'shopping': return '店舗名・商業施設';
    default: return '目的・場所';
  }
};

export const GeneralForm: React.FC<GeneralFormProps> = ({ item, onChange }) => {
  return (
    <Grid container spacing={1.5}>
      {/* 目的の場所・スポット名 */}
      <Grid size={12}>
        <TextField
          fullWidth
          size="small"
          label={getPlaceLabel(item.category)}
          placeholder={getPlacePlaceholder(item.category)}
          value={item.place || ''}
          onChange={(e) => onChange(item.id, 'place', e.target.value)}
        />
      </Grid>

      {/* 参考/予約URL入力 */}
      <Grid size={12}>
        <TextField
          fullWidth
          size="small"
          label="参考 / 予約URL"
          placeholder="https://..."
          value={item.url || ''}
          onChange={(e) => onChange(item.id, 'url', e.target.value)}
          slotProps={{
            input: {
              endAdornment: item.url ? (
                <InputAdornment position="end">
                  <Tooltip title="リンクを別タブで開く">
                    <IconButton
                      size="small"
                      component="a"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ) : null,
            },
          }}
        />
      </Grid>

      {/* メモ入力 */}
      <Grid size={12}>
        <TextField
          fullWidth
          size="small"
          multiline
          rows={2}
          label="メモ"
          placeholder="予約名義、予算、注意事項など"
          value={item.notes || ''}
          onChange={(e) => onChange(item.id, 'notes', e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(GeneralForm);