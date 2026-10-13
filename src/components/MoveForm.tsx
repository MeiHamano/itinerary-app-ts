import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Tooltip,
  type SelectChangeEvent,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FlightIcon from '@mui/icons-material/Flight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  MOVE_METHOD_OPTIONS,
  type ItineraryItem,
  type MoveMethodType,
} from '../types/itinerary';

interface MoveFormProps {
  item: ItineraryItem;
  onChange: (id: string, field: string, value: string) => void;
}

const getMethodIcon = (method: MoveMethodType): React.ReactElement => {
  switch (method) {
    case 'walk': return <DirectionsWalkIcon fontSize="small" sx={{ mr: 1 }} />;
    case 'train': return <DirectionsTransitIcon fontSize="small" sx={{ mr: 1 }} />;
    case 'bus': return <DirectionsBusIcon fontSize="small" sx={{ mr: 1 }} />;
    case 'car': return <DirectionsCarIcon fontSize="small" sx={{ mr: 1 }} />;
    case 'airplane': return <FlightIcon fontSize="small" sx={{ mr: 1 }} />;
    default: return <MoreHorizIcon fontSize="small" sx={{ mr: 1 }} />;
  }
};

export const MoveForm: React.FC<MoveFormProps> = ({ item, onChange }) => {
  const isOtherMethod = item.moveMethod === 'other';

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    onChange(item.id, 'moveMethod', e.target.value);
  };

  return (
    <Grid container spacing={1.5}>
      {/* 移動手段セレクトボックス */}
      <Grid size={{ xs: 12, sm: isOtherMethod ? 6 : 12 }}>
        <FormControl fullWidth size="small">
          <InputLabel id={`move-method-label-${item.id}`}>移動手段</InputLabel>
          <Select
            labelId={`move-method-label-${item.id}`}
            value={item.moveMethod || 'train'}
            label="移動手段"
            onChange={handleSelectChange}
          >
            {MOVE_METHOD_OPTIONS.map((opt) => (
              <MenuItem
                key={opt.value}
                value={opt.value}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {getMethodIcon(opt.value)}
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* 「その他」選択時のみ表示される自由記述欄 */}
      {isOtherMethod && (
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="移動手段の内容"
            placeholder="例: フェリー、ロープウェイ"
            value={item.moveMethodCustom || ''}
            onChange={(e) => onChange(item.id, 'moveMethodCustom', e.target.value)}
          />
        </Grid>
      )}

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
          placeholder="座席番号、乗り換え情報、運賃など"
          value={item.notes || ''}
          onChange={(e) => onChange(item.id, 'notes', e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(MoveForm);