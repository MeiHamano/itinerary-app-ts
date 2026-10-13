import React, { useState, useCallback } from 'react';
import { Container, Typography, Box, Stack, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DateDividerRow from './components/DateDividerRow';
import ItineraryItemRow from './components/ItineraryItemRow';
import TimelineFooter from './components/TimelineFooter';
import {
  createEmptyDaySchedule,
  createEmptyItineraryItem,
  type DaySchedule,
} from './types/itinerary';

export default function App() {
  // 階層構造ステート: DaySchedule の配列
  const [days, setDays] = useState<DaySchedule[]>([createEmptyDaySchedule('2026-10-01')]);

  // 日付区切りの情報更新 (日付変更など)
  const handleDateChange = useCallback((dayId: string, field: string, value: string) => {
    setDays((prev) =>
      prev.map((day) => (day.id === dayId ? { ...day, [field]: value } : day))
    );
  }, []);

  // 日付ブロック自体の削除
  const handleDeleteDay = useCallback((dayId: string) => {
    setDays((prev) => prev.filter((day) => day.id !== dayId));
  }, []);

  // 指定した日の中に「新しい予定」を追加
  const handleAddItemToDay = useCallback((dayId: string) => {
    setDays((prev) =>
      prev.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            items: [...day.items, createEmptyItineraryItem()],
          };
        }
        return day;
      })
    );
  }, []);

  // 予定（アイテム）の内容更新
  const handleItemChange = useCallback((itemId: string, field: string, value: string) => {
    setDays((prev) =>
      prev.map((day) => ({
        ...day,
        items: day.items.map((item) =>
          item.id === itemId ? { ...item, [field]: value } : item
        ),
      }))
    );
  }, []);

  // 予定（アイテム）の削除
  const handleDeleteItem = useCallback((itemId: string) => {
    setDays((prev) =>
      prev.map((day) => ({
        ...day,
        items: day.items.filter((item) => item.id !== itemId),
      }))
    );
  }, []);

  // 次の日（日付ブロック）を追加
  const handleAddDay = useCallback(() => {
    setDays((prev) => [...prev, createEmptyDaySchedule()]);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4, minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <Box sx={{ mb: 4, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
            タイムスケジュール
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            複数日の旅行計画をタイムラインで整理・作成できます
          </Typography>
        </Box>

        {/* 日程一覧 */}
        <Stack spacing={3}>
          {/* 1階層目:日ごとのループ */}
          {days.map((day, index) => (
            <Box key={day.id} sx={{ mb: 2 }}>
              {/* 日付区切りヘッダー */}
              <DateDividerRow
                item={day}
                dayIndex={index + 1}
                onChange={handleDateChange}
                onDelete={handleDeleteDay}
                onAddItemHere={handleAddItemToDay}
                canDelete={days.length > 1}
              />

              {/* 2階層目: その日の予定カード一覧 */}
              <Stack spacing={1.5} sx={{ pl: { xs: 0, sm: 2 }, mt: 1.5 }}>
                {day.items.map((item) => (
                  <ItineraryItemRow
                    key={item.id}
                    item={item}
                    onChange={handleItemChange}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>

        <TimelineFooter onAddDivider={handleAddDay} />
      </Container>
    </LocalizationProvider>
  );
}