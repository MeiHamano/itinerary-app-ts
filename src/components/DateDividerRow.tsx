import React from 'react';
import { Box, Chip, IconButton, Button, Tooltip, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import {
  CalendarMonth as CalendarMonthIcon,
  Add as AddIcon,
  Delete as DeleteOutlineIcon,
} from '@mui/icons-material';
import type { DateDivider } from '../types/itinerary';
interface DateDividerRowProps {
  item: DateDivider;
  dayIndex?: number;
  onChange?: (id: string, field: string, value: string) => void;
  onDelete?: (id: string) => void;
  onAddItemHere?: (dividerId: string) => void;
  canDelete?: boolean;
}

const DateDividerRow: React.FC<DateDividerRowProps> = ({
  item,
  dayIndex = 1,
  onChange,
  onDelete,
  onAddItemHere,
  canDelete = true,
}) => {
  const dateValue: Dayjs | null = item?.date ? dayjs(item.date) : null;

  return (
    <Paper
      elevation={0}
      sx={{
        my: 2,
        p: 1.5,
        backgroundColor: '#e8f0fe',
        borderRadius: 2,
        border: '1px solid #cce0ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1.5,
      }}
    >
      {/* --- 左側: 「○日目」バッジ ＋ 日付ピッカー --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Chip
          icon={<CalendarMonthIcon fontSize="small" />}
          label={`${dayIndex}日目`}
          color="primary"
          sx={{ fontWeight: 'bold', fontSize: '0.9rem', px: 0.5 }}
        />
         {/* カレンダー選択 */}
        <DatePicker
          value={dateValue}
          format="YYYY/MM/DD"
          onChange={(newValue: Dayjs | null) => {
            // 有効な日付が選ばれた場合、'YYYY-MM-DD' 形式の文字列に変換して親に通知
            if (onChange && item?.id) {
              const formatted = newValue && newValue.isValid() ? newValue.format('YYYY-MM-DD') : '';
              onChange(item.id, 'date', formatted);
            }
          }}
          sx={{ backgroundColor: '#ffffff', borderRadius: 1, width: 170 }}
          slotProps={{ textField: { size: 'small' } }}
        />
      </Box>

      {/* --- 右側: 「予定を追加」ボタン ＋ 削除ボタン --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => onAddItemHere && onAddItemHere(item.id)}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          予定を追加
        </Button>
        {/* 削除ボタン（canDelete が true の場合のみ表示） */}
        {canDelete && (
          <Tooltip title="この日付区切りを削除">
            <IconButton
              size="small"
              onClick={() => onDelete && item?.id && onDelete(item.id)}
              sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Paper>
  );
};

export default React.memo(DateDividerRow);