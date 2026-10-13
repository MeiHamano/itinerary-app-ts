import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MoveForm from '../MoveForm';
import type { ItineraryItem, MoveMethodType } from '../../types/itinerary';

const theme = createTheme();

const createMockMoveItem = (
  moveMethod: MoveMethodType = 'train',
  overrides: Partial<ItineraryItem> = {}
): ItineraryItem => ({
  id: 'move-item-1',
  type: 'item',
  category: 'move',
  startTime: '08:00',
  endTime: '09:00',
  moveMethod,
  moveMethodCustom: '',
  url: '',
  notes: '',
  place: '',
  ...overrides,
});

const meta: Meta<typeof MoveForm> = {
  title: 'Itinerary/Forms/MoveForm',
  component: MoveForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ padding: '24px', maxWidth: '600px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export default meta;
type Story = StoryObj<typeof MoveForm>;

// 1. 電車移動
export const Train: Story = {
  args: {
    item: createMockMoveItem('train'),
  },
};

// 2. 飛行機（URL・メモ付き）
export const FlightWithDetails: Story = {
  args: {
    item: createMockMoveItem('airplane', {
      url: 'https://example.com/airline-checkin',
      notes: '羽田空港 第2ターミナル 15番搭乗口 / 手荷物預け入れ締切20分前',
    }),
  },
};

// 3. 「その他」選択（自由記述入力フィールドが出現）
export const OtherMethodSelected: Story = {
  args: {
    item: createMockMoveItem('other', {
      moveMethodCustom: '高速船ジェットフォイル',
      url: 'https://example.com/ferry-ticket',
      notes: '波が高い場合は運航状況を直前に要確認',
    }),
  },
};

// 4. 移動手段切り替えの動作確認
export const Interactive: Story = {
  render: () => {
    const [item, setItem] = useState<ItineraryItem>(createMockMoveItem('car'));

    const handleChange = (id: string, field: string, value: string) => {
      setItem((prev) => ({ ...prev, [field]: value }));
    };

    return <MoveForm item={item} onChange={handleChange} />;
  },
};