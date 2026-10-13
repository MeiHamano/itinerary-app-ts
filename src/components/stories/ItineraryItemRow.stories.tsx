import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ItineraryItemRow from '../ItineraryItemRow';
import type { ItineraryItem, CategoryType } from '../../types/itinerary';

const theme = createTheme();

const createMockItem = (
  category: CategoryType = 'meal',
  overrides: Partial<ItineraryItem> = {}
): ItineraryItem => ({
  id: `item-${Date.now()}`,
  type: 'item',
  category,
  startTime: '12:00',
  endTime: '13:00',
  place: '',
  url: '',
  notes: '',
  moveMethod: 'train',
  moveMethodCustom: '',
  ...overrides,
});

const meta: Meta<typeof ItineraryItemRow> = {
  title: 'Itinerary/ItineraryItemRow',
  component: ItineraryItemRow,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ padding: '24px', maxWidth: '800px', backgroundColor: '#f5f5f5' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onChange: { action: 'onChange' },
    onDelete: { action: 'onDelete' },
  },
};

export default meta;
type Story = StoryObj<typeof ItineraryItemRow>;

// 1. 初期表示（食事・空状態）
export const DefaultMealEmpty: Story = {
  args: {
    item: createMockItem('meal', { startTime: '', endTime: '' }),
  },
};

// 2. 移動カテゴリ（MoveForm 描画・オレンジアクセント）
export const MoveCategory: Story = {
  args: {
    item: createMockItem('move', {
      startTime: '09:00',
      endTime: '10:30',
      moveMethod: 'train',
      notes: '新幹線 のぞみ号 乗車',
      url: 'https://example.com/jr-reservation',
    }),
  },
};

// 3. バリデーション警告（終了時刻が開始時刻より前）
export const TimeValidationError: Story = {
  args: {
    item: createMockItem('activity', {
      startTime: '15:00',
      endTime: '11:00',
      place: '展望台ツアー',
    }),
  },
};

// 4. カテゴリ切り替え・入力連動のインタラクティブ確認
export const Interactive: Story = {
  render: () => {
    const [item, setItem] = useState<ItineraryItem>(
      createMockItem('meal', {
        place: '海鮮 〇〇',
        startTime: '18:00',
        endTime: '20:00',
        notes: 'コース料理事前予約済み',
      })
    );

    const handleChange = (id: string, field: string, value: string) => {
      setItem((prev) => ({ ...prev, [field]: value }));
    };

    return (
      <ItineraryItemRow
        item={item}
        onChange={handleChange}
        onDelete={(id: string) => alert(`予定削除: ID ${id}`)}
      />
    );
  },
};