import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GeneralForm from '../GeneralForm';
import type { ItineraryItem, CategoryType } from '../../types/itinerary';

const theme = createTheme();

const createMockGeneralItem = (
  category: CategoryType,
  overrides: Partial<ItineraryItem> = {}
): ItineraryItem => ({
  id: 'general-item-1',
  type: 'item', // 型定義側で必須の場合に対応
  category,
  startTime: '10:00',
  endTime: '11:00',
  place: '',
  url: '',
  notes: '',
  moveMethod: 'train',
  moveMethodCustom: '',
  ...overrides,
});

const meta: Meta<typeof GeneralForm> = {
  title: 'Itinerary/Forms/GeneralForm',
  component: GeneralForm,
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
type Story = StoryObj<typeof GeneralForm>;

// 1. 食事（プレースホルダー確認）
export const Meal: Story = {
  args: {
    item: createMockGeneralItem('meal'),
  },
};

// 2. アクティビティ（入力済み・別タブリンク確認）
export const ActivityFilled: Story = {
  args: {
    item: createMockGeneralItem('activity', {
      place: '青の洞窟 シュノーケリング',
      url: 'https://example.com/diving-tour',
      notes: '水着・バスタオル持参。集合場所はマリーナ前。',
    }),
  },
};

// 3. ショッピング
export const Shopping: Story = {
  args: {
    item: createMockGeneralItem('shopping'),
  },
};

// 4. その他（宿泊・チェックイン等）
export const Other: Story = {
  args: {
    item: createMockGeneralItem('other', {
      place: 'ホテル クラウンヒルズ チェックイン',
      notes: '荷物預け入れ可能か確認すること',
    }),
  },
};

// 5. インタラクティブ入力確認
export const Interactive: Story = {
  render: () => {
    const [item, setItem] = useState<ItineraryItem>(
      createMockGeneralItem('meal', {
        place: '居酒屋 なぎさ',
        url: 'https://example.com/nagisa',
        notes: 'カウンター席希望',
      })
    );

    const handleChange = (id: string, field: string, value: string) => {
      setItem((prev) => ({ ...prev, [field]: value }));
    };

    return <GeneralForm item={item} onChange={handleChange} />;
  },
};