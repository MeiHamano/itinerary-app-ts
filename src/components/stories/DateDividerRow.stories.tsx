import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DateDividerRow from '../DateDividerRow';
import type { DateDivider } from '../../types/itinerary';

const theme = createTheme();

const mockDivider: DateDivider = {
  id: 'divider-1',
  type: 'divider',
  date: '2026-10-01',
};

const meta: Meta<typeof DateDividerRow> = {
  title: 'Itinerary/DateDividerRow',
  component: DateDividerRow,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ padding: '24px', maxWidth: '800px', backgroundColor: '#fafafa' }}>
            <Story />
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onChange: { action: 'onChange' },
    onDelete: { action: 'onDelete' },
    onAddItemHere: { action: 'onAddItemHere' },
  },
};

export default meta;
type Story = StoryObj<typeof DateDividerRow>;

// 1. デフォルト表示
export const Default: Story = {
  args: {
    item: mockDivider,
    dayIndex: 1,
    canDelete: true,
  },
};

// 2. 削除不可（初日など）
export const CannotDelete: Story = {
  args: {
    item: mockDivider,
    dayIndex: 1,
    canDelete: false,
  },
};

// 3. 操作確認用インタラクティブ版
export const Interactive: Story = {
  render: () => {
    const [item, setItem] = useState<DateDivider>(mockDivider);

    return (
      <DateDividerRow
        item={item}
        dayIndex={1}
        onChange={(id, field, value) => {
          setItem((prev) => ({ ...prev, [field]: value }));
        }}
        onDelete={(id) => alert(`削除: ${id}`)}
        onAddItemHere={(id) => alert(`アイテム追加: ${id}`)}
        canDelete={true}
      />
    );
  },
};