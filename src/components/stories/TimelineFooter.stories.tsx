import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TimelineFooter from '../TimelineFooter';

const theme = createTheme();

const meta: Meta<typeof TimelineFooter> = {
  title: 'Itinerary/TimelineFooter',
  component: TimelineFooter,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onAddDivider: { action: 'onAddDivider clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof TimelineFooter>;

// 1. デフォルト表示
export const Default: Story = {
  args: {
    onAddDivider: () => alert('「＋ 次の日付（区切り）を追加」がクリックされました'),
  },
};