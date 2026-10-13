import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Box,
  type SelectChangeEvent,
} from '@mui/material';
import {
  Delete as DeleteOutlineIcon,
  WarningAmber as WarningAmberIcon,
} from '@mui/icons-material';

import MoveForm from './MoveForm';
import GeneralForm from './GeneralForm';
import { CATEGORY_OPTIONS } from '../types/itinerary';
import type { ItineraryItem } from '../types/itinerary';

interface ItineraryItemRowProps {
  item: ItineraryItem;
  onChange: (id: string, field: string, value: string) => void;
  onDelete: (id: string) => void;
}

const ItineraryItemRow: React.FC<ItineraryItemRowProps> = ({ item, onChange, onDelete }) => {
  const isTimeOrderInvalid = Boolean(
    item.startTime && item.endTime && item.endTime < item.startTime
  );

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    onChange(item.id, 'category', e.target.value);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        backgroundColor: '#ffffff',
        borderLeft: item.category === 'move' ? '4px solid #ed6c02' : '4px solid #1976d2',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'flex-start',
          }}
        >
          {/* 時間入力部 */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 25%' }, minWidth: 200 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 'bold' }}>
              時間設定
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                type="time"
                size="small"
                value={item.startTime || ''}
                onChange={(e) => onChange(item.id, 'startTime', e.target.value)}
                slotProps={{ htmlInput: { step: 300 } }}
                fullWidth
              />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>〜</Typography>
              <TextField
                type="time"
                size="small"
                value={item.endTime || ''}
                onChange={(e) => onChange(item.id, 'endTime', e.target.value)}
                slotProps={{ htmlInput: { step: 300 } }}
                fullWidth
              />
            </Box>

            {isTimeOrderInvalid && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.8, color: 'warning.main' }}>
                <WarningAmberIcon fontSize="small" />
                <Typography variant="caption">終了時刻が前になっています</Typography>
              </Box>
            )}
          </Box>

          {/* カテゴリ選択 */}
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 30%', md: '0 0 20%' }, minWidth: 140 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 'bold' }}>
              カテゴリ
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel id={`cat-label-${item.id}`}>活動種別</InputLabel>
              <Select
                labelId={`cat-label-${item.id}`}
                value={item.category || 'meal'}
                label="活動種別"
                onChange={handleCategoryChange}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* 詳細入力 */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 40%' } }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 'bold' }}>
              詳細入力
            </Typography>
            {item.category === 'move' ? (
              <MoveForm item={item} onChange={onChange} />
            ) : (
              <GeneralForm item={item} onChange={onChange} />
            )}
          </Box>

          {/* 削除ボタン */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 3, ml: 'auto' }}>
            <Tooltip title="この予定を削除">
              <IconButton
                size="small"
                onClick={() => onDelete(item.id)}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'error.main' },
                }}
              >
                <DeleteOutlineIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(ItineraryItemRow);